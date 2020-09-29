<?php
/**
 * @package WordPress
 * @subpackage Anubis
 * @since 1.0
 */


// disable wp-embed
function disable_wp_embed(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'disable_wp_embed' );

// disable admin bar
add_filter('show_admin_bar', '__return_false');

// disable emojis
function disable_emojis() {
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
  add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
}
add_action( 'init', 'disable_emojis' );


// meta tags
function add_meta_tags() {
  echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
  echo '<base href="/">';
  echo '<link rel="apple-touch-icon" sizes="57x57" href="'. get_theme_file_uri('assets/apple-icon-57x57.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="60x60" href="'. get_theme_file_uri('assets/apple-icon-60x60.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="72x72" href="'. get_theme_file_uri('assets/apple-icon-72x72.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="76x76" href="'. get_theme_file_uri('assets/apple-icon-76x76.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="114x114" href="'. get_theme_file_uri('assets/apple-icon-114x114.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="120x120" href="'. get_theme_file_uri('assets/apple-icon-120x120.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="144x144" href="'. get_theme_file_uri('assets/apple-icon-144x144.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="152x152" href="'. get_theme_file_uri('assets/apple-icon-152x152.png') .'">';
  echo '<link rel="apple-touch-icon" sizes="180x180" href="'. get_theme_file_uri('assets/apple-icon-180x180.png') .'">';
  echo '<link rel="icon" type="image/png" sizes="192x192"  href="'. get_theme_file_uri('assets/android-icon-192x192.png') .'">';
  echo '<link rel="icon" type="image/png" sizes="32x32" href="'. get_theme_file_uri('assets/favicon-32x32.png') .'">';
  echo '<link rel="icon" type="image/png" sizes="96x96" href="'. get_theme_file_uri('assets/favicon-96x96.png') .'">';
  echo '<link rel="icon" type="image/png" sizes="16x16" href="'. get_theme_file_uri('assets/favicon-16x16.png') .'">';
  echo '<link rel="manifest" href="'. get_theme_file_uri('assets/manifest.json') .'">';
  echo '<meta name="msapplication-TileColor" content="#ffffff">';
  echo '<meta name="msapplication-TileImage" content="'. get_theme_file_uri('assets/ms-icon-144x144.png') .'">';
  echo '<meta name="theme-color" content="#ffffff">';
}
add_action('wp_head', 'add_meta_tags', '1');

// disable meta tag
remove_action('wp_head', 'wp_generator');

// es5 adapter
function add_es5_adapter() {
  if (!is_admin()) {
    echo '<script>
      if (!window.customElements) {
        document.write(\'<!--\');
      }
    </script>
    <script src="'. get_theme_file_uri('vendor/custom-elements-es5-adapter.js') .'"></script>
    <!-- DO NOT REMOVE THIS COMMENT -->';
  }
}
add_action('wp_head', 'add_es5_adapter', '1');

// service worker
function add_service_worker() {
  if (!is_admin()) {
    echo "
      <script>
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('./wp-content/themes/ausar/bundles/sw.js');
          });
        }
      </script>
    ";
  }
}
add_action('wp_head', 'add_service_worker', '1');

// feature image support
add_theme_support( 'post-thumbnails', array( 'posts') );

// enqueue fonts
function add_fonts() {
    wp_enqueue_style( 'noto-sans-font', 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap', false );
}
add_action( 'wp_enqueue_scripts', 'add_fonts' );

// enqueue styles and scripts
if (!is_admin()) {
    wp_enqueue_script('webcomponent-loader', get_theme_file_uri('/vendor/webcomponents-loader.js'), [], false, true);
    wp_enqueue_script('bundle-js', get_theme_file_uri('/bundles/bundle.js'), [], false, true);
    wp_enqueue_style('bundle-css', get_theme_file_uri('/bundles/bundle.css'));
}

// not having this causes a redirect loop for some reason
remove_filter('template_redirect', 'redirect_canonical');
