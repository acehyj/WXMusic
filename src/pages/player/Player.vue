<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
            <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back iconfont">&#xe603;</i>
          </div>
          <div class="text">
            <h1 class="song" v-html="currentSong.name"></h1>
            <h2 class="singer" v-html="currentSong.singer"></h2>
          </div>
        </div>
        <div  class="middle"
              @touchstart.prevent="middleTouchStart"
              @touchmove.prevent="middleTouchMove"
              @touchend="middleTouchEnd"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper">
              <div class="cd" :class="cdClass">
                <img :src="currentSong.image" class="img">
              </div>
            </div>
          </div>
          <scroll class="middle-r" :data="songLyric && songLyric.lines" ref="lyricList">
            <div class="lyric-wrapper" >
              <div v-if="songLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum === index}"
                   v-for="(line,index) in songLyric.lines" :key="index">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>        
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(this.currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(this.currentSong.duration/1000)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i class="iconfont" :class="modeIcon"></i>
            </div>
            <div class="icon i-left" @click="prev" :class="disableClass">
              <i class="iconshangyishou iconfont"></i>
            </div>
            <div class="icon i-center" @click="togglePlay" :class="disableClass"> 
              <i class="iconfont" :class="playIcon" ref="playIcon"></i>
            </div>
            <div class="icon i-right" @click="next" :class="disableClass">
              <i class="iconxiayishou iconfont"></i>
            </div>
            <div class="icon i-right " >
              <i class="iconaixin1 iconfont"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image" width="40px" height="40px" :class="cdClass"> 
        </div>
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <div class="control" @click.stop="togglePlay">
          <i class="iconfont" :class="miniIcon"></i>
        </div>
    </div>
    </transition>
    <audio  :src="songUrl" autoplay ref="audio" 
            @canplay="ready" 
            @error="error"
            @timeupdate="updateTime"
            @ended="end"
    ></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {ERR_OK} from 'api/config'
import {getUrl, getLyric} from 'api/song'
import ProgressBar from './components/ProgressBar'
import {playMode} from 'assets/js/config'
import {shuffle} from 'assets/js/util'
import parseLyric from 'lyric-parser'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'assets/js/dom'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  name: 'Player',
  data() {
    return {
      songUrl: '',
      songLyric: [],
      songReady: false,
      currentTime: 0,
      currentShow: 'cd',
      currentLineNum: 0
    }
  },
  computed: {
    cdClass(){
      return this.playing ? 'play':'pause'
    },
    disableClass(){
      return this.songReady ? '' :'disable'
    },
    playIcon() {
      return this.playing ? 'iconzanting': 'iconbofang'
    },
    miniIcon() {
      return this.playing ? 'iconzanting': 'iconbofang'
    },
    modeIcon() {
      return this.mode === playMode.sequence ? "iconshunxubofang" : ((this.mode === playMode.loop) ?"icondanquxunhuan2" : "iconsuijibofang")
    },
    percent() {
      return this.currentTime / this.currentSong.duration * 1000
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'currentIndex',
      'playing',
      'mode',
      'sequenceList'
    ])
  },
  components:{
    ProgressBar,
    Scroll
  },
  created() {
    this.touch = {}
  },
  methods:{
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    togglePlay() {
      if(!this.songReady){
        return
      }
      this.setPlayingState(!this.playing)
      if(this.songLyric){
        this.songLyric.togglePlay()
      }
    },
    prev() {
      if(!this.songReady){
        return
      }
      let index = this.currentIndex - 1
      if( index === -1){
        
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.togglePlay()
      }
      this.songReady = false
    },
    next() {
      if(!this.songReady){
        return
      }
      let index = this.currentIndex + 1
      if( index === this.playlist.length){       
        index = 0
      }else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if(!this.playing){
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    loop(){
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if(this.songLyric) {
          this.songLyric.seek(0)
      }
    },
    end() {
      if (this.mode === playMode.loop){
        this.loop()
      }else{
        this.next()
      }
    },
    ready(){
      this.songReady = true
    },
    error(){
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    changeMode() {
      const mode = (this.mode + 1 ) % 3
      this.setMode(mode)

      let list = null
      if (this.mode === playMode.random){
        list = shuffle(this.sequenceList)
      }else{
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item)=>{
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    format(interval){
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = interval % 60
      const formatSec = (second.toString().length<2) ? '0'+ second : second
      return `${minute}:${formatSec}`
      
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent / 1000
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlay()
      }
      if(this.songLyric){
        this.songLyric.seek(currentTime * 1000)
      }
    },
    getSongUrl(songId){
      getUrl(songId).then((res)=>{
        if(res.data.code===ERR_OK){ 
          this.songUrl = res.data.data[0].url
        }
      })
    },
    getSongLyric(songId){
      getLyric(songId).then((res)=>{
        if(res.data.code===ERR_OK){ 
          this.songLyric = new parseLyric(res.data.lrc.lyric,this.handleLyric)
          if(this.playing){
            this.songLyric.play()
          }
        }
      })
    },
    handleLyric({lineNum,txt}){
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    middleTouchStart(e) {
      this.touch.initalized = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY

    },
    middleTouchMove(e) {
      if(!this.touch.initalized){
          return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      //offsetWidth: middle-r-向左滑动的距离
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.lyricList.$el.style[transitionDuration] = 0
    },
    middleTouchEnd() {
       let offsetWidth
       let opacity
       if(this.currentShow == 'cd'){
         if(this.touch.percent > 0.1) {
           offsetWidth = - window.innerWidth
           this.currentShow = 'lyric'
           opacity = 0
         }else{
           offsetWidth = 0
           opacity = 1
         }
       }else{
         if(this.touch.percent< 0.9){
           offsetWidth = 0
           this.currentShow = 'cd'
           opacity = 1
         }else{
           offsetWidth = -window.innerWidth
           opacity = 0
         }
       }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setMode: 'SET_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  },
  watch: {
    currentSong(newSong,oldSong) {
      if(newSong.id === oldSong.id) { 
      //当切换播放模式的时候，虽然当前歌曲没变，但是它的index变化了，会导致audio播放
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this.getSongUrl(newSong.id)
      this.getSongLyric(newSong.id)
      this.$refs.audio.play()
      
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      newPlaying ? audio.play(): audio.pause()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: #777
      color: $color-icon
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(60px)
      .top
        display: flex
        align-items: center
        height: 1.2rem
        padding: .1rem 
        .back
          display: flex
          justify-content:center
          align-items: center
          width: .8rem
          z-index: 50
          .icon-back
            display: block
            padding: .18rem
            font-size: 22px
        .text
          width: 80%
          display: flex 
          flex-direction: column
          margin: .1rem 0 0 .3rem
          .song
            font:title $font-large-2x
            height: .36rem
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            margin-bottom: .1rem 
          .singer
            font: $font-small
            color: #f0f0f0
      .middle
        position: fixed
        width: 100%
        top: 1.4rem
        bottom: 2.7rem
        white-space: nowrap
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 74%
          margin-top : 1.2rem
          .cd-wrapper
            box-sizing: border-box
            position: absolute
            top: 0
            left: 50%
            transform: translate(-50%)
            width: 74%
            height: 100%
            border-radius: 50%
            border: 18px solid rgba(255, 255, 255, 0.1)
            .cd
              height: 100%
              width: 100%
              box-sizing: border-box
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .img
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: #ccc
              font-size: $font-large
              &.current
                color: #fff
      .bottom
        position: absolute
        bottom: .3rem
        height: 2.4rem
        width: 100%
        .progress-wrapper
          display: flex
          align-items: center
          width: 90%
          margin: 0px auto
          padding: 10px 0
          .time
            font-size: 12px
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
              color: #fff
            &.time-r
              text-align: right
              color: #ddd
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: #fff
            i
              font-size: 22px
            &.disable
              color: #aaa
          .i-left
            text-align: right
          .i-center
            padding: 0 .4rem
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .iconaixin
            color: red
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
      &.normal-enter, &.normal-leave-to
        opacity: 0
       
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: #fff
      border-top: $border-list
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 .8rem
        width: .8rem
        padding: 0 .3rem
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex: 1
        flex-direction: column
        justify-content: center
        line-height: .4rem
        overflow: hidden
        .name
          flex: 1
          margin-bottom: .04rem
          font: $font-large
          color: #000
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        .desc
          flex: 0
          font: $font-small
          color: #333
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
      .control
        flex: 0 0 .5rem
        width: .5rem
        padding-right: .3rem
        .iconbofang, .iconzanting
          font-size: 30px
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

