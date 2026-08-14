<?php
/**
 * Plugin Name: SGK Custom Checkout by SGK Digital
 * Description: Ένα premium, minimal και πλήρως mobile-responsive checkout για το WooCommerce στα χρώματα του ELV8 Energy Drink.
 * Version: 1.3.8
 * Author: SGK Digital
 * Author URI: https://sgk.gr
 * License: GPL2
 */

// ==========================================================================
// RESEND API CONFIGURATION
// ==========================================================================
define( 'SGK_RESEND_API_KEY', get_option( 'sgk_resend_api_key', '' ) ); // Resend API Key (saved via debugger page)
define( 'SGK_FROM_EMAIL',     'noreply@sgk.gr' );          // From Email (must be on verified Resend domain)
define( 'SGK_FROM_NAME',      'ELV8 Energy Drink' );       // Sender Name

// Legacy SMTP fallback (used only if Resend fails)
define( 'SGK_SMTP_HOST',   'linux60.name-servers.gr' );
define( 'SGK_SMTP_PORT',   465 );
define( 'SGK_SMTP_USER',   'sales@store.elv8now.com' );
define( 'SGK_SMTP_PASS',   'mr3504Mo#' );
define( 'SGK_SMTP_SECURE', 'ssl' );

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

        // Resend API Mail Integration (intercepts ALL wp_mail calls)
        add_filter( 'pre_wp_mail', array( $this, 'send_via_resend' ), 10, 2 );

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

    /**
     * Send all wp_mail emails via Resend API (bypasses local Postfix/SMTP entirely)
     */
    public function send_via_resend( $return, $atts ) {
        if ( ! defined( 'SGK_RESEND_API_KEY' ) || SGK_RESEND_API_KEY === '' ) {
            return $return; // No API key - fall through to default wp_mail
        }

        $to      = is_array( $atts['to'] ) ? $atts['to'] : array( $atts['to'] );
        $subject = $atts['subject'];
        $message = $atts['message'];
        $headers = isset( $atts['headers'] ) ? $atts['headers'] : array();

        // Parse Reply-To or CC from headers if present
        $reply_to = array();
        if ( ! empty( $headers ) ) {
            $raw = is_array( $headers ) ? $headers : explode( "\n", str_replace( "\r\n", "\n", $headers ) );
            foreach ( $raw as $header ) {
                if ( stripos( $header, 'Reply-To:' ) !== false ) {
                    $reply_to[] = trim( str_ireplace( 'Reply-To:', '', $header ) );
                }
            }
        }

        $from_email = defined( 'SGK_FROM_EMAIL' ) ? SGK_FROM_EMAIL : 'noreply@sgk.gr';
        $from_name  = defined( 'SGK_FROM_NAME' )  ? SGK_FROM_NAME  : get_bloginfo( 'name' );

        $body = array(
            'from'    => $from_name . ' <' . $from_email . '>',
            'to'      => $to,
            'subject' => $subject,
            'html'    => $message,
        );

        if ( ! empty( $reply_to ) ) {
            $body['reply_to'] = $reply_to;
        }

        $response = wp_remote_post( 'https://api.resend.com/emails', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . SGK_RESEND_API_KEY,
                'Content-Type'  => 'application/json',
            ),
            'body'    => wp_json_encode( $body ),
            'timeout' => 30,
        ) );

        if ( is_wp_error( $response ) ) {
            error_log( 'ELV8 Resend Error: ' . $response->get_error_message() );
            set_transient( 'sgk_mail_error_log', 'Resend WP_Error: ' . $response->get_error_message(), 3600 );
            return false;
        }

        $code         = wp_remote_retrieve_response_code( $response );
        $body_decoded = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code === 200 || $code === 201 ) {
            error_log( 'ELV8 Resend: Email sent successfully to ' . implode( ', ', $to ) . ' | ID: ' . ( $body_decoded['id'] ?? 'n/a' ) );
            return true; // Prevent default wp_mail sending
        }

        $error_msg = isset( $body_decoded['message'] ) ? $body_decoded['message'] : wp_remote_retrieve_body( $response );
        error_log( 'ELV8 Resend Error (' . $code . '): ' . $error_msg );
        set_transient( 'sgk_mail_error_log', 'Resend HTTP ' . $code . ': ' . $error_msg, 3600 );
        return false;
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

            // Clear error log helper
            if ( isset( $_GET['clear_error'] ) ) {
                delete_transient( 'sgk_mail_error_log' );
                wp_redirect( '?test_elv8_mail=1' );
                exit;
            }

            // Save Resend API Key
            if ( isset( $_POST['sgk_resend_key'] ) ) {
                update_option( 'sgk_resend_api_key', sanitize_text_field( $_POST['sgk_resend_key'] ) );
                wp_redirect( '?test_elv8_mail=1&resend_saved=1' );
                exit;
            }
            
            global $wp_version;
            $use_new_phpmailer = version_compare( $wp_version, '5.5', '>=' );
            
            echo '<html><head><title>ELV8 SMTP Mail Test Debugger</title><style>body { font-family: sans-serif; padding: 30px; background: #fafafa; color: #333; line-height: 1.6; } pre { background: #000; color: #0f0; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px; font-family: monospace; } hr { border: none; border-top: 1px solid #ccc; margin: 40px 0; }</style></head><body>';
            echo '<h1>ELV8 SMTP Mail Test Debugger</h1>';

            // Show last logged error if any
            $last_error = get_transient( 'sgk_mail_error_log' );
            if ( $last_error ) {
                echo '<div style="background: #fee; border-left: 4px solid #f88; padding: 20px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">';
                echo '<h3 style="color: #c00; margin-top: 0;">Last Recorded WordPress Mail Error (from Checkout or Order emails):</h3>';
                echo '<pre style="background: #300; color: #ff8; border: 1px solid #c88; padding: 12px;">' . esc_html( $last_error ) . '</pre>';
                echo '<button onclick="window.location.href=\'?test_elv8_mail=1&clear_error=1\'" style="background: #c00; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer;">Clear Error Log</button>';
                echo '</div>';
            }

            // Show current saved configuration
            $working_config = get_option( 'sgk_smtp_working_config' );
            echo '<div style="background: #eef; border-left: 4px solid #88f; padding: 20px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">';
            echo '<h3 style="color: #008; margin-top: 0;">Current Saved SMTP Configuration:</h3>';
            if ( $working_config ) {
                echo 'Host: <strong style="font-family: monospace;">' . esc_html( $working_config['host'] ) . '</strong><br/>';
                echo 'Port: <strong style="font-family: monospace;">' . esc_html( $working_config['port'] ) . '</strong><br/>';
                echo 'Secure: <strong style="font-family: monospace;">' . esc_html( $working_config['secure'] ) . '</strong>';
            } else {
                echo '<p style="color: #666; margin: 0;">None saved yet (using defaults).</p>';
            }
            echo '</div>';

            // Resend API Key configuration panel
            $saved_key = get_option( 'sgk_resend_api_key', '' );
            $key_status = $saved_key ? '✅ API Key is set (' . substr( $saved_key, 0, 10 ) . '...)' : '❌ No API Key saved yet';
            echo '<div style="background: #fff3e0; border-left: 4px solid #ff9800; padding: 20px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">';
            echo '<h3 style="color: #e65100; margin-top: 0;">🚀 Resend API Configuration (Active Email Provider):</h3>';
            echo '<p>Status: <strong>' . $key_status . '</strong></p>';
            if ( isset( $_GET['resend_saved'] ) ) {
                echo '<p style="color: green; font-weight: bold;">✅ API Key saved successfully! All emails now go through Resend.</p>';
            }
            echo '<form method="POST" action="">';
            echo '<input type="hidden" name="test_elv8_mail" value="1" />';
            echo '<input type="text" name="sgk_resend_key" placeholder="re_xxxxxxxxxxxxxxxxxx" style="padding: 8px; width: 380px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; font-family: monospace;" value="' . esc_attr( $saved_key ) . '" /> ';
            echo '<button type="submit" style="background: #e65100; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 14px;">Save API Key</button>';
            echo '</form>';
            echo '</div>';

            // Show custom recipient form
            echo '<div style="background: #efe; border-left: 4px solid #4a4; padding: 20px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">';
            echo '<h3 style="color: #272; margin-top: 0;">Test sending to a custom email address (like your Gmail):</h3>';
            echo '<form method="GET" action="">';
            echo '<input type="hidden" name="test_elv8_mail" value="1" />';
            echo '<input type="email" name="send_to" placeholder="e.g. yourname@gmail.com" required style="padding: 8px; width: 300px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" value="' . ( isset($_GET['send_to']) ? esc_attr($_GET['send_to']) : '' ) . '" /> ';
            echo '<button type="submit" style="background: #28a745; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 14px;">Send Test Email via Resend</button>';
            echo '</form>';
            echo '</div>';

            // If send_to is set AND Resend is configured → send via wp_mail (goes through Resend API)
            if ( isset( $_GET['send_to'] ) && is_email( $_GET['send_to'] ) && SGK_RESEND_API_KEY !== '' ) {
                $to = sanitize_email( $_GET['send_to'] );
                echo '<hr/>';
                echo '<h2>🚀 Sending via Resend API to: <strong>' . esc_html( $to ) . '</strong></h2>';
                $sent = wp_mail(
                    $to,
                    'ELV8 Shop - Resend API Test Email',
                    '<h1 style="color:#111;">ELV8 Shop Email Works!</h1><p>This email was sent via the <strong>Resend API</strong>. WooCommerce order emails will arrive the same way!</p>',
                    array( 'Content-Type: text/html; charset=UTF-8' )
                );
                if ( $sent ) {
                    echo '<h2 style="color:green;">✅ SUCCESS! Email sent via Resend API!</h2>';
                    echo '<p>Check your inbox at <strong>' . esc_html( $to ) . '</strong>. It should arrive within seconds!</p>';
                } else {
                    $err = get_transient( 'sgk_mail_error_log' );
                    echo '<h2 style="color:red;">❌ Failed to send via Resend API!</h2>';
                    echo '<pre style="background:#300;color:#ff8;padding:12px;">' . esc_html( $err ?: 'Unknown error' ) . '</pre>';
                }
                echo '<p style="margin-top:30px;"><a href="?test_elv8_mail=1">← Back to Debugger</a></p>';
                echo '</body></html>';
                exit;
            }

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
                    
                    $recipient = ( isset( $_GET['send_to'] ) && is_email( $_GET['send_to'] ) ) ? sanitize_email( $_GET['send_to'] ) : 'sales@store.elv8now.com';
                    $mail->addAddress( $recipient );
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
                        echo '<p>Please check the inbox for <strong>' . esc_html( $recipient ) . '</strong> to confirm receipt.</p>';
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

    /**
     * Force the sender email address to match SMTP authenticated username
     */
    public function force_mail_from( $from_email ) {
        if ( defined( 'SGK_SMTP_USER' ) && SGK_SMTP_USER !== '' ) {
            return SGK_SMTP_USER;
        }
        return $from_email;
    }

    /**
     * Force the sender name to match SGK_FROM_NAME
     */
    public function force_mail_from_name( $from_name ) {
        if ( defined( 'SGK_FROM_NAME' ) && SGK_FROM_NAME !== '' ) {
            return SGK_FROM_NAME;
        }
        return $from_name;
    }
}

// ==========================================================================
// NEWSLETTER SUBSCRIBERS INTEGRATION & WORDPRESS ADMIN PAGE
// ==========================================================================

add_action( 'rest_api_init', function() {
    // REST API Endpoint to submit newsletter subscription
    register_rest_route( 'elv8/v1', '/newsletter-subscribe', array(
        'methods'  => 'POST',
        'callback' => function( $request ) {
            $params = $request->get_json_params();
            $email = isset( $params['email'] ) ? sanitize_email( trim( $params['email'] ) ) : '';
            $source = isset( $params['source'] ) ? sanitize_text_field( $params['source'] ) : 'Website';

            if ( ! is_email( $email ) ) {
                return new WP_Error( 'invalid_email', 'Παρακαλώ εισάγετε ένα έγκυρο email.', array( 'status' => 400 ) );
            }

            $subscribers = get_option( 'elv8_newsletter_subscribers', array() );
            if ( ! is_array( $subscribers ) ) {
                $subscribers = array();
            }

            // Check if already subscribed
            foreach ( $subscribers as $sub ) {
                if ( isset( $sub['email'] ) && strtolower( $sub['email'] ) === strtolower( $email ) ) {
                    return array(
                        'success'           => true,
                        'alreadySubscribed' => true,
                        'message'           => 'Είστε ήδη εγγεγραμμένος στο newsletter!',
                    );
                }
            }

            $new_sub = array(
                'id'           => 'sub_' . time() . '_' . wp_generate_password( 4, false ),
                'email'        => $email,
                'subscribedAt' => current_time( 'mysql' ),
                'source'       => $source,
            );

            array_unshift( $subscribers, $new_sub );
            update_option( 'elv8_newsletter_subscribers', $subscribers );

            return array(
                'success'    => true,
                'message'    => 'Ευχαριστούμε! Εγγραφήκατε επιτυχώς στο newsletter! 🎉',
                'subscriber' => $new_sub,
            );
        },
        'permission_callback' => '__return_true',
    ) );

    // REST API Endpoint to fetch newsletter subscribers
    register_rest_route( 'elv8/v1', '/newsletter-subscribers', array(
        'methods'  => 'GET',
        'callback' => function() {
            $subscribers = get_option( 'elv8_newsletter_subscribers', array() );
            if ( ! is_array( $subscribers ) ) {
                $subscribers = array();
            }
            return array(
                'success'     => true,
                'total'       => count( $subscribers ),
                'subscribers' => $subscribers,
            );
        },
        'permission_callback' => '__return_true',
    ) );
} );

// Add WordPress Admin Menu under WooCommerce -> Newsletter ELV8
add_action( 'admin_menu', function() {
    add_submenu_page(
        'woocommerce',
        'Συνδρομητές Newsletter ELV8',
        '📧 Newsletter ELV8',
        'manage_woocommerce',
        'elv8-newsletter',
        'elv8_render_newsletter_admin_page'
    );
} );

function elv8_render_newsletter_admin_page() {
    if ( isset( $_POST['export_csv'] ) ) {
        $subscribers = get_option( 'elv8_newsletter_subscribers', array() );
        if ( ! is_array( $subscribers ) ) {
            $subscribers = array();
        }

        header( 'Content-Type: text/csv; charset=utf-8' );
        header( 'Content-Disposition: attachment; filename=elv8_newsletter_subscribers_' . date( 'Y-m-d' ) . '.csv' );
        $output = fopen( 'php://output', 'w' );
        fputs( $output, "\xEF\xBB\xBF" ); // UTF-8 BOM
        fputcsv( $output, array( 'Email', 'Date Subscribed', 'Source' ) );

        foreach ( $subscribers as $sub ) {
            fputcsv( $output, array(
                isset( $sub['email'] ) ? $sub['email'] : '',
                isset( $sub['subscribedAt'] ) ? $sub['subscribedAt'] : '',
                isset( $sub['source'] ) ? $sub['source'] : 'Website',
            ) );
        }
        fclose( $output );
        exit;
    }

    if ( isset( $_POST['delete_email'] ) && isset( $_POST['email_to_delete'] ) ) {
        $email_to_delete = sanitize_email( $_POST['email_to_delete'] );
        $subscribers = get_option( 'elv8_newsletter_subscribers', array() );
        if ( is_array( $subscribers ) ) {
            $subscribers = array_values( array_filter( $subscribers, function( $s ) use ( $email_to_delete ) {
                return isset( $s['email'] ) && strtolower( $s['email'] ) !== strtolower( $email_to_delete );
            } ) );
            update_option( 'elv8_newsletter_subscribers', $subscribers );
            echo '<div class="notice notice-success is-dismissible"><p>Το email <strong>' . esc_html( $email_to_delete ) . '</strong> διαγράφηκε επιτυχώς.</p></div>';
        }
    }

    $subscribers = get_option( 'elv8_newsletter_subscribers', array() );
    if ( ! is_array( $subscribers ) ) {
        $subscribers = array();
    }
    ?>
    <div class="wrap" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
        <h1 style="display: flex; align-items: center; gap: 10px; font-size: 24px; font-weight: 800; color: #1e293b;">
            📧 Διαχείριση Συνδρομητών Newsletter ELV8
        </h1>
        <p style="color: #64748b; font-size: 14px;">
            Δείτε όλους τους εγγεγραμμένους πελάτες στο Newsletter του ELV8 Energy και κατεβάστε το αρχείο CSV για αποστολή ενημερώσεων.
        </p>

        <div style="display: flex; gap: 15px; margin: 20px 0;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; flex: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; tracking-wider: 1px;">Σύνολο Συνδρομητών</span>
                <div style="font-size: 32px; font-weight: 900; color: #ff1d8e; margin-top: 5px;"><?php echo count( $subscribers ); ?></div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 20px; flex: 2; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <strong style="display: block; font-size: 14px; color: #0f172a;">Εξαγωγή Λίστας Emails σε Excel/CSV</strong>
                    <span style="font-size: 12px; color: #64748b;">Κατεβάστε όλα τα emails για χρήση σε Mailchimp, Brevo ή μαζική αλληλογραφία.</span>
                </div>
                <form method="post" style="margin: 0;">
                    <input type="hidden" name="export_csv" value="1" />
                    <button type="submit" class="button button-primary" style="background: #ff1d8e; border-color: #ff1d8e; font-weight: 700; padding: 6px 16px; height: auto; border-radius: 8px;">
                        📥 Εξαγωγή σε CSV
                    </button>
                </form>
            </div>
        </div>

        <table class="wp-list-table widefat fixed striped table-view-list" style="margin-top: 20px; border-radius: 8px; overflow: hidden;">
            <thead>
                <tr>
                    <th style="width: 50px;">#</th>
                    <th>Email Συνδρομητή</th>
                    <th>Ημερομηνία Εγγραφής</th>
                    <th>Πηγή Εγγραφής</th>
                    <th style="width: 100px; text-align: right;">Ενέργεια</th>
                </tr>
            </thead>
            <tbody>
                <?php if ( empty( $subscribers ) ) : ?>
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 30px; color: #94a3b8;">
                            Δεν υπάρχουν ακόμα εγγεγραμμένοι συνδρομητές.
                        </td>
                    </tr>
                <?php else : ?>
                    <?php foreach ( $subscribers as $index => $sub ) : ?>
                        <tr>
                            <td style="font-weight: bold; color: #94a3b8;"><?php echo $index + 1; ?></td>
                            <td style="font-weight: 600; color: #0f172a;"><?php echo esc_html( isset( $sub['email'] ) ? $sub['email'] : '' ); ?></td>
                            <td style="color: #64748b;"><?php echo esc_html( isset( $sub['subscribedAt'] ) ? $sub['subscribedAt'] : '' ); ?></td>
                            <td><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;"><?php echo esc_html( isset( $sub['source'] ) ? $sub['source'] : 'Website' ); ?></span></td>
                            <td style="text-align: right;">
                                <form method="post" style="display: inline;" onsubmit="return confirm('Διαγραφή του email;');">
                                    <input type="hidden" name="delete_email" value="1" />
                                    <input type="hidden" name="email_to_delete" value="<?php echo esc_attr( isset( $sub['email'] ) ? $sub['email'] : '' ); ?>" />
                                    <button type="submit" class="button button-small" style="color: #ef4444; border-color: #fca5a5;">
                                        Διαγραφή
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

// Initialize the plugin safely
add_action( 'plugins_loaded', function() {
    if ( class_exists( 'WooCommerce' ) ) {
        new SGK_Custom_Checkout();
    }
});
