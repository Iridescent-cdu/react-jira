module.exports = {
    extends: [
        'stylelint-config-standard',
        // 如果是vue项目，需要添加
        // 'stylelint-config-recommended-vue',
    ],
    // rule覆盖（根据自己喜好来配置）
    rules: {
        'string-quotes': 'single',
        'property-no-vendor-prefix': null,
        'declaration-colon-newline-after': null,
        'value-list-comma-newline-after': null,
        'custom-property-pattern': null,
        'color-hex-length': 'short',
        'color-function-notation': null,
        'alpha-value-notation': null,
        'value-no-vendor-prefix': null,
        'selector-class-pattern': null,
        'function-url-quotes': null,
        'no-missing-end-of-source-newline': true,
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
    },
    // overrides: [
    //     // 若项目中存在scss文件，添加以下配置
    //     {
    //         files: '**/*.scss',
    //         customSyntax: 'postcss-scss',
    //     },
    //     // 若项目中存在less文件，添加以下配置
    //     {
    //         files: '**/*.less',
    //         customSyntax: 'postcss-less',
    //     },
    // ]
};