<template>
  <div class="list-shortcut" >
    <ul>
      <li class="item"
          v-for="item of list" 
          :key="item"
          @click="handleLetterClick"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          :ref="item"
      >
        <a>{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Alphabet',
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  props:{
    list: Array
  },
  updated() {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods:{
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart(e) {
      this.touchStatus = true
    },
    handleTouchMove(e) {
      if(this.touchStatus) {
        if(this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(()=>{
          const touchY = e.touches[0].clientY - 121
          const index= Math.floor(( touchY- this.startY)/17)
          if(index>=0 && index<this.list.length){
            this.$emit('change',this.list[index])
          }
        },16)
      }
    },
    handleTouchEnd() {
      this.touchStatus = true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-shortcut
      position: fixed
      width: 20px
      height:100%
      top: 2.8rem
      right: .2rem
      text-align: center
      z-index: 10
      background-color: #fff
      .item
        margin-bottom:.1rem
        font-size: 12px
        line-height: 12px Helvetica
        a 
          color: #666
</style>