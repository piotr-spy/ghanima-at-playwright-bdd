const TAGS = process.env.TAGS

export default {
    parallel: 1,
    requireModule: ['ts-node/register'],
    require: [
      './features/step-definitions/**/*',
      './features/config/**/*'
    ],
    tags: TAGS
}