<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    if(!this.$store.getters.getCurrentUser) {
      this.$router.push({name: 'login'})
    }
  }
}
</script>
