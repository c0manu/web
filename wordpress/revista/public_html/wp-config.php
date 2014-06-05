<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'B|FtitG`bPHI^0%*;a#F*@;G,T]XOWp/Vav;P47*wc&2)Tw@n2}]@%R]usY;No b');
define('SECURE_AUTH_KEY',  'o$L^a[/MA(mV3<zznX?]|Ih}DelbQ5x4JIN0jG|?*<jK$q6G3@=^.[_,tQ[I 7js');
define('LOGGED_IN_KEY',    'H/|t.ZJ4K,{[@@-]oo/&zl@(%/jiIe7;r AM*+w.zH0:HT~hbPD9 i#)q|DwH.}J');
define('NONCE_KEY',        'c^G7[(<v9fI&&w! %~1#dSJLmJTp>eZh29}8K#K?+NsTWzHe^Mx-Os$P*_Ux28t9');
define('AUTH_SALT',        'MhJRY7O[Y-jL/gaOnXvS3zg53^cLV*:j-`t`=@%0|]Jf[2^s+wRnH?]Fbjt@Ppy;');
define('SECURE_AUTH_SALT', '*PjQQSKJ~}ZLI_0W-hfc:<6b.;X@J)2|!CDxcZ%:8]43AXn#THmgw+k)tFsFv3BV');
define('LOGGED_IN_SALT',   'o-0|Mpo$#921#P^`ZZdRE^7P2C/%-Xncqau Kcsi~g,IVLKbw_2%%eab x[`GzbZ');
define('NONCE_SALT',       '4SMw:>[lz4g<g+;< `I%~P0LKZ 8VcLUJ>k6yVaxC#m$X,N2CEnqk3uZR6& %/zA');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
