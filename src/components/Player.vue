<template>
  <div class="video-inner" ref="videoPlayer"> 
    <div class="video-frame"> 
      <Media :kind="'video'" :controls="true" :src="playerOptions.source_url" ref="videop"></Media>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Media from '@dongido/vue-viaudio'

export default {
  props: {
    playerOptions: {},
    isPlay:Boolean
  },
  components: {
    Media
  },
  data() {
    return {
    }
  },
  mounted() {
    axios
      .get('https://ludimos-videos-dev.s3.eu-central-1.amazonaws.com/test_jsons/feed_page_1.json')
      .then(response => (this.feeds = response.data))
  },
  watch:{
    isPlay : function(){
      if(this.isPlay){
        this.$refs.videop.play() 
      } else {
        this.$refs.videop.pause() 
      }
    }
  }, 
}
</script>  
<style scoped>
.video-inner{margin:0 0 20px;background:#f5f5f5;} .video-frame video{width:100%;height:100%;} 
</style>