<template>
  <!-- Теперь Vue сам решит, что показать: Login или Dashboard -->
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #10141a;
  color: #dfe2eb;
  font-family: 'Inter', sans-serif;
}
</style>
