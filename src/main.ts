import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import store from '@/store/index'

Vue.config.productionTip = false


Vue.filter('humanize', function(date: Date)
{
  return moment(date).fromNow();
})

Vue.filter("byDate", (date: Date) => moment(date).calendar({
  sameElse: 'Do MMMM YYYY [at] hh:mm A'
 }));

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
