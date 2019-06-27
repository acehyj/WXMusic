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
import { getAlbumDetail } from 'api/album'
import {createSong} from 'assets/js/song'
import MusicList from 'pages/music-list/MusicList'

export default {
  name: 'Album',
  data() {
    return {
      title: '专辑',
      desc: '',
      songs: []
    }
  },
  computed: {
    name() {
      return this.album.name
    },
    bgImage() {
      return this.album.pic
    },
    ...mapGetters([
      'album'
    ])
  },
  components:{
    MusicList
  },
  created() {
    this._getAlbumDetail()
  },
  methods:{
    _getAlbumDetail() {
      //当前页面刷新，id=undefined
      if (!this.album.id) {
        this.$router.push('/search')
      }
      getAlbumDetail(this.album.id).then((res)=>{
        if(res.data.code===ERR_OK){  
          this.songs = this._normalizeSongs(res.data.songs) 
          this.desc =  res.data.album.description
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translateX(100%)
</style>