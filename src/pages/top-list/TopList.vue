<template>
  <transition name="slide">
    <music-list :title="title"
                :name="name"
                :bgImage="bgImage"
                :desc="desc"                
    ></music-list>
  </transition>
</template>

<script>
import MusicList from 'pages/music-list/MusicList'
import {mapGetters} from 'vuex'
import {getTopList,getMusic} from 'api/rank'
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
      return this.topList.coverImgUrl
    },
    desc() {
      return this.topList.description
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    console.log(this.songList)
    this._getTopList(this.topList.id)
  },
  methods: {
    _getTopList(id) {
      getTopList(id).then((res)=>{
        if(res.data.code===ERR_OK){
          const songList= res.data.playlist.tracks
          songList.forEach((item) => {
            const music = getMusic(item.id)
            this.songList.push(music)
          })

        }
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