<template>
  <q-page class="q-pa-md">
      <p class="text-subtitle1">Select Partner Bank</p>
      <q-list bordered class="q-mt-sm">
          <q-item :to="{path:'/banks/list/'+ bank.name}" clickable v-ripple v-for="bank in banks" :key="bank.name">
              <q-item-section avatar>
                  <q-icon color="primary" name="home" left />
              </q-item-section>
              <q-item-section>{{ bank.name }}</q-item-section>
          </q-item>
      </q-list>
  </q-page>
</template>
<script>
import { mapGetters } from "vuex";
export default {
   
    mounted() {
        this.$store.commit('SET_HEADER', 'Bank Transfer')
        
    },
    computed: {
        ...mapGetters({
            banks: 'getBanks'
        })
    }
}
</script>
