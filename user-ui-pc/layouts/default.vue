<template>
  <div>
    <div class="flex justify-between items-center px-60 h-20">
      <div>
        <nuxt-link :to="localePath('/')">home</nuxt-link>
        <nuxt-link :to="localePath('/about')">about</nuxt-link>
      </div>
      <div>
        <nuxt-link :to="switchLocalePath('en')"> English </nuxt-link>
        <nuxt-link :to="switchLocalePath('fr')"> French </nuxt-link>
        <nuxt-link :to="switchLocalePath('es')"> Español </nuxt-link>
        <nuxt-link :to="switchLocalePath('zh-CN')"> 简体中文 </nuxt-link>
      </div>
    </div>
    <Nuxt />
  </div>
</template>
