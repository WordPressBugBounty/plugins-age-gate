<div <?php echo $this->attr('age-gate-loader') ?>><?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
    <?php if ($settings->loaderImg) : ?>
        <?php $path = apply_filters('age_gate/loader/image', AGE_GATE_URL . 'dist/img/loader.svg'); ?>
        <img src="<?php echo esc_url($path); ?>" alt="<?php echo esc_attr__('Loading', 'age-gate') ?>" /><?php // phpcs:ignore PluginCheck.CodeAnalysis.ImageFunctions.NonEnqueuedImage ?>

    <?php else : ?>

        <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
                <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1"/>
            </circle>
            <circle fill="currentColor" stroke="none" cx="30" cy="50" r="6">
                <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2"/>
            </circle>
            <circle fill="currentColor" stroke="none" cx="54" cy="50" r="6">
                <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"/>
            </circle>
        </svg>
    <?php endif; ?>
</div>
