<template>
  <main class="px-60">
    <h1>{{ $t('welcome') }}</h1>
    <div class="mt-10">
      <div v-for="fish in fishs" :key="fish.id" class="mb-8">
        <div class="text-xl font-bold">{{ fish.attributes.name }}</div>
        <div>{{ fish.attributes.desc }}</div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      fishs: [],
    }
  },
  watch: {
    '$i18n.locale'() {
      this.getFishs()
    },
  },
  created() {
    this.getFishs()
  },
  methods: {
    async getFishs() {
      const locale = this.$i18n.locale
      const res = await this.$strapi.find('fishs', { locale })
      this.fishs = res.data
    },
  },
})
</script>
