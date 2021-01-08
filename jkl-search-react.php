<?php
/**
 * Plugin Name: JKL Search React
 * Description: Replacing WordPress default search with React and powering it with the REST API
 * Plugin URI: https://github.com/jekkilekki/plugin-jkl-search-react
 * Version: 1.2.0
 *
 * @package JKL-Search-React
 */

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

add_action( 'rest_api_init', 'jkl_search_react_feat_img' );

/**
 * Add Featured Images to REST.
 */
function jkl_search_react_feat_img() {
	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback'    => function( $post_arr ) {
				$image_src_arr = wp_get_attachment_image_src( $post_arr['featured_media'], 'thumbnail' );
				return $image_src_arr[0];
			},
			'update_callback' => null,
			'schema'          => null,
		)
	);
}

add_action( 'wp_enqueue_scripts', 'jkl_search_react_scripts' );

/**
 * Enqueuing the script.
 */
function jkl_search_react_scripts() {
	wp_enqueue_script( 'jkl-search-react-js', plugin_dir_url( __FILE__ ) . 'dist/public.min.js', array( 'jquery' ), '20200106', true );
	wp_localize_script(
		'jkl-search-react-js',
		'jkl_search_react_js',
		array(
			// Adding the Post search REST URL.
			'rest_search_posts' => rest_url( 'wp/v2/posts?search=%s' ),
		)
	);
}
