<?php
/**
 * Custom Thankyou Page Template overridden by SGK Custom Checkout
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;
?>

<div class="sgk-checkout-wrapper sgk-thankyou-wrapper">
    <!-- Premium Header -->
    <div class="sgk-checkout-header">
        <a href="https://elv8now.com" class="sgk-checkout-logo" target="_parent">
            <img src="https://elv8now.com/elv8_logo.svg" alt="ELV8 Logo" style="height: 36px; width: auto; display: block;" />
        </a>
        <div style="font-size: 13px; font-weight: 700; color: #22c55e; display: flex; align-items: center; gap: 5px; font-family: 'Outfit', sans-serif; text-transform: uppercase; letter-spacing: 0.5px;">
            <span style="font-size: 16px;">✓</span> Ολοκληρώθηκε
        </div>
    </div>

    <div class="sgk-thankyou-content">
        <?php if ( $order ) : ?>

            <?php if ( $order->has_status( 'failed' ) ) : ?>
                <div class="sgk-thankyou-card sgk-status-failed">
                    <div class="sgk-status-icon" style="background-color: #ef4444;">✗</div>
                    <h1>Η πληρωμή απέτυχε</h1>
                    <p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed">
                        <?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?>
                    </p>
                    <div class="sgk-thankyou-actions">
                        <a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
                    </div>
                </div>
            <?php else : ?>
                <!-- Success State -->
                <div class="sgk-thankyou-card sgk-status-success">
                    <div class="sgk-status-icon">✓</div>
                    <h1>Ευχαριστούμε για την παραγγελία σας!</h1>
                    <p class="sgk-status-subtitle">Η παραγγελία σας έχει ληφθεί επιτυχώς και είναι υπό επεξεργασία.</p>
                </div>

                <!-- Order Meta Cards Grid -->
                <div class="sgk-thankyou-meta-grid">
                    <div class="sgk-meta-card">
                        <span class="sgk-meta-label">Αριθμός Παραγγελίας</span>
                        <span class="sgk-meta-value"><?php echo $order->get_order_number(); ?></span>
                    </div>
                    <div class="sgk-meta-card">
                        <span class="sgk-meta-label">Ημερομηνία</span>
                        <span class="sgk-meta-value"><?php echo wc_format_datetime( $order->get_date_created() ); ?></span>
                    </div>
                    <div class="sgk-meta-card">
                        <span class="sgk-meta-label">Σύνολο</span>
                        <span class="sgk-meta-value font-highlight"><?php echo $order->get_formatted_order_total(); ?></span>
                    </div>
                    <div class="sgk-meta-card">
                        <span class="sgk-meta-label">Τρόπος Πληρωμής</span>
                        <span class="sgk-meta-value"><?php echo wp_kses_post( $order->get_payment_method_title() ); ?></span>
                    </div>
                </div>

                <!-- Payment Method / Bank Details Section -->
                <?php if ( $order->get_payment_method() === 'bacs' ) : ?>
                    <div class="sgk-thankyou-bacs-card">
                        <h3 class="sgk-section-title">Στοιχεία Τραπεζικής Κατάθεσης</h3>
                        <p class="sgk-section-subtitle">Παρακαλούμε καταθέστε το ποσό στους παρακάτω λογαριασμούς χρησιμοποιώντας τον <strong>Αριθμό Παραγγελίας</strong> ως αιτιολογία.</p>
                        <div class="sgk-bacs-details-container">
                            <?php do_action( 'woocommerce_thankyou_' . $order->get_payment_method(), $order->get_id() ); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Order Details action hook (renders products summary table, billing & shipping address) -->
                <div class="sgk-thankyou-details-card">
                    <?php do_action( 'woocommerce_thankyou', $order->get_id() ); ?>
                </div>

            <?php endif; ?>

        <?php else : ?>
            <!-- Fallback generic success message -->
            <div class="sgk-thankyou-card sgk-status-success">
                <div class="sgk-status-icon">✓</div>
                <h1>Ευχαριστούμε για την παραγγελία σας!</h1>
                <p class="sgk-status-subtitle"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), null ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
            </div>
        <?php endif; ?>

        <!-- Action Button to return to store -->
        <div class="sgk-thankyou-footer-actions">
            <a href="https://elv8now.com" target="_parent" class="sgk-btn-primary">
                Επιστροφή στο E-shop
            </a>
        </div>
    </div>
</div>
