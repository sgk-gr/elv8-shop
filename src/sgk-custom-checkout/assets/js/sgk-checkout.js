/**
 * SGK Custom Checkout JS
 * Designed by SGK Digital (https://sgk.gr)
 */

jQuery(document).ready(function($) {
    
    // Function to update the mobile summary bar total from the native WooCommerce table
    function updateMobileTotal() {
        var totalHtml = $('.woocommerce-checkout-review-order-table tr.order-total td').html();
        if (totalHtml) {
            $('.sgk-mobile-total-val').html(totalHtml);
        }
    }

    // Run initially
    updateMobileTotal();

    // Listen to WooCommerce native event when checkout refreshes (e.g. shipping or coupon changes)
    $(document).on('updated_checkout', function() {
        updateMobileTotal();
    });

    // Mobile Accordion Toggle
    $('.sgk-mobile-summary-bar').on('click', function() {
        $(this).toggleClass('active');
        $('#sgk-order-review-section').toggleClass('open').slideToggle(300);
    });

    // Smooth scroll to error fields if WooCommerce checkout fails validation
    $(document).on('checkout_error', function() {
        var errorNotices = $('.woocommerce-NoticeGroup-checkout, .woocommerce-error');
        if (errorNotices.length) {
            $('html, body').animate({
                scrollTop: (errorNotices.offset().top - 100)
            }, 500);
        }
    });

    // Clean up classes for styling
    function beautifyFields() {
        $('.form-row').each(function() {
            $(this).find('input, select, textarea').addClass('sgk-input-field');
        });
    }

    beautifyFields();
    $(document).on('country_to_state_changed', function() {
        beautifyFields();
    });
});
