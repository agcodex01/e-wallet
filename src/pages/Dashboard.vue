<template>
  <q-page padding>
    <h5>Current Balance : {{ $store.getters.getBalance }}</h5>
    <q-btn color="primary" unelevated label="Bank Transfer" class="q-mr-sm" to="/banks/list" />
    <q-btn
      unelevated
      :disable="$store.getters.getBalance < 1"
      color="primary"
      label="Send Money"
      @click="sendMoney"
    />
    <h5 class="q-mb-sm">Transactions</h5>
    <p v-if="$store.getters.getTransactions.length < 1">No transactions yet!</p>
    <div v-for="(transaction, i) in $store.getters.getTransactions" :key="i">
      <hr />
      <p>Date: {{ transaction.when }}</p>
      <p>Type: {{ transaction.type }}</p>
      <p>Amount: {{ transaction.amount }}</p>
      <hr />
    </div>
    <q-dialog
      v-model="modalOpen"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">
        <q-card-section class="q-pa-none text-white">
          <div class="bg-primary text-h6 q-pa-md">Send Money</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="sendMoneyConfirm" class="q-gutter-md">
            <q-input
              v-model="number"
              type="text"
              label="Receiver Number"
              mask="###########"
              hint="Format : 09*********"
              :rules="[
                val => !!val || 'Number is required.',
                val =>
                  val.match(/^(09|\+639)\d{9}$/) || 'Not valid phone number.'
              ]"
            />
            <q-input
              v-model="amount"
              type="number"
              label="Amount"
              :rules="[val => val > 0 || 'Fill in amount.']"
            />
            <div align="right">
              <q-space />
              <q-btn label="Cancel" flat v-close-popup />
              <q-btn
                :disable="$store.getters.getBalance < amount"
                flat
                label="Confirm"
                type="submit"
                color="primary"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { date } from "quasar";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      modalOpen: false,
      number: null,
      amount: 0
    };
  },
  beforeMount() {
    if (!this.$store.getters.getCurrentUser) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.commit("SET_HEADER", "Dashboard");
    console.log(this.$store.getters.getUsers)
    console.log(this.$store.getters.getTransactions)
  },
  methods: {
    sendMoneyConfirm() {
      this.modalOpen = false;
      this.$store.dispatch("sendMoney", {
        user_id: this.authUser.id,
        type: "Send Money",
        amount: this.amount,
        when: date.formatDate(Date.now(), "ddd MMM DD YYYY")
      });
    },
    sendMoney() {
      this.modalOpen = true;
    }
  },
  computed: {
    ...mapGetters({
      authUser : 'getCurrentUser'
    })
  }
};
</script>
