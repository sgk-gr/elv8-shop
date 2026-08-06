<?php
/**
 * Plugin Name: SGK Custom Checkout by SGK Digital
 * Description: Ένα premium, minimal και πλήρως mobile-responsive checkout για το WooCommerce στα χρώματα του ELV8 Energy Drink.
 * Version: 1.3.1
 * Author: SGK Digital
 * Author URI: https://sgk.gr
 * License: GPL2
 */

// ==========================================================================
// SMTP CONFIGURATION (Change these to your own mail server details)
// ==========================================================================
define( 'SGK_SMTP_HOST', 'mail.sgk.gr' );         // SMTP Host
define( 'SGK_SMTP_PORT', 465 );                   // Port: 465 (SSL) or 587 (TLS)
define( 'SGK_SMTP_USER', 'info@sgk.gr' );         // SMTP Username / Sender Email
define( 'SGK_SMTP_PASS', 'PASSWORD_HERE' );       // SMTP Password
define( 'SGK_SMTP_SECURE', 'ssl' );               // 'ssl' or 'tls'
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
                '1.2.0'
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
                '1.2.0',
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
     * Configure PHPMailer to use custom SMTP settings
     */
    public function configure_smtp_mail( $phpmailer ) {
        if ( defined( 'SGK_SMTP_HOST' ) && SGK_SMTP_HOST !== '' && SGK_SMTP_PASS !== 'PASSWORD_HERE' ) {
            $phpmailer->isSMTP();
            $phpmailer->Host       = SGK_SMTP_HOST;
            $phpmailer->SMTPAuth   = true;
            $phpmailer->Port       = SGK_SMTP_PORT;
            $phpmailer->Username   = SGK_SMTP_USER;
            $phpmailer->Password   = SGK_SMTP_PASS;
            $phpmailer->SMTPSecure = SGK_SMTP_SECURE;
            $phpmailer->From       = SGK_SMTP_USER;
            $phpmailer->FromName   = defined( 'SGK_FROM_NAME' ) ? SGK_FROM_NAME : get_bloginfo( 'name' );
        }
    }
}

// Initialize the plugin safely
add_action( 'plugins_loaded', function() {
    if ( class_exists( 'WooCommerce' ) ) {
        new SGK_Custom_Checkout();
    }
});
