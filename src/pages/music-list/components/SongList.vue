<template>
  <div class="song-list">
    <h1 class="list-title">歌曲列表</h1>
    <ul>
      <li @click ="selectItem(song, index)" v-for="(song,index) in songs" :key="song.id" class="item">
        <div class="content">
          <div class="index">{{index+1}}</div>
          <div class="wrapper">
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{song.singer}} - {{song.album}}</p> 
          </div>
          <div class="play iconfont">&#xe614;</div> 
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    songs:{
      type: Array,
      default: []
    }
  },
  methods:{
    selectItem(song,index) {
      this.$emit('select',song,index)
    }
  }
}
</script>
  
<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .song-list
    .list-title
      box-sizing:border-box
      font: 15px Helvetica, sans-serif
      margin: 0.2rem auto
      padding-left:  0.18rem
      border-left: $border-title 
    .content
      display: flex
      align-items: center
      height: 1.1rem
      font: $font-large-x
      border-bottom: $border-list
      .index
        display: flex
        justify-content:center
        align-items: center
        width: .8rem
        color: $color-index
      .wrapper
        margin-left: .1rem
        flex-direction: column
        .name 
          width: 6rem
          margin-bottom: .1rem
          color: $color-title
          font: $font-large-x
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        .desc
          font: 12px Helvetica,sans-serif
          color: $color-subtitle
          width: 6rem
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
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
</style>