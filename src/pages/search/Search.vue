<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="hotlist">
      <h1 class="title">热门搜索</h1>
      <div class="list">
        <ul v-for="(item,index) of hotKey" :key="index">
          <li class="item" @click="selectKey(item.first)">
            <span>{{item.first}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-suggest-wrapper" v-show="query" ref="searchResult">
      <search-suggest :query="query" @query="selectKey"></search-suggest>
    </div>
    <router-view :query="query"></router-view>   
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import SearchDetail from './components/SearchDetail'
import SearchSuggest from './components/SearchSuggest'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
export default {
  name: 'Search',
  data() {
    return {
      hotKey: [],
      query: ''
    }
  },
  components: {
    SearchBox,
    SearchSuggest,
    SearchDetail
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res)=>{
        if(res.data.code === ERR_OK) {
          this.hotKey = res.data.result.hots
        }
      })
    },
    selectKey(query) {
      this.$refs.searchBox.setQuery(query)
      this.$router.push({
        path: `/search/${query}`
      })
    },
    onQueryChange(query) {
      this.query = query
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .search
    margin-top: 2.1rem
    overflow: hidden
    .search-box-wrapper
      border-bottom: 1px solid #eee
    .hotlist
      display: flex
      flex-direction: column
      padding: .3rem .2rem 0
      .title
        font: $font-small
        margin-bottom: .2rem
        width: 100%
        color: $color-sm-title
      .list
        display: flex
        flex-wrap: wrap
        .item
          font: $font-medium-x
          border-radius: .64rem
          border: $border-hotkey
          margin: 0 .16rem .16rem 0
          padding: 0 .28rem
          height: .64rem
          line-height : .64rem
          a
            color: $color-title
    .search-suggest-wrapper
      position: fixed
      top: 3.28rem
      left: 0
      width: 100%
</style>
