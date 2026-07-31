<?php
/**
 * Plugin Name: ELV8 Store Locator & B2B Leads API
 * Plugin URI: https://elv8now.com
 * Description: Προσθέτει Custom Post Types για 'Σημεία Πώλησης' (elv8_store) και 'Αιτήματα Χονδρικής' (elv8_b2b_lead) με REST API endpoints και email ειδοποιήσεις για τον Admin.
 * Version: 1.1.0
 * Author: SGK Digital / ELV8
 * Author URI: https://sgk.gr
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

class ELV8_Store_Locator_Plugin {

    public function __construct() {
        add_action('init', array($this, 'register_store_cpt'));
        add_action('init', array($this, 'register_b2b_lead_cpt'));
        add_action('add_meta_boxes', array($this, 'add_store_meta_boxes'));
        add_action('save_post_elv8_store', array($this, 'save_store_meta'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }

    /**
     * 1. Register Custom Post Type: elv8_store (Σημεία Πώλησης)
     */
    public function register_store_cpt() {
        $labels = array(
            'name'               => 'Σημεία Πώλησης ELV8',
            'singular_name'      => 'Σημείο Πώλησης',
            'menu_name'          => 'ELV8 Stores',
            'name_admin_bar'     => 'ELV8 Store',
            'add_new'            => 'Προσθήκη Νέου',
            'add_new_item'       => 'Προσθήκη Νέου Σημείου Πώλησης',
            'edit_item'          => 'Επεξεργασία Σημείου Πώλησης',
            'all_items'          => '📍 Όλα τα Σημεία Πώλησης',
            'search_items'       => 'Αναζήτηση Σημείων Πώλησης',
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-location-alt',
            'supports'           => array('title', 'thumbnail'),
            'show_in_rest'       => true,
        );

        register_post_type('elv8_store', $args);
    }

    /**
     * 2. Register Custom Post Type: elv8_b2b_lead (Αιτήματα Χονδρικής B2B)
     */
    public function register_b2b_lead_cpt() {
        $labels = array(
            'name'               => 'Αιτήματα Χονδρικής (B2B)',
            'singular_name'      => 'Αίτημα Χονδρικής',
            'menu_name'          => 'ELV8 B2B Leads',
            'name_admin_bar'     => 'B2B Lead',
            'all_items'          => '💼 Αιτήματα Χονδρικής',
            'search_items'       => 'Αναζήτηση Αιτημάτων',
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => 'edit.php?post_type=elv8_store', // Nest under ELV8 Stores menu
            'menu_position'      => 6,
            'menu_icon'          => 'dashicons-email-alt',
            'supports'           => array('title', 'editor'),
            'capabilities'       => array('create_posts' => 'do_not_allow'), // Submissions from web
            'map_meta_cap'       => true,
        );

        register_post_type('elv8_b2b_lead', $args);
    }

    /**
     * Meta Boxes for Address, City, Zip, Phone, Type, Lat, Lng
     */
    public function add_store_meta_boxes() {
        add_meta_box(
            'elv8_store_details',
            'Στοιχεία Σημείου Πώλησης',
            array($this, 'render_meta_box'),
            'elv8_store',
            'normal',
            'high'
        );
    }

    public function render_meta_box($post) {
        wp_nonce_field('elv8_store_save_meta', 'elv8_store_nonce');

        $address  = get_post_meta($post->ID, '_elv8_store_address', true);
        $city     = get_post_meta($post->ID, '_elv8_store_city', true);
        $zip      = get_post_meta($post->ID, '_elv8_store_zip', true);
        $phone    = get_post_meta($post->ID, '_elv8_store_phone', true);
        $type     = get_post_meta($post->ID, '_elv8_store_type', true) ?: 'gym';
        $lat      = get_post_meta($post->ID, '_elv8_store_lat', true);
        $lng      = get_post_meta($post->ID, '_elv8_store_lng', true);
        ?>
        <table class="form-table">
            <tr>
                <th><label for="elv8_store_address">Διεύθυνση</label></th>
                <td><input type="text" id="elv8_store_address" name="elv8_store_address" value="<?php echo esc_attr($address); ?>" class="regular-text" placeholder="π.χ. Λεωφ. Κηφισίας 120" /></td>
            </tr>
            <tr>
                <th><label for="elv8_store_city">Πόλη / Περιοχή</label></th>
                <td><input type="text" id="elv8_store_city" name="elv8_store_city" value="<?php echo esc_attr($city); ?>" class="regular-text" placeholder="π.χ. Αθήνα / Αμπελόκηποι" /></td>
            </tr>
            <tr>
                <th><label for="elv8_store_zip">Τ.Κ.</label></th>
                <td><input type="text" id="elv8_store_zip" name="elv8_store_zip" value="<?php echo esc_attr($zip); ?>" class="regular-text" placeholder="π.χ. 11526" /></td>
            </tr>
            <tr>
                <th><label for="elv8_store_phone">Τηλέφωνο</label></th>
                <td><input type="text" id="elv8_store_phone" name="elv8_store_phone" value="<?php echo esc_attr($phone); ?>" class="regular-text" placeholder="π.χ. 210 6912345" /></td>
            </tr>
            <tr>
                <th><label for="elv8_store_type">Τύπος Καταστήματος</label></th>
                <td>
                    <select id="elv8_store_type" name="elv8_store_type">
                        <option value="gym" <?php selected($type, 'gym'); ?>>🏋️‍♂️ Γυμναστήριο</option>
                        <option value="kiosk" <?php selected($type, 'kiosk'); ?>>🏪 Περίπτερο</option>
                        <option value="supermarket" <?php selected($type, 'supermarket'); ?>>🛒 Supermarket</option>
                        <option value="retail" <?php selected($type, 'retail'); ?>>🏬 Κατάστημα / Retail</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="elv8_store_lat">Γεωγραφικό Πλάτος (Latitude)</label></th>
                <td><input type="text" id="elv8_store_lat" name="elv8_store_lat" value="<?php echo esc_attr($lat); ?>" class="regular-text" placeholder="π.χ. 37.9942" /></td>
            </tr>
            <tr>
                <th><label for="elv8_store_lng">Γεωγραφικό Μήκος (Longitude)</label></th>
                <td><input type="text" id="elv8_store_lng" name="elv8_store_lng" value="<?php echo esc_attr($lng); ?>" class="regular-text" placeholder="π.χ. 23.7661" /></td>
            </tr>
        </table>
        <?php
    }

    public function save_store_meta($post_id) {
        if (!isset($_POST['elv8_store_nonce']) || !wp_verify_nonce($_POST['elv8_store_nonce'], 'elv8_store_save_meta')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        $fields = array('address', 'city', 'zip', 'phone', 'type', 'lat', 'lng');
        foreach ($fields as $field) {
            if (isset($_POST['elv8_store_' . $field])) {
                update_post_meta($post_id, '_elv8_store_' . $field, sanitize_text_field($_POST['elv8_store_' . $field]));
            }
        }
    }

    /**
     * REST API Endpoints:
     * - GET  /wp-json/elv8/v1/stores
     * - POST /wp-json/elv8/v1/wholesale-submit
     */
    public function register_rest_routes() {
        register_rest_route('elv8/v1', '/stores', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_stores_api'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('elv8/v1', '/wholesale-submit', array(
            'methods'  => 'POST',
            'callback' => array($this, 'handle_wholesale_submission'),
            'permission_callback' => '__return_true',
        ));
    }

    public function get_stores_api() {
        $posts = get_posts(array(
            'post_type'      => 'elv8_store',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
        ));

        $stores = array();
        foreach ($posts as $post) {
            $stores[] = array(
                'id'       => $post->ID,
                'name'     => get_the_title($post->ID),
                'address'  => get_post_meta($post->ID, '_elv8_store_address', true),
                'city'     => get_post_meta($post->ID, '_elv8_store_city', true),
                'zip'      => get_post_meta($post->ID, '_elv8_store_zip', true),
                'phone'    => get_post_meta($post->ID, '_elv8_store_phone', true),
                'type'     => get_post_meta($post->ID, '_elv8_store_type', true) ?: 'gym',
                'lat'      => (float) get_post_meta($post->ID, '_elv8_store_lat', true),
                'lng'      => (float) get_post_meta($post->ID, '_elv8_store_lng', true),
            );
        }

        return rest_ensure_response($stores);
    }

    public function handle_wholesale_submission($request) {
        $params = $request->get_json_params();

        $name         = sanitize_text_field($params['name'] ?? '');
        $email        = sanitize_email($params['email'] ?? '');
        $phone        = sanitize_text_field($params['phone'] ?? '');
        $company_type = sanitize_text_field($params['companyType'] ?? '');
        $message      = sanitize_textarea_field($params['message'] ?? '');

        if (empty($name) || empty($email) || empty($phone)) {
            return new WP_Error('missing_fields', 'Παρακαλούμε συμπληρώστε όλα τα απαραίτητα πεδία.', array('status' => 400));
        }

        // Save as CPT entry in WordPress admin
        $post_id = wp_insert_post(array(
            'post_title'   => "Αίτημα Χονδρικής: {$name} ({$company_type})",
            'post_content' => "Email: {$email}\nΤηλέφωνο: {$phone}\nΤύπος Επιχείρησης: {$company_type}\n\nΜήνυμα:\n{$message}",
            'post_type'    => 'elv8_b2b_lead',
            'post_status'  => 'publish',
        ));

        // Send email notification to Admin
        $admin_email = get_option('admin_email');
        $subject     = "⚡ Νέο Αίτημα Χονδρικής ELV8 από " . $name;
        $body        = "Νέο αίτημα χονδρικής υποβλήθηκε από το e-shop:\n\n";
        $body       .= "Όνομα/Εταιρεία: {$name}\n";
        $body       .= "Email: {$email}\n";
        $body       .= "Τηλέφωνο: {$phone}\n";
        $body       .= "Τύπος Επιχείρησης: {$company_type}\n\n";
        $body       .= "Μήνυμα:\n{$message}\n\n";
        $body       .= "Δείτε το αίτημα στο WordPress Admin: " . admin_url("post.php?post={$post_id}&action=edit");

        wp_mail($admin_email, $subject, $body);

        return rest_ensure_response(array('success' => true, 'id' => $post_id));
    }
}

new ELV8_Store_Locator_Plugin();

