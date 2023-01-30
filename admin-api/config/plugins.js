// path: ./config/plugins.js

module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'strapi-provider-qiniu-cyf', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        accessKeyId: env('QINIU_ACCESS_KEY_ID'),
        secretAccessKey: env('QINIU_ACCESS_SECRET'),
        domain: env('QINIU_DOMAIN'),
        zone: env('QINIU_ZONE'),
        params: {
          Bucket: env('QINIU_BUCKET'),
        },
      },
    },
  },
  'nuxt-tools': {
    enabled: true,
    resolve: './src/plugins/nuxt-tools', // path to plugin folder
  },
})
