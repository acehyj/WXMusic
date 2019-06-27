<template>
  <transition name="slide">
    <music-list  :title="title"
                 :name="name"
                 :bgImage="bgImage"
                 :desc="desc"
                 :songs="hotSongs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import {ERR_OK} from 'api/config'
import { getSingerDetail,getSingerDesc} from 'api/singer'
import {createSong} from 'assets/js/song'
import MusicList from 'pages/music-list/MusicList'
export default {
  name: 'SingerDetail',
  data() {
    return {
      title: '歌手',
      name: '',
      desc: '',
      hotSongs: []
    }
  },
  computed: {
    bgImage() {
      return this.singer.pic2
    },
    ...mapGetters([
      'singer'
    ])
  },
  components:{
    MusicList
  },
  created() {
    this._getSingerDetail()
    this._getSingerDesc()
    this._singerFullName()
  },
  methods:{
    _getSingerDetail() {
      //当前页面刷新，id=undefined,拿不到歌手信息
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.data.code===ERR_OK){  
          this.hotSongs = this._normalizeSongs(res.data.hotSongs)   
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
    _getSingerDesc() {
      getSingerDesc(this.singer.id).then((res)=>{
        if(res.data.code===ERR_OK){ 
          this.desc = res.data.briefDesc||"暂无介绍"
        }
      })    
    },
    _singerFullName() {
      this.name = this.singer.alias.length==0? this.singer.name : this.singer.name + ' ( '+this.singer.alias[0] + ' )'
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