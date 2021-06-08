<template>
  <div class="flex flex-center align-center">
    <img
      alt="Quasar logo"
      src="~assets/wallet-app.png"
      style="width: 200px height: 200px"
    />
    <h3 class="text-center">Simple e-wallet App</h3>
    <q-btn color="primary"  label="Continue" @click="proceed" />
  </div>
</template>

<script>
export default {
  name: "PageIndex",
  methods: {
    proceed() {
      this.$q.loadingBar.start()
      setTimeout(() => {
        this.$q.loadingBar.stop()
        this.$router.push({ name: "login" })
      }, 3000)
    }
  },
}
</script>
