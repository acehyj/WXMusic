<template>
	<div class="header">
   <div class="header-left">
     <img src="@/assets/images/logo.jpg" alt="">
   </div>
   <router-link to="/search" class="header-right">
     <span class="iconfont icon-right">&#xe628;</span>
   </router-link>
	</div>
</template>

<script>
export default{
  name:'Header'
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .header
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 1.28rem
    line-height: 1.28rem
    background-color: $color-theme
    z-index: 20
    display: flex
    justify-content: space-between
    .header-left 
      padding-left: .2rem
      .icon-left 
        font-size: .6rem
    .header-right
      padding-right: .2rem
      .icon-right
        font-size: .5rem
        color: $color-icon
</style>