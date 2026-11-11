<?php if ($settings->noscript) : ?>
    <noscript>
        <div class="age-gate-noscript" aria-hidden="true">
            <div>
                <?php echo wpautop(esc_html($settings->noscriptMessage)) ?>
            </div>
        </div>
    </noscript>
<?php endif; ?>
<?php do_action('age_gate/script_template/before'); ?>
<<?php echo esc_attr($settings->renderer === 'script' ? 'script' : 'template') ?> id="tmpl-age-gate" <?php echo $settings->renderer === 'script' ? 'type="text/template"' : '' ?> <?php echo $this->attr('age-gate-template'); ?>><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    <?php do_action('age_gate/script_content/before'); ?>
    <?php echo $this->section('content'); ?><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    <?php do_action('age_gate/script_content/after'); ?>
</<?php echo esc_attr($settings->renderer === 'script' ? 'script' : 'template') ?>>
<?php do_action('age_gate/script_template/after'); ?>
