<?php $this->layout('partials/fields/wrapper', ['field' => $field, 'lang' => $lang ?? false]) ?>

<?php $this->start('input') ?>
    <select name="<?php echo esc_attr($this->form_key($field_prefix . '.' . $name)) ?>" <?php echo html_build_attributes($field['attributes'] ?? []) ?>><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    <?php foreach ($field['options'] as $value => $text) : ?>
        <option value="<?php echo esc_attr($value) ?>" <?php echo (($data[$name] ?? false) ?: $field['default']) === $value ? 'selected' : ''; ?>><?php echo esc_html($text) ?></option>
        <?php endforeach; ?>
    </select>
<?php $this->stop(); ?>
