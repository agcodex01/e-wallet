<template>
  <div class="flex-center">
    <q-btn to="/auth/login" flat icon="arrow_back" />
    <h5 class="text-center q-mb-sm">Register account</h5>
    <q-form @submit="submit" class="q-gutter-lg q-pa-lg">
      <q-input v-model="form.fullname" type="text" label="Fullname" />
      <q-input
        v-model="form.number"
        type="text"
        label="Number"
        mask="###########"
        hint="Format : 09*********"
        :rules="[
          val => !!val || 'Phone number is required.',
          val => val.match(/^(09|\+639)\d{9}$/) || 'Not valid phone number.'
        ]"
      />
      <q-input
        v-model="form.password"
        :rules="[val => !!val || 'Password is required.']"
        :type="isPwd ? 'password' : 'text'"
        label="Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div>
        <q-btn
          type="submit"
          :loading="loading"
          color="primary"
          class="full-width"
        >
          Register
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPwd: true,
      loading: false,
      form: {
        fullname: "",
        number: "",
        password: "",
        money: 1000  
      }
    }
  },
  methods: {
    submit() {
      this.loading = true
      setTimeout(() => {
        this.form.id = this.$store.getters.getUsers.length
        this.$store.commit('CREATE_ACCOUNT', this.form)
        this.$router.push({name: 'login'})
        this.loading = false
      }, 5000)
    }
  }
}
</script>
