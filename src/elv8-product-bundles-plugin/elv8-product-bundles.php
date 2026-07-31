<?php
/**
 * Plugin Name: ELV8 Product Bundles for WooCommerce
 * Plugin URI: https://elv8now.com
 * Description: Προσθέτει δυνατότητα δημιουργίας Product Bundles ("Συχνά Αγοράζονται Μαζί" / "Frequently Bought Together") απευθείας από το WooCommerce Product Edit screen στο WordPress Admin, και τα εκθέτει στο REST API (/wp-json/wc/v3/products).
 * Version: 1.0.0
 * Author: SGK Digital / ELV8
 * Author URI: https://sgk.gr
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

class ELV8_Product_Bundles_Plugin {

    public function __construct() {
        // Add meta box to Product edit page in WP Admin
        add_action('add_meta_boxes', array($this, 'add_bundle_meta_box'));
        add_action('save_post_product', array($this, 'save_bundle_meta'));
        
        // Expose bundle data to REST API for Next.js frontend
        add_action('rest_api_init', array($this, 'register_rest_field'));
    }

    /**
     * 1. Add Meta Box in WooCommerce Product Admin Screen
     */
    public function add_bundle_meta_box() {
        add_meta_box(
            'elv8_product_bundle_box',
            '📦 ELV8 Product Bundle (Frequently Bought Together)',
            array($this, 'render_bundle_meta_box'),
            'product',
            'normal',
            'high'
        );
    }

    public function render_bundle_meta_box($post) {
        wp_nonce_field('elv8_bundle_save_meta', 'elv8_bundle_nonce');

        $bundle_title     = get_post_meta($post->ID, '_elv8_bundle_title', true) ?: 'Frequently Bought Together';
        $bundled_ids      = get_post_meta($post->ID, '_elv8_bundle_ids', true) ?: array();
        $bundle_discount = get_post_meta($post->ID, '_elv8_bundle_discount', true) ?: '15'; // % discount

        // Fetch all published products for selection
        $all_products = get_posts(array(
            'post_type'      => 'product',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'exclude'        => array($post->ID),
        ));
        ?>
        <div style="padding: 10px 0;">
            <p><strong>Δημιουργήστε ένα πακέτο προσφοράς (Bundle) για αυτό το προϊόν.</strong> Τα επιλεγμένα προϊόντα θα εμφανίζονται στη σελίδα του προϊόντος στο e-shop με ειδική έκπτωση bundle.</p>
            
            <table class="form-table">
                <tr>
                    <th><label for="elv8_bundle_title">Τίτλος Πακέτου (Bundle Title)</label></th>
                    <td>
                        <input type="text" id="elv8_bundle_title" name="elv8_bundle_title" value="<?php echo esc_attr($bundle_title); ?>" class="regular-text" placeholder="π.χ. Complete Energy Pack & Bottle" />
                    </td>
                </tr>
                <tr>
                    <th><label for="elv8_bundle_discount">Έκπτωση Bundle (%)</label></th>
                    <td>
                        <input type="number" id="elv8_bundle_discount" name="elv8_bundle_discount" value="<?php echo esc_attr($bundle_discount); ?>" class="small-text" min="0" max="100" /> %
                    </td>
                </tr>
                <tr>
                    <th><label>Επιλογή Προϊόντων Bundle</label></th>
                    <td>
                        <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; background: #fff; border-radius: 6px;">
                            <?php if (!empty($all_products)): ?>
                                <?php foreach ($all_products as $p): ?>
                                    <label style="display: block; margin-bottom: 6px;">
                                        <input type="checkbox" name="elv8_bundle_ids[]" value="<?php echo esc_attr($p->ID); ?>" <?php checked(in_array($p->ID, (array)$bundled_ids)); ?> />
                                        <strong><?php echo esc_html($p->post_title); ?></strong> (ID: <?php echo $p->ID; ?>)
                                    </label>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <p>Δεν βρέθηκαν άλλα δημοσιευμένα προϊόντα.</p>
                            <?php endif; ?>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <?php
    }

    public function save_bundle_meta($post_id) {
        if (!isset($_POST['elv8_bundle_nonce']) || !wp_verify_nonce($_POST['elv8_bundle_nonce'], 'elv8_bundle_save_meta')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['elv8_bundle_title'])) {
            update_post_meta($post_id, '_elv8_bundle_title', sanitize_text_field($_POST['elv8_bundle_title']));
        }
        if (isset($_POST['elv8_bundle_discount'])) {
            update_post_meta($post_id, '_elv8_bundle_discount', sanitize_text_field($_POST['elv8_bundle_discount']));
        }

        $bundle_ids = isset($_POST['elv8_bundle_ids']) ? array_map('intval', $_POST['elv8_bundle_ids']) : array();
        update_post_meta($post_id, '_elv8_bundle_ids', $bundle_ids);
    }

    /**
     * 2. Expose `bundle_data` in WooCommerce REST API (/wp-json/wc/v3/products)
     */
    public function register_rest_field() {
        register_rest_field('product', 'bundle_data', array(
            'get_callback' => function($product_arr) {
                $product_id = $product_arr['id'];
                $title      = get_post_meta($product_id, '_elv8_bundle_title', true) ?: 'Frequently Bought Together';
                $discount   = (float)(get_post_meta($product_id, '_elv8_bundle_discount', true) ?: 15);
                $ids        = get_post_meta($product_id, '_elv8_bundle_ids', true) ?: array();

                if (empty($ids)) {
                    return null;
                }

                $items = array();
                foreach ($ids as $item_id) {
                    $item_product = wc_get_product($item_id);
                    if ($item_product) {
                        $image_id  = $item_product->get_image_id();
                        $image_url = wp_get_attachment_image_url($image_id, 'medium') ?: '';
                        $items[]   = array(
                            'id'    => $item_product->get_id(),
                            'name'  => $item_product->get_name(),
                            'price' => (float)$item_product->get_price(),
                            'image' => $image_url,
                        );
                    }
                }

                return array(
                    'title'    => $title,
                    'discount' => $discount,
                    'items'    => $items,
                );
            },
            'schema' => null,
        ));
    }
}

new ELV8_Product_Bundles_Plugin();
