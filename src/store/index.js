import Vue from "vue"
import Vuex from "vuex"

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 *
 * The function below can be async too either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function( /* { ssrContext } */ ) {
    const Store = new Vuex.Store({
        state: {
            page: {
                header: "E-wallet"
            },
            transactions: [],
            users: [],
            currentUser: null,
            banks: [{
                    name: 'BPI'
                },
                {
                    name: 'China Bank'
                },
                {
                    name: 'BDO'
                },
                {
                    name: 'Land Bank'
                }
            ]
        },
        getters: {
            getBalance: state => state.currentUser ? state.currentUser.money : 0,
            getPageHeader: state => state.page.header,
            getTransactions: state => state.transactions,
            getUsers: state => state.users,
            getCurrentUser: state => state.currentUser,
            getAuthUser: state => credential => {
                return state.users.find(account => account.number == credential.number && account.password == credential.password)
            },
            getBanks: state => state.banks

        },
        actions: {
            sendMoney({
                commit
            }, transaction) {
                commit("SEND_MONEY", transaction.amount)
                commit('ADD_TRANSACTION', transaction)
            },
            login({
                getters
            }, credential) {
                return getters.getAuthUser(credential)
            }
        },
        mutations: {
            SET_HEADER(state, newHeader) {
                state.page.header = newHeader
            },
            SEND_MONEY(state, sendMoeny) {
                state.currentUser.money -= sendMoeny
            },
            ADD_TRANSACTION(state, transaction) {
                state.transactions.unshift(transaction)
            },
            CHANGE_PROFILE(state, newProfile) {
                state.currentUser.fullname = newProfile.fullname
                state.currentUser.number = newProfile.number
            },
            CREATE_ACCOUNT(state, user) {
                state.users.push(user)
            },
            SET_CURRENT_USER(state, user) {
                state.currentUser = user
            },
            REMOVE_CURRENT_USER(state) {
                state.currentUser = null
            }
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEBUGGING
    })

    return Store
}