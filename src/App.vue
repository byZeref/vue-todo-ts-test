<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { RouterView } from 'vue-router'

const app = getCurrentInstance()
const global = app?.appContext.config.globalProperties.$myGlobalVar
console.log(app, global);

</script>

<template>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

</style>
