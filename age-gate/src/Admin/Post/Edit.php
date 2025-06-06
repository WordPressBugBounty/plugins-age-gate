<?php

namespace AgeGate\Admin\Post;

use AgeGate\Admin\Content\DisabledTypes;
use Asylum\Utility\Admin;
use AgeGate\Common\Content;
use AgeGate\Common\Settings;
use AgeGate\Common\Immutable\Constants;
use Jawira\CaseConverter\Convert;
use AgeGate\Admin\Post\PostTrait as Post;

class Edit
{
    use DisabledTypes;

    private $settings;
    private $view;

    public function __construct($view)
    {
        $this->view = $view;
        $this->settings = Settings::getInstance();


        add_action('save_post', [$this, 'store'], PHP_INT_MAX);
        add_action('add_meta_boxes', [$this, 'addMetaBox'], 10, 2);
    }

    /**
     * Store user options
     *
     * @return void
     */
    public function store($postId)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $postData = wp_unslash($_POST ?? []);

        // check nonce
        if (!wp_verify_nonce($postData['_agn'] ?? '', 'age_gate_post_edit')) {
            return;
        }

        $content = new Content($postId);

        // mutli ages?
        if ($this->settings->multiAge && current_user_can(Constants::SET_CUSTOM_AGE)) {
            $language = $content->getLanguage() ?: sanitize_text_field($postData['post_lang_choice'] ?? $postData['icl_post_language'] ?? '');

            $default = $this->settings->{$language}['defaultAge'] ?? $this->settings->defaultAge;

            if ($postData['ag_settings']['age'] ?? false) {
                $age = (int) $postData['ag_settings']['age'];

                if ($age === (int) $default) {
                    // remove the meta as we don't need it
                    delete_post_meta($postId, Constants::META_AGE);
                } else {
                    // add new meta key
                    update_post_meta($postId, Constants::META_AGE, $age);
                }
            } else {
                delete_post_meta($postId, Constants::META_AGE);
            }
        }

        // bypass ?
        if ($this->settings->type === 'all' && current_user_can(Constants::SET_CONTENT)) {
            if ($postData['ag_settings']['bypass'] ?? false) {
                // add new meta key
                update_post_meta($postId, Constants::META_BYPASS, 1);
            } else {
                // remove the meta as we don't need it
                delete_post_meta($postId, Constants::META_BYPASS);
            }
        }

        // restrict
        if ($this->settings->type === 'selected' && current_user_can(Constants::SET_CONTENT)) {
            if ($postData['ag_settings']['restrict'] ?? false) {
                // add new meta key
                update_post_meta($postId, Constants::META_RESTRICT, 1);
            } else {
                // remove the meta as we don't need it
                delete_post_meta($postId, Constants::META_RESTRICT);
            }
        }
    }

    /**
     * Add options meta box
     *
     * @return void
     * @todo Make native Block editor options setting
     */
    public function addMetaBox($postType, $post)
    {
        // TODO: Make native Block editor options setting
        // if (Admin::isBlockEditor()) {
        //     return;
        // }

        global $typenow;

        $disable = ($this->settings->disable[$typenow] ?? false) || in_array($typenow, $this->getDefaultDisabledTypes()) || $postType === 'woocommerce_page_wc-orders';


        if (!$disable) {
            add_meta_box(
                'age_gate',
                __('Age Gate', 'age-gate'),
                [$this, 'render'],
                $typenow,
                'side',
                'high'
            );
        }
    }

    public function render()
    {
        global $post;

        $data = [
            'content' => new Content($post->ID),
            'settings' => Settings::getInstance(),
            'setRestriction' => current_user_can(Constants::SET_CONTENT),
            'setAge' => current_user_can(Constants::SET_CUSTOM_AGE),
            'contentOption' => $this->settings->type === 'selected' ? Constants::META_RESTRICT : Constants::META_BYPASS,
        ];

        echo $this->view->addData($data)->render('post/meta-box'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
}
