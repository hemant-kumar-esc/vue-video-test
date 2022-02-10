import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import Embed from 'v-video-embed'

Vue.use(Buefy) 
Vue.use(VueVideoPlayer)
Vue.use(Embed);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
