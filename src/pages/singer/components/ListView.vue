<template>
    <div class="list-view"  ref="wrapper">
      <div>
        <ul class="list-content" v-for="group of list" v-if="showSinger"> 
          <li :key="group.title" :ref="group.title.slice(0,1)">
            <h1 class="title">{{group.title}}</h1> 
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
      </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
import {debounce} from 'assets/js/util'

export default {
  name: 'ListView',
  props:{
    list: Array,
    letter: String
  },
  computed: {
    showSinger() {
      return this.list.length
    }
  },
  components:{
    Bscroll
  },

  mounted () {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    letter() {
      this.scroll.scrollToElement(this.$refs[this.letter][0])
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select',item)
    }
  }
  
}
</script>
 
<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .list-view
    overflow:hidden
    position: absolute
    top: 2.3rem
    left: 0
    right:0
    bottom: 0
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
    
</style>