<template>
  <div class="rank">
    <div class="rank-official">
      <h1 class="title">官方榜</h1>
      <ul v-for="item of officialList" :key="item.id">
        <li class="item"  @click="selectItem(item)">
          <div class="pic">
            <img :src="item.bgImage" /> 
          </div>
          <div class="list">
            <ul v-for="(top,index) in item.top3" :key="index">
              <li class="list-item">{{index+1}}.{{top.name}}-{{top.ar[0].name}}</li>
            </ul>
          </div>  
        </li>
      </ul>
    </div>
    <div class="rank-others">
      <h1 class="title">其他榜单</h1>
      <ul class="content">
        <li class="item" v-for="item of otherList" :key="item.id" @click="selectItem(item)">
          <div>
            <img class="image" v-lazy="item.bgImage"/>
            <p class="name">{{item.name}}</p>
          </div>
        </li>
      </ul>
      <div class="loading-container" v-show="!officialList.length">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRankList} from 'api/rank'
import {createRank} from 'assets/js/rank'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'
import Loading from 'base/loading/Loading'

const offiListId = [0, 1, 2, 3, 4, 22, 23]
const othListId = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
export default {
  name: 'Rank',
  data() {
    return{
      officialList: [],
      otherList: []    
    }
  },
  components: {
    Loading
  },
  created() {
    this._getRankList()
  },
  methods:{
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    _getRankList() {
      for (let i = 0; i < offiListId.length; i++) {
        getRankList(offiListId[i]).then((res) => {
          let list = res.data.playlist
          this.officialList.push(createRank(list))
        })
      }
      for (let i = 0; i < othListId.length; i++){
        getRankList(othListId[i]).then((res) => {
          let list = res.data.playlist
          this.otherList.push(createRank(list))
        })
      }
    },    
    ...mapMutations({
      setTopList: 'SET_TOP_LIST',
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/styles/variable"
  .rank
    margin-top: 2.1rem
    overflow: hidden
    .rank-official
      .title
        box-sizing: border-box
        font: 17px Helvetica, sans-serif
        margin: 0.2rem auto
        padding-left:  0.18rem
        border-left: $border-title
      .item
        display: flex
        height: 2rem
        box-sizing: border-box
        margin: .4rem .15rem
        .pic
          flex: 0 0 2rem
          widht: 2rem
          height: 2rem 
          img 
            width: 100%
            height: 100%
            border-radius: .1rem
        .list
          display: flex
          flex-direction: column
          justify-content: space-around
          .list-item
            flex: 1
            height: 100%
            padding: 0 .4rem
            font: 12px Helvetica, sans-serif
            color: $color-title
            overflow : hidden;
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 1/*设置行数*/
            -webkit-box-orient: vertical/*子元素垂直排列*/
    .rank-others
      .title
        box-sizing: border-box
        font: $font-large-x
        margin: 0.2rem 0 .4rem 0
        padding-left:  0.18rem
        border-left: $border-title
      .content
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        margin: 0 .15rem
        &:after
          content:' '
          width:31%
          height:0
          display:block
        .item
          flex: 0 0 32%
          width: 29%
          .image
            width: 100%
            height: 100%
            border-radius: .1rem
          .name
            font: $font-medium-x
            padding: .1rem .2rem .4rem .1rem 
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
