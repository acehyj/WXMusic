<template>
  <div class="loading">
    <div class="iconfont">&#xe6ab;</div>
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .loading
    text-align: center
    .iconfont
      font-size: 30px
      color: #aaa
      margin-bottom: .15rem
    .desc
      font-size: 15px
      color: #777

</style>
