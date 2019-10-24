<template>
  <transition name="slide">
    <music-list :title="title"
                :name="name"
                :bgImage="bgImage"
                :desc="desc" 
                :songs="songList"               
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'pages/music-list/MusicList'
import {mapGetters} from 'vuex'
import {createSong} from 'assets/js/song'
import {ERR_OK} from 'api/config'
export default {
  name: 'TopList',
  components:{
    MusicList
  },
  data() {
    return{
      title: '歌单',
      songList: []
    }
  },
  computed: {
    name() {
      return this.topList.name
    },
    bgImage() {
      return this.topList.bgImage
    },
    desc() {
      return this.topList.desc
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      this.topList.songs.forEach((item) => {
      this.songList.push(createSong(item))
     })      
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    trasition: all 0.3s linear
  .slice-enter,.slide-leave-to
    transform: translate3d(100% 0 0)
</style>