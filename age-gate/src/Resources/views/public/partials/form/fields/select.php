<label <?php echo $this->attr('age-gate-' . $key . '-label') ?>><?php echo esc_html($label) ?></label><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
<select <?php echo $this->attr('age-gate-' . $key . '-select') ?> placeholder="<?php echo esc_attr($placeholder) ?>"><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    <option value=""><?php echo esc_html($placeholder) ?></option>
    <?php foreach ($options as $key => $option) : ?>
        <option value="<?php echo esc_attr($key) ?>"<?php echo $key == str_pad($value, 2, "0", STR_PAD_LEFT) ? ' selected' : '' ?>><?php echo esc_html($option) ?></option>
    <?php endforeach; ?>
</select>
