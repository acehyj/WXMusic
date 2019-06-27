<template>
  <div class="singer">
    <list-view 
      :list='singerList'
      :letter='letter'
      @select="selectSinger"
    ></list-view>
    <router-view></router-view>  
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ListView from './components/ListView'
import {getSinger} from 'api/singer'
import Singer from 'assets/js/singer'
import {ERR_OK} from 'api/config'
import pinyin from 'pinyin'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10


export default {
  name: 'Singer',
  data(){
    return{
      singerList:[],
      letter:''
    }
  },
  components:{
    ListView
  },
  computed:{
    shortcutList() {
      return this.singerList.map( (group) => {
        return group.title.substr(0,1)
      })
    }
  },
  created(){
    this._getSinger()
  },
  methods: {
    _getSinger() {
      getSinger().then((res)=>{
        if(res.data.code===ERR_OK){  
          this.singerList = this._normalizeSinger(res.data.artists)       
        }
      })
    },
    _normalizeSinger(singerList) { 
      let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
      singerList.forEach((item, index) => {
          singerList.forEach((item)=>{
          let py = pinyin(item.name,{style: pinyin.STYLE_FIRST_LETTER})
          item.firstLetter = py[0][0].substring(0,1).toUpperCase()    
        })
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.name,
            id: item.id,
            pic: item.img1v1Url,
            pic2: item.picUrl,
            alias: item.alias
          }))
        }
        const key = item.firstLetter
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.name,
          id: item.id,
          pic: item.img1v1Url,
          pic2: item.picUrl,
          alias: item.alias
        }))
      })
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
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
