<template>
  <transition name="slide">
    <music-list  :title="title"
                 :name="name"
                 :bgImage="bgImage"
                 :desc="desc"
                 :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {getDiscDetail} from 'api/disc'
import {createSong} from 'assets/js/song'
import MusicList from 'pages/music-list/MusicList'

export default {
  name: 'Disc',
  data() {
    return {
      title: '歌单',
      desc: '',
      songs: []
    }
  },
  computed: {
    name() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.picUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  components:{
    MusicList
  },
  created() {
    this._getDiscDetail()
  },
  methods:{
    _getDiscDetail() {
      //当前页面刷新，id=undefined,拿不到歌单信息
      if (!this.disc.id) {
        this.$router.push('/recommend')
      }
      getDiscDetail(this.disc.id).then((res)=>{
        if(res.data.code===ERR_OK){  
          this.songs = this._normalizeSongs(res.data.playlist.tracks) 
          this.desc =  res.data.playlist.description
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret
    },
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>