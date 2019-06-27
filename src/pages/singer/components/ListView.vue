<template>
    <scroll class="list-view" :data="list" ref="listView">
      <ul class="list-content" v-if="showSinger"> 
        <li v-for="group of list" :key="group.title" :ref="group.title">
          <h1  class="title">{{group.title}}</h1> 
            <ul>   
              <li class="item" 
                  v-for="item of group.items" 
                  :key="item.id"
                  @click="selectItem(item)">

                  <img class="pic" v-lazy="item.pic" alt="加载中..">
                  <span class="name">{{item.name}}</span>
                  <span class="icon iconfont">&#xe602;</span>
              </li>
            </ul>
        </li>
      </ul> 
      <div class="list-shortcut">
        <ul>
          <li v-for="(item, index) in letters" :key="index"  class="item" 
              :ref="item"
              @click="handleLetterClick"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd">
            {{item}}
          </li>
        </ul>
      </div>
      <div v-show="!list.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from "base/loading/Loading"
import {getData} from 'assets/js/dom'
import {debounce} from 'assets/js/util'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

export default {
  name: 'ListView',
  data() {
    return {
      touchStatus: false,
      startY: 0
    }
  },
  updated() {
    this.startY = this.$refs['A'][1].offsetTop
  },
  props:{
    list: Array,
    letter: String
  },
  computed: {
    showSinger() {
      return this.list.length
    },
    letters() {
      return this.list.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  components:{
    Loading,
    Scroll
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    selectItem(item) {
      this.$emit('select',item)
    },
    handleLetterClick(e) {
      const letter = e.target.innerText
      const element = this.$refs[letter][0]
      this.$refs.listView.scrollToElement(element)
    },
    handleTouchStart(e) {
      this.touchStatus = true
    },
    handleTouchMove(e) {
      if(this.touchStatus) {
        debounce((e)=>{
          const touchY = e.touches[0].clientY
          const index = Math.floor((touchY - this.startY) / 25)
          if (index>=0 && index< this.letters.length) {
            this.$refs.listView.scrollToElement(this.letters[index])
          }
        },16)
      }
    },
    handleTouchEnd() {
      this.touchStatus = true
    }
  }
}
</script>
 
<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .list-view
    margin-top: 2.3rem
    .list-content
      .title
        box-sizing: border-box
        font: $font-large-x
        margin: 0.2rem auto
        padding-left:  0.18rem
        border-left: $border-title       
      .item
        height: 1.1rem
        position: relative
        padding: .15rem 0 
        margin-left: .4rem
        position: relative
        border-bottom: $border-list
        .pic
          width: 1rem
          height: 1rem
          border-radius: 50%
        .name
          padding-left :.5rem
          font: $font-medium-x
          color: $color-title
        .icon
          position: absolute
          color: $color-play-icon
          right:.3rem
          font-size: 20px
          top: 50%;
          transform: translateY(-50%);
    .list-shortcut
      position: fixed
      width: 20px
      height:100%
      top: 0
      right: .2rem
      text-align: center
      padding-top: 3rem
      background-color: $color-background
      color: $color-title
      .item
        margin-top: .26rem
        font-size: 12px
        line-height: $font-small
        &.current
          color: red
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>