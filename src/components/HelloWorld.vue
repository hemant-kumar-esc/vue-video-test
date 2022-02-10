<template>
  <div>
    <div class="container">
      <section class="hero is-primary is-medium">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
          <nav class="navbar">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item">
                  <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                </a>
              </div>
              <div id="navbarMenuHeroA" class="navbar-menu p-2">
                <div class="navbar-end">
                  <a class="navbar-item m-3" @click="isCompared = 1">Campare Video</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
      <section class="hero is-primary">
        <div class="hero-body compare-section">
          <p class="title">Compare Video</p>
          <p
            class="subtitle"
            v-if="comparedKey.length < 2"
          >Please select {{ 2 - comparedKey.length }} video from below list</p>
          <div class="columns">
            <div class="column"> 
              <div class="block pointer" @click="addVideoToCompare(comparedValue[0])" v-if="comparedValue[0]"> <b-icon icon="close" size="is-medium"></b-icon> </div>
              <Player v-if="comparedValue[0]" :playerOptions="comparedValue[0]" :isPlay="isPlay" ></Player>
              <p v-if="comparedValue[0]">{{ comparedValue[0].team.name}}</p>
            </div>
            <div class="column">
              <div class="block pointer" @click="addVideoToCompare(comparedValue[1])" v-if="comparedValue[1]"> <b-icon icon="close" size="is-medium"></b-icon> </div>
              <Player v-if="comparedValue[1]" :playerOptions="comparedValue[1]" :isPlay="isPlay" ></Player>
              <p v-if="comparedValue[1]">{{ comparedValue[1].team.name}}</p>
            </div>
          </div>
          <div class="columns" v-if="comparedKey.length ==2">
            <div class="column has-text-centered pointer">
              <b-button type="is-info" @click="updateVideoStatus('play')" v-if="!isPlay">Play</b-button>
              <b-button type="is-link" @click="updateVideoStatus('pause')" v-if="isPlay">Pause</b-button>
            </div>
          </div>
        </div>
      </section>
      <section class="section p-0 mt-5"> 
        <div class="columns is-mobile is-centered" v-for="(feed) in feeds.data" :key="feed.id">
          <div class="column is-half">
            <div
              class="card"
              :class="{ 'compared': (isCompared == 1), 'selected': (comparedKey.indexOf(feed.id) !== -1) }"
              @click="addVideoToCompare(feed)"
            >
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{ feed.team.name }}</p>
                    <p class="subtitle is-6">{{ feed.title }}</p>
                  </div>
                </div>
                <div class="content">
                  <Player :playerOptions="feed"></Player>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-mobile is-centered" v-if="feeds">
          <div class="column is-half is-three-fifths">
            <b-pagination
              :total="feeds.numRows"
              v-model="current"
              :per-page="feeds.pageSize"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
              @change="updatePage"
              :icon-prev="'chevron-left'"
              :icon-next="'chevron-right'"
            ></b-pagination>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Player from './Player.vue';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      feeds: {},
      current: 1,
      comparedValue: [],
      comparedKey: [],
      isCompared: false,
      isPlay : false
    };
  },
  mounted() {
    axios
      .get("https://ludimos-videos-dev.s3.eu-central-1.amazonaws.com/test_jsons/feed_page_1.json")
      .then(response => (this.feeds = response.data));
  },
  computed: {
  },
  methods: {
    updateVideoStatus(status){ 
      this.isPlay = (status == 'play');
    },
    async updatePage() {
      try {

        await axios
          .get(`https://ludimos-videos-dev.s3.eu-central-1.amazonaws.com/test_jsons/feed_page_${this.current}.json`)
          .then(response => (this.feeds = response.data));
      } catch (error) {
        console.log('error while fetching data');
      }
    },
    addVideoToCompare(feed) {
      if (!this.isCompared || (!this.comparedKey.includes(feed.id) && this.comparedKey.length ==2)) return;
      
      if (!this.comparedKey.includes(feed.id)) {

        this.comparedValue.push(feed);
        this.comparedKey.push(feed.id);
      } else {
        var index = this.comparedKey.indexOf(feed.id);
        this.comparedKey.splice(index, 1);
        this.comparedValue.splice(index, 1);
      }

    }
  },
  components: { Player }
}
</script> 
<style>
.video-main {
  max-width: 440px;
  margin: 20px auto;
  padding: 0 20px;
}
.card {
  transition: 0.5s;
}
.card.compared:hover,
.card.compared.selected {
  background-color: #f7f5ff;
  cursor: pointer;
}
.compare-section .video-frame video{
  height:320px;
}
.pointer{ cursor:pointer}
</style>