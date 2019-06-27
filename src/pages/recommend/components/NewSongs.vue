<template>
  <div class="song-list">
    <h1 class="list-title">最新音乐</h1>
    <ul v-for="item of list" :key="item.id"> 
      <li class="list-content" v-if="showSongs" @click="selectSong(item)">      
        <div class="text">
          <div class="song">{{item.name}}</div>
          <div class="desc">  
            {{item.song.artists[0].name}}-{{item.song.album.name}}
          </div>
        </div>
        <span class="play iconfont">&#xe614;</span>
      </li>
    </ul>
    <div class="loading-container" v-show="!showSongs">    
        <loading></loading>
    </div> 
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {createSong} from 'assets/js/song'
import {getSongDetail} from 'api/song'
import Loading from "base/loading/Loading"

export default {
  name: 'RemdList',
  props: {
    list: Array
  },
  computed: {
    showSongs() {
      return this.list.length
    }
  },
  components: {
    Loading
  },
  methods:{
    selectSong(item) {
      getSongDetail(item.id).then((res) => {
        const song = createSong(res.data.songs[0])
        this.insertSong(song)
      })
    },
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="stylus">
  @import "~assets/styles/variable"
  .song-list
    .list-title
      font: $font-large-x
      margin: 0.2rem auto
      padding-left:  0.18rem
      border-left: $border-title
    .list-content
      display: flex
      align-items: center
      justify-content: space-between
      height: 1.1rem
      font: $font-large-x
      border-bottom: $border-list
      .text
        margin-left: .25rem
        flex-direction: column
        .song
          color: $color-title  
        .desc
          font: $font-small
          color: $color-subtitle
      .play
        display: flex
        justify-content:center
        align-items: center
        width: .8rem
        color: $color-play-icon
        font-size: .5rem
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>