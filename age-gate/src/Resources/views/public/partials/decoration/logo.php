<div <?php echo $this->attr('age-gate-heading') ?>>
    <?php if ($settings->logo) : ?>
        <img src="<?php echo esc_url($settings->logo) ?>" width="<?php echo esc_attr($settings->logoWidth) ?>" height="<?php echo esc_attr( $settings->logoHeight ) ?>" alt="<?php echo esc_attr($settings->logoAlt ?: get_bloginfo('name')) ?>"<?php echo $this->attr('age-gate-logo') ?> />
    <?php elseif (!$settings->disableTitle) : ?>
        <<?php echo esc_attr($settings->headingElement ?: 'h1') ?> <?php echo $this->attr('age-gate-heading-title') ?>><?php echo esc_html($settings->heading ?: bloginfo('title')) ?></<?php echo esc_attr($settings->headingElement ?: 'h1') ?>>
    <?php endif; ?>
</div>
