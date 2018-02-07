// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from "./store/index";
import DateFilter from './filters/date'
import AlterCmp from './components/shared/Alert.vue'

Vue.component('app-alert',AlterCmp)

Vue.filter('date', DateFilter)

Vue.use(Vuetify, { theme: {
  primary: '#B22222',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  components: { App },
  template: '<App/>',
  created () {
      firebase.initializeApp({
          apiKey: "AIzaSyCxVRdZak7TtR_c1TNtwYSq9vi5uDk8Yf0",
          authDomain: "seie-vuemeetup.firebaseapp.com",
          databaseURL: "https://seie-vuemeetup.firebaseio.com",
          projectId: "seie-vuemeetup",
          storageBucket: "seie-vuemeetup.appspot.com",
      })
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.$store.dispatch('autoSignIn',user)
          }

      })
      this.$store.dispatch('loadMeetups')
  }
})

