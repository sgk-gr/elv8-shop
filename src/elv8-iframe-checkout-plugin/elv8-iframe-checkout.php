<?php
/**
 * Plugin Name: ELV8 iFrame Checkout
 * Plugin URI: https://elv8now.com
 * Description: Allows the WooCommerce checkout to be embedded in an iFrame on elv8now.com by removing X-Frame-Options restrictions.
 * Version: 1.0.0
 * Author: ELV8 Energy
 * Author URI: https://elv8now.com
 * License: GPL2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function elv8_allow_iframe_headers() {
    // Remove headers if set by PHP
    if ( ! headers_sent() ) {
        header_remove( 'X-Frame-Options' );
        header_remove( 'Content-Security-Policy' );
        
        // Set new permissive headers
        header( "Content-Security-Policy: frame-ancestors 'self' https://elv8now.com https://*.elv8now.com https://store.elv8now.com", true );
    }
}

// Hook into multiple WordPress execution points to ensure it runs
add_action( 'send_headers', 'elv8_allow_iframe_headers', 999 );
add_action( 'template_redirect', 'elv8_allow_iframe_headers', 999 );
add_filter( 'wp_headers', function( $headers ) {
    unset( $headers['X-Frame-Options'] );
    $headers['Content-Security-Policy'] = "frame-ancestors 'self' https://elv8now.com https://*.elv8now.com https://store.elv8now.com";
    return $headers;
}, 999 );
