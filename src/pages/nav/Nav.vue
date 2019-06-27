<template>
    <div class="banner">
      <div class="tab">
        <router-link tag="div" class="tab-item" to="/recommend">
          <span class="tab-link"><em>推荐</em></span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
          <span class="tab-link"><em>歌手</em></span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
          <span class="tab-link"><em>排行</em></span>
        </router-link>
      </div>
  </div>
</template>

<script>
export default{
  name:'Nav'
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .banner
    position: fixed
    width: 100%
    top: 1.28rem
    z-index: 20
    .tab
        display: flex
        height: .8rem
        font: $font-large
        align-items: center
        background-color: $color-background
        border-bottom: $border-list
        .tab-item
          flex: 1
          height: 100%
          display: flex
          justify-content: center
          .tab-link
            height: 100%
            color: $color-title
            display: flex
            align-items: center
            padding: 0 .3rem
          &.router-link-active
            .tab-link
              color: $color-active
              border-bottom:  $border-active
         
</style>