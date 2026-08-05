<?php
/**
 * Custom Checkout Template overridden by SGK Custom Checkout
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Show notices/errors at the top
do_action( 'woocommerce_before_checkout_form', $checkout );

// Check if registration is required
if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
    echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
    return;
}
?>

<div class="sgk-checkout-wrapper">
    <!-- Premium Header -->
    <div class="sgk-checkout-header">
        <a href="https://elv8now.com" class="sgk-checkout-logo">
            <img src="https://elv8now.com/elv8_logo.svg" alt="ELV8 Logo" style="height: 36px; width: auto; display: block;" />
        </a>
        <a href="https://elv8now.com" class="sgk-checkout-cart-icon-link" aria-label="Καλάθι">
            <svg class="sgk-cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
        </a>
    </div>

    <!-- Navigation / Back Link -->
    <div class="sgk-checkout-navigation">
        <a href="https://elv8now.com" class="sgk-checkout-back-link">
            ← Επιστροφή στο κατάστημα
        </a>
    </div>

    <!-- WooCommerce Coupon form wrapper (Placed here outside main form to avoid nested forms) -->
    <div class="sgk-checkout-coupon-container">
        <?php woocommerce_checkout_coupon_form(); ?>
    </div>

    <form name="checkout" method="post" class="checkout woocommerce-checkout sgk-checkout-form" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data">

        <div class="sgk-checkout-grid">
            
            <!-- Left Column: Customer details (Billing & Shipping) -->
            <div class="sgk-checkout-col-left">
                
                <?php if ( $checkout->get_checkout_fields() ) : ?>

                    <?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

                    <div class="sgk-checkout-section" id="customer_details">
                        <div class="sgk-checkout-section-header">
                            <h3>1. Στοιχεία Χρέωσης & Αποστολής</h3>
                        </div>
                        <div class="sgk-checkout-section-body">
                            <?php do_action( 'woocommerce_checkout_billing' ); ?>
                            <?php do_action( 'woocommerce_checkout_shipping' ); ?>
                        </div>
                    </div>

                    <?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>

                <?php endif; ?>
                
            </div>
            
            <!-- Right Column: Order Review, Coupon & Payments -->
            <div class="sgk-checkout-col-right">
                
                <!-- Mobile Toggle Accordion for Order Summary (JS will handle this) -->
                <div class="sgk-mobile-summary-bar">
                    <div class="sgk-mobile-summary-left">
                        <!-- Custom CSS Cart Icon -->
                        <span class="sgk-mobile-cart-icon"></span>
                        <span class="sgk-toggle-text">Προβολή σύνοψης παραγγελίας</span>
                        <span class="sgk-arrow-icon"></span>
                    </div>
                    <div class="sgk-mobile-summary-right">
                        <span class="sgk-mobile-total-val"></span>
                    </div>
                </div>

                <div class="sgk-checkout-sidebar-inner">
                    
                    <!-- Order Review Section -->
                    <div class="sgk-checkout-section" id="sgk-order-review-section">
                        <div class="sgk-checkout-section-header">
                            <h3>2. Σύνοψη Παραγγελίας</h3>
                        </div>
                        <div class="sgk-checkout-section-body">
                            <?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
                            
                            <div id="order_review" class="woocommerce-checkout-review-order">
                                <?php do_action( 'woocommerce_checkout_order_review' ); ?>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>

    </form>
</div>

<?php do_action( 'woocommerce_after_checkout_form', $checkout ); ?>
