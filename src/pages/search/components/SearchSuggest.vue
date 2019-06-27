<template>
  <div class="suggest">
    <div class="suggest-wrapper">
      <h1 class="title">搜索"{{query}}"</h1>
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in searchList" :key="item.id" @click.stop="selectItem(item)">
          <div class="icon">
            <i class="iconfont">&#xe628;</i>
          </div>
          <div class="name">
            <p class="text">{{item.keyword}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'
import {searchSuggest} from 'api/search'
export default {
  name: 'Suggest',
  data() {
    return {
      searchList: [],
      searchKey: ''
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  methods: {
    searchSuggest(key) {
      searchSuggest(key).then((res)=>{
        if (res.data.code===ERR_OK){
          this.searchList = res.data.result.allMatch
        }
      })
    },
    selectItem(item) {
      this.$emit('query', item.keyword)
    }  
  },
  watch: {
    query(newQuery) {
      if(newQuery==='') {
        return
      }
      this.searchSuggest(newQuery)
      // this.$emit('query', newQuery)
    }     
  }
}

</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .suggest
    display: flex
    flex-direction: column
    background-color: $color-background
    font: $font-large
    .title
      display: flex
      align-items: center 
      height: .9rem
      color: #507daf
      padding: 0 .2rem
      border-bottom: $border-list
      border-top: $border-list
    .suggest-list  
      width: 100%
      .suggest-item
        display: flex
        align-items: center
        height: .9rem
        padding: 0 .2rem
        border-bottom: $border-list
        .icon
          color: #aaa
          margin-right: .14rem
        .name
          color: $color-title
        

</style>