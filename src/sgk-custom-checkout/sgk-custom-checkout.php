<?php
/**
 * Plugin Name: SGK Custom Checkout by SGK Digital
 * Description: Ένα premium, minimal και πλήρως mobile-responsive checkout για το WooCommerce στα χρώματα του ELV8 Energy Drink.
 * Version: 1.3.2
 * Author: SGK Digital
 * Author URI: https://sgk.gr
 * License: GPL2
 */

// ==========================================================================
// SMTP CONFIGURATION (Change these to your own mail server details)
// ==========================================================================
define( 'SGK_SMTP_HOST', 'localhost' );           // SMTP Host
define( 'SGK_SMTP_PORT', 25 );                    // Port: 465 (SSL) or 587 (TLS) or 25
define( 'SGK_SMTP_USER', 'sales@store.elv8now.com' ); // SMTP Username / Sender Email
define( 'SGK_SMTP_PASS', 'mr3504Mo#' );           // SMTP Password
define( 'SGK_SMTP_SECURE', '' );                  // 'ssl' or 'tls' or ''
define( 'SGK_FROM_NAME', 'ELV8 Energy Drink' );  // Sender Name

class SGK_Custom_Checkout {

    public function __construct() {
        // Enqueue custom styles and scripts on checkout page
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );

        // Locate templates in our plugin
        add_filter( 'woocommerce_locate_template', array( $this, 'locate_templates' ), 10, 3 );

        // Add product image thumbnails to checkout order review table items
        add_filter( 'woocommerce_cart_item_name', array( $this, 'add_checkout_product_thumbnails' ), 99, 3 );

        // Move WooCommerce Coupon form from the top to inside our custom grid (below header, before payments)
        remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );

        // Hide Admin Bar on Checkout Page for distraction-free layout
        add_filter( 'show_admin_bar', array( $this, 'hide_admin_bar' ) );

        // Remove links from product names on the thank you page & order details
        add_filter( 'woocommerce_order_item_name', array( $this, 'remove_order_item_links' ), 99, 2 );

        // SMTP Mail Integration
        add_action( 'phpmailer_init', array( $this, 'configure_smtp_mail' ) );

        // Log mail failures
        add_action( 'wp_mail_failed', array( $this, 'log_mail_failure' ) );

        // Test mail trigger URL parameter
        add_action( 'init', array( $this, 'trigger_test_email' ) );
    }

    /**
     * Hide WordPress Admin Bar on checkout page
     */
    public function hide_admin_bar( $show ) {
        if ( is_checkout() ) {
            return false;
        }
        return $show;
    }

    /**
     * Remove links from order items on thankyou / account pages
     */
    public function remove_order_item_links( $item_name, $item ) {
        return esc_html( $item->get_name() );
    }

    /**
     * Enqueue CSS & JS only on WooCommerce Checkout page
     */
    public function enqueue_assets() {
        if ( is_checkout() || is_order_received_page() ) {
            // CSS
            wp_enqueue_style(
                'sgk-checkout-style',
                plugins_url( 'assets/css/sgk-checkout.css', __FILE__ ),
                array(),
                '1.3.1'
            );

            // Google Fonts (Outfit & Inter) to match the main store
            wp_enqueue_style(
                'sgk-checkout-fonts',
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap',
                array(),
                null
            );

            // JS
            wp_enqueue_script(
                'sgk-checkout-script',
                plugins_url( 'assets/js/sgk-checkout.js', __FILE__ ),
                array( 'jquery' ),
                '1.3.1',
                true
            );
        }
    }

    /**
     * Prepend product thumbnails to product names in checkout table
     */
    public function add_checkout_product_thumbnails( $product_name, $cart_item, $cart_item_key ) {
        if ( is_checkout() ) {
            $_product = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
            
            if ( $_product && $_product->exists() ) {
                $thumbnail = $_product->get_image( array( 60, 60 ) ); // Fetch product image 60x60
                $product_id = $_product->is_type( 'variation' ) ? $_product->get_parent_id() : $_product->get_id();
                $frontend_url = 'https://elv8now.com/product/' . $product_id . '/';
                
                if ( $thumbnail ) {
                    $product_name = '
                    <div class="sgk-checkout-product-row">
                        <div class="sgk-checkout-product-image">
                            <a href="' . esc_url( $frontend_url ) . '" target="_parent">' . $thumbnail . '</a>
                        </div>
                        <div class="sgk-checkout-product-info">
                            <a href="' . esc_url( $frontend_url ) . '" target="_parent" class="sgk-checkout-product-title">' . $product_name . '</a>
                        </div>
                    </div>';
                }
            }
        }
        return $product_name;
    }

    /**
     * Override WooCommerce template path with the plugin templates path
     */
    public function locate_templates( $template, $template_name, $template_path ) {
        $plugin_path = plugin_dir_path( __FILE__ ) . 'templates/';

        // We override form-checkout.php and thankyou.php
        if ( $template_name === 'checkout/form-checkout.php' || $template_name === 'checkout/thankyou.php' ) {
            if ( file_exists( $plugin_path . $template_name ) ) {
                $template = $plugin_path . $template_name;
            }
        }

        return $template;
    }

    public function configure_smtp_mail( $phpmailer ) {
        if ( defined( 'SGK_SMTP_HOST' ) && SGK_SMTP_HOST !== '' && SGK_SMTP_PASS !== 'PASSWORD_HERE' ) {
            $working_config = get_option( 'sgk_smtp_working_config' );
            $host   = ( $working_config && isset($working_config['host']) ) ? $working_config['host'] : SGK_SMTP_HOST;
            $port   = ( $working_config && isset($working_config['port']) ) ? $working_config['port'] : SGK_SMTP_PORT;
            $secure = ( $working_config && isset($working_config['secure']) ) ? $working_config['secure'] : SGK_SMTP_SECURE;

            $phpmailer->isSMTP();
            $phpmailer->Host       = $host;
            $phpmailer->SMTPAuth   = ( $host !== 'localhost' && $host !== '127.0.0.1' );
            $phpmailer->AuthType   = 'LOGIN'; // Force LOGIN to avoid CRAM-MD5 failures on Plesk
            $phpmailer->Port       = $port;
            $phpmailer->Username   = SGK_SMTP_USER;
            $phpmailer->Password   = SGK_SMTP_PASS;
            $phpmailer->SMTPSecure = $secure;
            $phpmailer->From       = SGK_SMTP_USER;
            $phpmailer->FromName   = defined( 'SGK_FROM_NAME' ) ? SGK_FROM_NAME : get_bloginfo( 'name' );
            
            // Bypass SSL certificate verification for self-signed or Plesk-issued certs
            $phpmailer->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer'       => false,
                    'verify_peer_name'  => false,
                    'allow_self_signed' => true
                )
            );
        }
     }

    /**
     * Log mail failures for debugging
     */
    public function log_mail_failure( $error ) {
        if ( is_wp_error( $error ) ) {
            $msg = $error->get_error_message();
            $data = $error->get_error_data();
            error_log( 'ELV8 Mail Failure: ' . print_r( $msg, true ) );
            error_log( 'ELV8 Mail Data: ' . print_r( $data, true ) );
            set_transient( 'sgk_mail_error_log', $msg . ' | Data: ' . json_encode( $data ), 3600 );
        }
    }

    /**
     * Trigger a test email with automated multi-configuration SMTP debugging
     */
    public function trigger_test_email() {
        if ( isset( $_GET['test_elv8_mail'] ) ) {
            // Check if user is administrator
            if ( ! current_user_can( 'manage_options' ) ) {
                wp_die( 'Access denied. You must be logged in as an administrator to run this test.' );
            }
            
            global $wp_version;
            $use_new_phpmailer = version_compare( $wp_version, '5.5', '>=' );
            
            echo '<html><head><title>ELV8 SMTP Mail Test Debugger</title><style>body { font-family: sans-serif; padding: 30px; background: #fafafa; color: #333; line-height: 1.6; } pre { background: #000; color: #0f0; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px; font-family: monospace; } hr { border: none; border-top: 1px solid #ccc; margin: 40px 0; }</style></head><body>';
            echo '<h1>ELV8 SMTP Mail Test Debugger</h1>';
            echo '<p>Running automated SMTP tests to find a working configuration on your server...</p>';
            
            $tests = array(
                array( 'host' => 'mail.sgk.gr', 'port' => 465, 'secure' => 'ssl', 'desc' => 'Test #1: mail.sgk.gr Port 465 (SSL + Auth)' ),
                array( 'host' => 'mail.sgk.gr', 'port' => 587, 'secure' => 'tls', 'desc' => 'Test #2: mail.sgk.gr Port 587 (TLS + Auth)' ),
                array( 'host' => 'linux60.name-servers.gr', 'port' => 465, 'secure' => 'ssl', 'desc' => 'Test #3: Plesk Host linux60.name-servers.gr Port 465 (SSL + Auth)' ),
                array( 'host' => 'linux60.name-servers.gr', 'port' => 587, 'secure' => 'tls', 'desc' => 'Test #4: Plesk Host linux60.name-servers.gr Port 587 (TLS + Auth)' ),
                array( 'host' => 'sgk.gr', 'port' => 465, 'secure' => 'ssl', 'desc' => 'Test #5: sgk.gr Port 465 (SSL + Auth)' ),
                array( 'host' => 'sgk.gr', 'port' => 587, 'secure' => 'tls', 'desc' => 'Test #6: sgk.gr Port 587 (TLS + Auth)' ),
                array( 'host' => 'localhost', 'port' => 25, 'secure' => '', 'desc' => 'Test #7: Localhost Port 25 (No SSL + Auth)' ),
                array( 'host' => '127.0.0.1', 'port' => 25, 'secure' => '', 'desc' => 'Test #8: 127.0.0.1 Port 25 (No SSL + Auth)' ),
            );
            
            foreach ( $tests as $idx => $test ) {
                echo '<hr/>';
                echo '<h2>' . esc_html( $test['desc'] ) . '</h2>';
                echo '<p>Attempting connection to <strong>' . esc_html( $test['host'] ) . ':' . $test['port'] . '</strong>...</p>';
                
                if ( $use_new_phpmailer ) {
                    require_once ABSPATH . WPINC . '/PHPMailer/PHPMailer.php';
                    require_once ABSPATH . WPINC . '/PHPMailer/SMTP.php';
                    require_once ABSPATH . WPINC . '/PHPMailer/Exception.php';
                    $mail = new \PHPMailer\PHPMailer\PHPMailer( true );
                } else {
                    require_once ABSPATH . WPINC . '/class-phpmailer.php';
                    require_once ABSPATH . WPINC . '/class-smtp.php';
                    $mail = new \PHPMailer();
                }
                
                try {
                    $mail->isSMTP();
                    $mail->Host       = $test['host'];
                    $mail->SMTPAuth   = true;
                    $mail->AuthType   = 'LOGIN'; // Force LOGIN to avoid CRAM-MD5 failures on Plesk
                    $mail->Port       = $test['port'];
                    $mail->Username   = SGK_SMTP_USER;
                    $mail->Password   = SGK_SMTP_PASS;
                    $mail->SMTPSecure = $test['secure'];
                    $mail->From       = SGK_SMTP_USER;
                    $mail->FromName   = SGK_FROM_NAME;
                    
                    $mail->SMTPOptions = array(
                        'ssl' => array(
                            'verify_peer'       => false,
                            'verify_peer_name'  => false,
                            'allow_self_signed' => true
                        )
                    );
                    
                    $mail->SMTPDebug = 3;
                    $mail->Debugoutput = function( $str, $level ) {
                        echo "<strong>[SMTP LOG]</strong> " . htmlspecialchars( $str ) . "<br/>";
                    };
                    
                    $mail->addAddress( 'info@sgk.gr' );
                    $mail->Subject = 'ELV8 Shop SMTP Auto-Test - ' . $test['desc'];
                    $mail->Body    = '<h1>ELV8 Shop SMTP Mail Works!</h1><p>This is an automated test verifying that port ' . $test['port'] . ' works.</p>';
                    $mail->isHTML( true );
                    
                    echo '<h3>SMTP Handshake & Conversation:</h3><pre>';
                    $sent = $mail->send();
                    echo '</pre>';
                    
                    if ( $sent ) {
                        // Save the successful config to option database so it is used globally
                        update_option( 'sgk_smtp_working_config', array(
                            'host'   => $test['host'],
                            'port'   => $test['port'],
                            'secure' => $test['secure']
                        ) );

                        echo '<h2 style="color: green;">✔ SUCCESS! Configuration works!</h2>';
                        echo '<p>The plugin has <strong>automatically saved</strong> these settings to the database and will use them for all WooCommerce order emails. You do not need to edit any files!</p>';
                        echo '<p>Please check the inbox for <strong>info@sgk.gr</strong> to confirm receipt.</p>';
                        echo '<p style="margin-top: 30px;"><a href="/">Return to Home</a></p>';
                        echo '</body></html>';
                        exit;
                    }
                } catch ( \Exception $e ) {
                    echo '</pre>';
                    echo '<p style="color: red; font-weight: bold;">❌ Failed: ' . htmlspecialchars( $e->getMessage() ) . '</p>';
                }
            }
            
            echo '<hr/>';
            echo '<h2 style="color: red;">❌ ALL TESTS FAILED!</h2>';
            echo '<p>All ports (465, 587, 25) were refused or blocked by the server firewall.</p>';
            echo '<p>Please contact your web hosting administrator and ask them to <strong>enable outgoing connections on port 465 (SSL) or 587 (TLS)</strong> in the firewall.</p>';
            echo '<p style="margin-top: 30px;"><a href="/">Return to Home</a></p>';
            echo '</body></html>';
            exit;
        }
    }
}

// Initialize the plugin safely
add_action( 'plugins_loaded', function() {
    if ( class_exists( 'WooCommerce' ) ) {
        new SGK_Custom_Checkout();
    }
});
