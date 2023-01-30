'use strict'

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').getWelcomeMessage()
  },
  getStatus(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').getStatus()
  },
  generate(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').generate()
  },
  build(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').build()
  },
  start(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').start()
  },
  stop(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').stop()
  },
  restart(ctx) {
    ctx.body = strapi.plugin('nuxt-tools').service('dashboard').restart()
  },
})
