<template>
  <div class="loading">
    <div class="wrapper"> 
      <div class="iconfont">&#xe6ab;</div>
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      title: {
        type: String,
        default: '正在载入'
      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .loading
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    .wrapper
      width: 1.5rem
      height: 1rem
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .iconfont
        font-size: 30px
        color: #aaa
        margin-bottom: .15rem
      .desc
        font-size: 15px
        color: #777

</style>
