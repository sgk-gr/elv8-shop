<?php
/**
 * Plugin Name: Headless Cart Bridge for WooCommerce
 * Description: Επιτρέπει την προσθήκη πολλών προϊόντων στο καλάθι μέσω URL (format: ?fill-cart=ID1:QTY1,ID2:QTY2) και ανακατεύθυνση στο Checkout.
 * Version: 1.1.0
 * Author: Spiros Tsavos
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action('template_redirect', function() {
    // Ελέγχουμε αν υπάρχει η παράμετρος fill-cart στο URL
    if (isset($_GET['fill-cart'])) {
        
        // Σιγουρευόμαστε ότι το WooCommerce είναι εγκατεστημένο και ενεργό
        if (!function_exists('WC') || !WC()->cart) {
            return;
        }

        // 1. Καθαρισμός του υπάρχοντος καλαθιού για να έρθουν μόνο τα προϊόντα από τη React
        WC()->cart->empty_cart();

        // 2. Διαχωρισμός των προϊόντων (π.χ. "123:2,456:1")
        $items = explode(',', $_GET['fill-cart']);
        
        foreach ($items as $item) {
            $parts = explode(':', $item);
            $product_id = intval($parts[0]);
            $quantity = isset($parts[1]) ? intval($parts[1]) : 1;

            if ($product_id > 0) {
                // Προσθήκη στο καλάθι
                WC()->cart->add_to_cart($product_id, $quantity);
            }
        }

        // 3. Ανακατεύθυνση στη σελίδα του Checkout
        $checkout_url = site_url('/checkout/');
        wp_redirect($checkout_url);
        exit;
    }
});