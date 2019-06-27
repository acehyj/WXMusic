<template>
  <div>
    <m-header></m-header>
    <m-nav></m-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <m-player></m-player>
  </div>
</template>

<script >
import MHeader from "pages/header/Header"
import MNav from "pages/nav/Nav"
import MPlayer from "pages/player/Player"
export default {
  name: 'App',
  components:{
    MHeader,
    MNav,
    MPlayer,
  }
}
</script>

<style lang="stylus" scoped>

</style>
