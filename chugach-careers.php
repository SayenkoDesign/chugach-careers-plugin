<?php
/**
 * Plugin Name: Chugach Careers Plugin
 * Plugin URI:  https://www.sayenkodesign.com
 * Description: Chugach Careers plugin
 * Version:     1.0.0
 * Author:      Tristan Conant
 * Author URI:  https://www.sayenkodesign.com
 * Text Domain: wds-wwe
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * Enqueue frontend scripts.
 */
function frontend_scripts() {
	wp_enqueue_script(
	'wds-wwe-frontend-js',
	plugins_url( 'assets/js/frontend.js', __FILE__ ),
	[ 'jquery' ],
	'11272018',
  true
	);
}
add_action( 'wp_enqueue_scripts', 'frontend_scripts');

// Page under construction shortcode

function chugach_careers_root() {
	ob_start();
	?>

	<seaction class="container careers-section">
	  <div class="wrap">
	    <div class="row">
				<div id="careers-root">
				</div>
	    </div>
	  </div>
	</section>

	<?php
	$display_posts = ob_get_clean();
	return $display_posts;
}

add_shortcode( 'chugach_careers', 'chugach_careers_root' );

/**
 * Enqueue admin scripts.
 */
function admin_scripts() {
	wp_enqueue_script(
	'wds-wwe-admin-js',
	plugins_url( 'assets/js/admin.js', __FILE__ ),
	[ 'jquery' ],
	'11272018'
	);
}
add_action( 'admin_enqueue_scripts', 'admin_scripts' );
