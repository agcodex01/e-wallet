<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 q-mb-sm">Basic Info</div>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ $store.getters.getCurrentUser.fullname }}</q-item-label>
              <q-item-label caption>Fullname</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ $store.getters.getCurrentUser.number }}</q-item-label>
              <q-item-label caption>Phone Number</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions vertical align="right">
        <q-btn color="primary" flat label="Update" @click="confirm = true" />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 300px">
        <q-card-section class="q-pa-none text-white">
          <div class="bg-primary text-h6 q-pa-md">Update Profile</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="updateProfile" class="q-gutter-md">
            <q-input
              v-model="profile.fullname"
              type="text"
              label="Fullname"
              :rules="[val => !!val || 'Fullname is required.']"
            />
            <q-input
              v-model="profile.number"
              type="number"
              label="Phone Number"
              mask="###########"
              hint="Format : 09*********"
              :rules="[
                val => !!val || 'Number is required.',
                val =>
                  val.match(/^(09|\+639)\d{9}$/) || 'Not valid phone number.'
              ]"
            />
            <div align="right">
              <q-space />
              <q-btn label="Cancel" flat v-close-popup />
              <q-btn flat label="Confirm" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      confirm: false,
      profile: {
        fullname: this.$store.getters.getCurrentUser.fullname,
        number: this.$store.getters.getCurrentUser.number
      }
    }
  },
  methods: {
    updateProfile() {
      this.$store.commit("CHANGE_PROFILE", this.profile)
      this.confirm = false
    }
  },
  mounted() {
    this.$store.commit("SET_HEADER", "Profile")
  }
}
</script>
