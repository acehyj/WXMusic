<template>
  <div class="search-detail">
    <h1 class="title" v-show="showAlbum||showArtist">最佳匹配</h1>
    <div class="album" v-for="item of album" :key="item.id" @click="selectAlbum(item)" v-show="showAlbum">
      <img class="image" :src="item.picUrl">
      <div class="text">
        <h1 class="name">专辑：{{item.name}}</h1>
        <p class="singer">{{item.artist.name}}</p>
      </div>
      <span class="icon iconfont">&#xe602;</span>
    </div>
    
    <div class="artist" v-for="item of artist" :key="item.artist" @click="selectArtist(item)" v-show="showArtist">
      <img :src="item.img1v1Url">
      <span class="name">歌手：{{item.name}}</span>
      <span class="icon iconfont">&#xe602;</span>
    </div>

    <ul class="songs">
      <li class="item" v-for="item of songs" :key="item.id" @click="selectSong(item)">
        <div class="text">
          <h1 class="name">{{item.name}}</h1>
          <h2 class="desc">{{item.artists["0"].name}} - {{item.album.name}}</h2> 
        </div>
        <span class="icon iconfont">&#xe614;</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'
import Singer from 'assets/js/singer'
import Album from 'assets/js/album'
import {getSongDetail} from 'api/song'
import {createSong} from 'assets/js/song'
import {searchBestMatch,searchSongs} from 'api/search'
import {mapMutations,mapActions} from 'vuex'
export default { 
  name: 'SearchDetail',
  data() {
    return {
      album: [{"picUrl":"", "name":"","artist":{"name":""}}],
      artist: [{"img1v1Url":"","name":""}],
      songs: [],
      showAlbum: '',
      showArtist: ''
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  methods: {
    searchBestMatch(key) {
      searchBestMatch(key).then((res)=>{
        if (res.data.code===ERR_OK){
          const album = res.data.result.album
          const artist = res.data.result.artist
          this.album = album === undefined ? this.album : album
          this.artist = artist  === undefined ? this.artist: artist
          this.showOrNot()
        }
      })
    },
   showOrNot(){
      this.showAlbum = this.album[0].name.length
      this.showArtist = this.artist[0].name.length
   },
    searchSongs(key) {
      searchSongs(key).then((res)=>{
        if (res.data.code===ERR_OK){
          this.songs = res.data.result.songs
        }
      })
    },
    selectAlbum(item) {
      const album = new Album({
            name: item.name,
            id: item.id,
            pic: item.picUrl
          })
      this.setAlbum(album)
      this.$router.push({
        path: `/search/album/${item.id}`
      })
    },
    selectArtist(item) {
      const singer = new Singer({
            name: item.name,
            id: item.id,
            pic: item.img1v1Url,
            pic2: item.picUrl,
            alias: item.alias
          })  
      this.$router.push({
        path: `/search/singer/${item.id}`
      })  
      this.setSinger(singer)
    },
    selectSong(item) {
      getSongDetail(item.id).then((res) => {
        const song = createSong(res.data.songs[0])        
        this.insertSong(song)
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
      setAlbum: 'SET_ALBUM'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  // created() {
  //   this.searchBestMatch(this.query)
  //   this.searchSongs(this.query)
  // },
  watch: {
    query(newQuery) {
      if(newQuery !==''){
        this.$emit('query', newQuery)
        this.searchBestMatch(newQuery)
        this.searchSongs(newQuery)
      }else{
        this.$router.go(-1)
      }
    }
  }
}
</script>
 
<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .search-detail
    position: fixed   
    top: 3.28rem
    left: 0
    right:0
    bottom: 0
    width: 100%
    overflow: scroll
    font: $font-large-x
    background-color: $color-background 
    font: $font-large
    .title
      color: $color-sm-title
      border-top: $border-list
      font: $font-small
    .album
      display: flex
      justify-content: space-around
      align-items: center
      height: 1.2rem
      margin: 0 0 0 .2rem
      padding: .16rem .2rem .16rem 0
      border-bottom: $border-list
      img 
        width: 1rem  
        margin-right: .2rem
        vertical-align: top  
      .text
        flex: 1
        display: flex
        justify-content: space-around
        height: 1rem      
        align-items: flex-start  
        flex-direction: column
        overflow: hidden
        .name
          color: $color-title  
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap 
          font: $font-large-x       
        .singer
          padding: 0 
          color: $color-subtitle
          font: $font-small
      .icon
        padding-left: .2rem
        color: #888
        font: $font-large-x
    .artist
      display: flex
      flex-direction: row
      justify-content: space-around
      align-items: center
      height: 1.2rem
      margin: 0 0 0 .2rem
      padding: .16rem .2rem .16rem 0
      border-bottom: $border-list
      font: $font-large-x
      img 
        width: 1rem
        margin-right: .2rem
        vertical-align: top
      .name
          flex: 1
          font: $font-large-x
      .icon
        padding-left: .2rem
        color: $color-play-icon
        font: $font-large-x
    .songs  
      display: flex
      flex-direction: column  
      .item  
        display: flex
        align-items: center
        justify-content: space-around
        padding: 0 .2rem
        border-bottom: $border-list
        .text
          flex: 1
          width: 50%
          display: flex
          flex-direction: column
          justify-content: space-around
          height: 1.2rem
          color:  $color-title
          .name
            font: $font-large-x
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .desc
            color: $color-subtitle
            font: $font-small 
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        .icon
          padding-left: .2rem
          color: #888
          font-size: 30px 
</style>