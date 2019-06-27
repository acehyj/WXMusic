<template>
  <div class="music-list" ref="list">
    <div class="back" @click="back">
      <i class="iconfont icon-back">&#xe600;</i> 
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
      <div class="name">{{name}}</div>
    </div>
    <div class="desc" @click="toggleDesc" ref="desc">
        <span class="hidDesc" ref="hidDesc">{{desc}}</span>
        <div class="arrow iconfont" ref="arrow" v-html="changeArrow"></div> 
    </div>
    <song-list @select="selectItem" :songs="songs" class="song-list"></song-list> 
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'
import SongList from './components/SongList'
import {mapActions} from 'vuex'
import {prefixStyle} from 'assets/js/dom'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  data() {
    return{
      changeArrow:"&#xe610;",
      singerDesc: ""
    }
  },
  props:{
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },    
    desc: {
      type: String,
      default: ''
    },  
    songs: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    SongList
  },
  computed:{
    bgStyle() {
      return `background-image: url(${this.bgImage} )`
    }
  },
  methods:{
    back() {
      const time = 300
      this.$refs.list.style[transform]=`translate3d(100vw,0,0)`
      this.$refs.list.style[transitionDuration] = `${time}ms`
      this.$router.go(-1)
    },
    toggleDesc() {
      this.$refs.hidDesc.className=(this.$refs.hidDesc.className==="hidDesc")?"":"hidDesc"
      this.changeArrow=(this.changeArrow==="&#xe610;")?"&#xe604;":"&#xe610;"
    },
    selectItem(item,index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    overflow: scroll    
    .back
      position absolute
      top: 0
      left: .12rem
      z-index: 40
      .icon-back
        display: block
        padding: .2rem
        font-size: 25px
        color: $color-icon
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      padding: .24rem
      font: $font-large-x
      color: #fff
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      background-position: center
      .name
        position: absolute 
        bottom: .2rem 
        left:.3rem
        font: $font-large-2x
        color: #fff
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.15)
        color: #fff
    .desc
      color: $color-desc
      font: $font-medium-x
      position: relative
      padding: .3rem .3rem .4rem    
      .hidDesc
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box;
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
      .arrow
        position: absolute 
        right: .1rem
        bottom: 0
        text-align: right
        font-size: 18px
        width: 100%
</style>