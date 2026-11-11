<?php

namespace AgeGate\Common\Helpers;

class Shortcode
{
    public static function getShortcodeParams(string $content, string $shortcode_handle ) {

        // get shortcode regex pattern wordpress function.
        $pattern = get_shortcode_regex();

        if ( preg_match_all( '/'. $pattern .'/s', $content, $matches ) ) {

            $shortcode_exists = false;

            $keys = $result = array();

            foreach( $matches[0] as $key => $value) {
                // $matches[3] return the shortcode attribute as string
                // replace space with '&' for parse_str() function
                $get = str_replace( " ", "&" , $matches[3][ $key ] );
                parse_str( $get, $params );

                // Collect only parameters related with the shortcode being searched.
                if ( false !== strpos( $value, $shortcode_handle ) ) {
                    $shortcode_exists = true;

                    // Get all shortcode attribute keys.
                    $keys     = array_unique( array_merge( $keys, array_keys( $params ) ) );
                    $result[] = $params;
                }

            }

            if ( $shortcode_exists && ! empty( $result ) ) {

                // Loop the result array and add the missing shortcode attribute key.
                foreach( $result as $key => $value ) {
                    // Loop the shortcode attribute key
                    foreach( $keys as $attr_key ) {
                        $result[ $key ][ $attr_key ] = isset( $result[ $key ][ $attr_key ] ) ? trim($result[ $key ][ $attr_key ], '"') : NULL;
                    }
                    // Sort the array key.
                    ksort( $result[ $key ] );
                }

            }

            // Retrieve the result.
            if ( ! empty( $result ) ) {
                return $result;
            }

        }
        return false;
    }
}