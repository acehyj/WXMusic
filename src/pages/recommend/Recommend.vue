<template>
  <div class="recommend">
    <div class="recommend-content">
        <banner :list="bannerList"></banner>
        <remd-list :list="recommendList"></remd-list>
        <new-songs :list="newSongsList"></new-songs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Banner from "./components/Banner"
import RemdList from "./components/RemdList"
import NewSongs from "./components/NewSongs"
import {getBanner, getRecommendList, getNewSongs} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  name: 'Recommend',
  data(){
    return{
      bannerList:[],
      recommendList:[],
      newSongsList:[]
    }
  },
  created(){
    this._getBanner(),
    this._getRecommendList(),
    this._getNewSongs()  
  },
  methods: {
    _getBanner(){
      getBanner().then((res)=>{
        if(res.data.code===ERR_OK){
          this.bannerList = res.data.banners
        }
      })
    },
    _getRecommendList(){
      getRecommendList().then((res)=>{
        if(res.data.code===ERR_OK){
          this.recommendList = res.data.result.slice(0,6)
        }
      })
    },
    _getNewSongs(){
      getNewSongs().then((res)=>{
        if(res.data.code===ERR_OK){
          this.newSongsList = res.data.result.slice(0,10)
        }
      })
    },

  },
  components:{
    Banner,
    RemdList,
    NewSongs
  }
}
</script>

<style lang="stylus" scoped>
  
</style>
