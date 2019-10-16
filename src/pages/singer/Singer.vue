<template>
  <div class="singer">
    <list-view 
      :list="singerList"
      :letter="letter"
      @select="selectSinger"
    ></list-view>
    <alphabet v-if="showAlphabet"
              :list='shortcutList'
              @change='handleLetterChange'
    ></alphabet>
    <loading v-if"!singerList.length"></loading>
    <router-view></router-view>  
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ListView from './components/ListView'
import Alphabet from "./components/Alphabet"
import Loading from "base/loading/Loading"
import {getHotSinger,getSinger} from 'api/singer'
import Singer from 'assets/js/singer'
import {ERR_OK} from 'api/config'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10


export default {
  name: 'Singer',
  data(){
    return{
      singerList:[],
      letter:'',
      showAlphabet: false
    }
  },
  components:{
    ListView,
    Alphabet,
    Loading
  },
  computed:{
    shortcutList() {
      return this.singerList.map( (group) => {
        return group.title.substr(0,1)
      })
    }
  },
  created(){
    this._getHotSinger()
  },
  methods: {
    _getHotSinger() {
      getHotSinger().then((res)=>{
        if(res.data.code===ERR_OK){  
          this._normalizeSinger(HOT_NAME,res.data.artists.slice(0,HOT_SINGER_LEN))
        }
        this._getSinger()
      })
    },
    _getSinger() {
      for (var i=0; i<26; i++) {
        let alphabet = String.fromCharCode(65 + i)      
        getSinger(alphabet).then((res)=>{
          if(res.data.code===ERR_OK){  
            this._normalizeSinger(alphabet,res.data.artists)   
          }
        })
      }
    },
     _normalizeSinger(title,list) { 
      let group = {
          title: title,
          items: []
      }
      for(let item of list) {
        group.items.push(
          new Singer({
            name: item.name,
            id: item.id,
            pic: item.img1v1Url,
            pic2: item.picUrl,
            alias: item.alias
          })
        )
      }
      this.singerList.push(group)

      if(this.singerList.length === 27) {
        var list = this.singerList.splice(0,1)
        this.singerList.sort((a, b) => {
          return a.title - b.title
        }).unshift(list[0])
        this.showAlphabet = true
      }
    },
    selectSinger(singer) {
      this.$router.push({
        path:`/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handleLetterChange(letter) {
      this.letter = letter
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
    
}  
</script>


<style lang="stylus" scoped>

</style>
