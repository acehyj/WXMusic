<template>
  <div class="recommend-list">
    <h1 class="list-title">推荐歌单</h1>
    <ul class="list-content"> 
      <li class="list-item" v-for="item of list" :key="item.id"  @click="selectItem(item)">
        <div class="icon">
          <img class="img" :src="item.picUrl" />
          <span class="playCount iconfont">&#xe607;{{(item.playCount/10000).toFixed(1)}}万</span>
        </div>
        <div class="text">
          <p class="name">{{item.name}}</p>
        </div>
      </li>
    </ul> 
 
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'RemdList',
  props: {
    list: Array
  },
  computed:{
    showList() {
      return this.list.length
    }
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus">
  @import "~assets/styles/variable"
  .recommend-list
    .list-title
      box-sizing: border-box
      font: $font-large-x
      margin: 0.2rem auto
      padding-left:  0.18rem
      border-left: $border-title  
    .list-content
      width: 100vw
      display:flex
      flex-wrap: wrap
      justify-content: space-around
      .list-item
        flex: 0 0 31%
        margin-bottom: .2rem
        position: relative
        .img 
          width: 100%
          height: 100%
          border-radius: .1rem
        .playCount
            position: absolute 
            top: .05rem
            right: .1rem
            color: #fff
            font: $font-small
            text-shadow: 1px 0 0 rgba(0,0,0,.15)
        .name
          font: $font-medium
          color: $color-title 
          padding-top: .04rem
          padding-left:.12rem
          overflow : hidden;
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2/*设置行数*/
          -webkit-box-orient: vertical/*子元素垂直排列*/
</style>