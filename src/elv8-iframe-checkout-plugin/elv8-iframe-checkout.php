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

/**
 * Remove X-Frame-Options header and set Content-Security-Policy
 * to allow iFrame embedding only from elv8now.com domains.
 */
add_action( 'send_headers', function () {
    header_remove( 'X-Frame-Options' );
    header( 'Content-Security-Policy: frame-ancestors https://elv8now.com https://*.elv8now.com' );
} );
