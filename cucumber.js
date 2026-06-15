const TAGS = process.env.TAGS

export default {
    parallel: 1,
    format: ['allure-cucumberjs/reporter'],
    requireModule: ['ts-node/register'],
    require: [
      './features/step-definitions/**/*',
      './features/config/**/*'
    ],
    tags: TAGS
}