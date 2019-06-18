import 'font-awesome/css/font-awesome.min.css'
import Vuetify from 'vuetify'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase';
import router from './router'
import store from './store'

window.moment = require('moment')
require('moment/locale/tr')

window._ = require('lodash')

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'fa4'
})

Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCNjPjlgojEdIYtHcpI2wc6aJClK5qgarg",
      authDomain: "sosyal-medya-icerik-takip.firebaseapp.com",
      databaseURL: "https://sosyal-medya-icerik-takip.firebaseio.com",
      projectId: "sosyal-medya-icerik-takip",
      storageBucket: "sosyal-medya-icerik-takip.appspot.com",
      messagingSenderId: "896211903115"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })

    this.$store.dispatch('loadLists')
  }
}).$mount('#app')