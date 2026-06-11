const TAGS = process.env.TAGS

export default {
    parallel: 1,
    format: ['allure-cucumberjs/reporter',
      // 'summary' // conflicts with Allure, disable for regression runs
    ],
    requireModule: ['ts-node/register'],
    require: [
      './features/step-definitions/**/*',
      './features/config/**/*'
    ],
    tags: TAGS
}