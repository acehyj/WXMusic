<template>
  <div class="search-box">
    <i class="iconfont icon-search">&#xe628;</i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" type="text" />
    <i @click="clear" v-show="query" class="iconfont icon-dismiss">&#xe6d9;</i>
  </div>
</template>

<script>
  import {debounce} from 'assets/js/util'
  export default {
    name: 'SearchBox',
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手、专辑'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/styles/variable"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    margin: .3rem .2rem
    padding: 0 .12rem
    height: .6rem
    border-radius: .6rem
    color: #c9c9c9
    background-color: #eee
    .icon-search
      font-size: 13px
    .box
      flex: 1
      margin: 0 .1rem
      line-height: .36rem
      font: $font-medium-x
      color: $color-title
      background-color: #eee
      &::placeholder
        color: #c9c9c9
        font: $font-medium-x
    .icon-dismiss
      font-size: 14px
</style>