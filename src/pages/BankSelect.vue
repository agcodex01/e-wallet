<template>
  <q-page class="q-pa-md">
    <p class="text-subtitle1">{{ selected }}</p>
    <q-separator />
    <q-form @submit="submit" class="q-gutter-lg q-pa-lg">
      <q-input
        v-model="form.account_name"
        type="text"
        label="Account Name"
        :rules="[val => !!val || 'Account name is required.']"
      />
      <q-input
        v-model="form.account_number"
        type="number"
        label="Account Number"
        :rules="[val => !!val || 'Account number is required.']"
      />
      <q-input
        v-model="form.amount"
        type="number"
        label="Amount"
        :rules="[
          val => val > 0 || 'Fill in amount.',
          val =>
            val <= $store.getters.getBalance ||
            'Amount should not be greater than the current balance.'
        ]"
      />
      <div>
        <q-btn type="submit" color="primary" class="full-width">
          Send Money
        </q-btn>
      </div>
    </q-form>
    <q-dialog
      v-model="modalOpen"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">
        <q-card-section class=" text-white bg-primary q-px-md">
          <div class=" text-h6 ">Info</div>
          <div class="text-subtitle2">You are about to transfer money.</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section
                >Account Name: {{ form.account_name }}</q-item-section
              >
            </q-item>
            <q-item>
              <q-item-section
                >Account Number: {{ form.account_number }}</q-item-section
              >
            </q-item>
            <q-item>
              <q-item-section>Amount: {{ form.amount }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn
            color="primary"
            :loading="loading"
            class="full-width"
            @click="sendMoneyConfirm"
          >
            Confirm
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Loading...
            </template>
          </q-btn>
        </q-card-actions>
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
      form: {
        amount: 0,
        account_name: "",
        account_number: null
      },
      selected: null,
      modalOpen: false,
      loading: false
    };
  },
  mounted() {
    this.$store.commit("SET_HEADER", "Bank Transfer");
    this.selected = this.$route.params.name;
  },
  methods: {
    submit() {
      this.modalOpen = true;
    },
    sendMoneyConfirm() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("sendMoney", {
          user_id: this.authUser.id,
          type: "Bank Transfer",
          amount: this.form.amount,
          when: date.formatDate(Date.now(), "ddd MMM DD YYYY")
        });
        this.$router.push({name:'dashboard'})
        this.modalOpen = false;
        this.loading = false;
      }, 3000);
    }
  },
  computed: {
    ...mapGetters({
      authUser : 'getCurrentUser'
    })
  }
};
</script>
