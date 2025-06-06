<?php

namespace AgeGate\Presentation;

use Asylum\Utility\Color;
use Asylum\Utility\Storage;
use AgeGate\Common\Settings;

class Form
{
    private $settings;
    private $custom = 'age-gate-custom';
    private $options = 'age-gate-options';

    public function __construct()
    {
        $this->settings = Settings::getInstance();
    }

    public function optionStyle()
    {
        wp_register_style($this->custom, false); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
        wp_add_inline_style($this->custom, wp_strip_all_tags(stripslashes(html_entity_decode($this->getStyleOptions(), ENT_QUOTES))));

        return $this;
    }

    public function customStyle()
    {
        if (!trim($this->settings->css)) {
            return $this;
        }

        if ($this->settings->cssFile && file_exists(Storage::storageDir('css', 'age-gate') . '/custom.css')) {
            $deps = [];

            if ($this->settings->enqueueCss) {
                $deps = ['age-gate'];
            }

            wp_register_style($this->custom, Storage::storageUrl('css', 'age-gate') . '/custom.css', $deps, AGE_GATE_VERSION);
        } else {
            wp_register_style($this->custom, false); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion

            wp_add_inline_style($this->custom, wp_strip_all_tags(stripslashes(html_entity_decode($this->settings->css, ENT_QUOTES))));
        }

        return $this;
    }

    public function enqueue()
    {
        wp_enqueue_style($this->custom);
        wp_enqueue_style($this->options);
    }

    private function getStyleOptions()
    {
        $options = [
            'backgroundColor',
            'backgroundOpacity',
            'backgroundImage',
            'backgroundPosition',
            'backgroundImageOpacity',
            'blur',
            'foregroundColor',
            'foregroundOpacity',
            'textColor',
        ];

        $styles = '';

        if ($this->settings->backgroundColor) {
            $styles .= $this->variable('--ag-background-color', Color::hex2rgb($this->settings->backgroundColor,  $this->settings->backgroundOpacity !== false ? (float) $this->settings->backgroundOpacity : 1));
        }

        if ($this->settings->backgroundImage) {
            $styles .= $this->variable('--ag-background-image', 'url(' . $this->settings->backgroundImage . ')');
        }

        if ($this->settings->backgroundPosition) {
            $styles .= $this->variable('--ag-background-image-position', $this->settings->backgroundPosition['x'] . ' ' . $this->settings->backgroundPosition['y']);
        }

        if ($this->settings->backgroundImageOpacity) {
            $styles .= $this->variable('--ag-background-image-opacity', $this->settings->backgroundImageOpacity !== false ? (float) $this->settings->backgroundImageOpacity : 1);
        }


        if ($this->settings->foregroundColor) {
            $styles .= $this->variable('--ag-form-background', Color::hex2rgb($this->settings->foregroundColor, $this->settings->foregroundOpacity !== false ? (float) $this->settings->foregroundOpacity : 1));
        }

        if ($this->settings->textColor) {
            $styles .= $this->variable('--ag-text-color', $this->settings->textColor);
        }


        if ($this->settings->blur) {
            $styles .= $this->variable('--ag-blur', $this->settings->blur . 'px');
        }

        $styles = trim($styles);
        wp_register_style($this->options, false, ['age-gate']); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion

        if ($styles) {
            $styles = sprintf(':root{%s}', $styles);

            wp_add_inline_style($this->options, wp_strip_all_tags(stripslashes(html_entity_decode($styles, ENT_QUOTES))));
        }

        return $styles;

    }

    private function variable($key, $value)
    {
        return sprintf('%s: %s;', $key, $value);
    }
}
