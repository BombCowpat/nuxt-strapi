const qiniu = require('qiniu')
const zones = {
  huadong: qiniu.zone.Zone_z0,
  huabei: qiniu.zone.Zone_z1,
  huanan: qiniu.zone.Zone_z2,
  beimei: qiniu.zone.Zone_na0,
}
module.exports = {
  init(providerOptions) {
    // init your provider if necessary

    const mac = new qiniu.auth.digest.Mac(providerOptions.accessKeyId, providerOptions.secretAccessKey)
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: providerOptions.params.Bucket,
    })

    const uploadToken = putPolicy.uploadToken(mac)

    return {
      upload(file) {
        // upload the file in the provider
        // file content is accessible by `file.buffer`
        /* return new Promise((resolve, reject) => {
          const config = new qiniu.conf.Config()
          config.zone = qiniu.zone.Zone_z2
          const formUploader = new qiniu.form_up.FormUploader(config)
          const path = file.path ? `${file.path}/` : ''
          const key = `${path}${file.hash}${file.ext}`
          const putExtra = new qiniu.form_up.PutExtra()
          formUploader.put(uploadToken, key, file.buffer, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
              // throw respErr
              reject(respErr)
            }
            if (respInfo.statusCode == 200) {
              console.log(respBody)
              file.url = `${providerOptions.domain}/${key}`
              resolve()
            }
          })
        }) */
      },
      uploadStream(file) {
        // upload the file in the provider
        // file content is accessible by `file.stream`
        return new Promise((resolve, reject) => {
          const config = new qiniu.conf.Config()
          config.zone = zones[providerOptions.zone]
          const formUploader = new qiniu.form_up.FormUploader(config)
          const path = file.path ? `${file.path}/` : ''
          const key = `${path}${file.hash}${file.ext}`
          const putExtra = new qiniu.form_up.PutExtra()
          formUploader.putStream(uploadToken, key, file.stream, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
              reject(respErr)
            }
            if (respInfo.statusCode == 200) {
              file.url = `${providerOptions.domain}/${key}`
              resolve()
            }
          })
        })
      },
      delete(file) {
        // delete the file in the provider
      },
    }
  },
}
