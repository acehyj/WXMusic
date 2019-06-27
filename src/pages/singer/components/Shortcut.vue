<template>
  <div class="list-shortcut" >
    <ul>
      <li class="item"
          v-for="item of list" 
          :key="item.index"
          @click="handleLetterClick"
      >
        <a ref="item">{{item}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Shortcut',
  props:{
    list: Array
  },
  methods:{
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText)
      
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-shortcut
      position: fixed
      width: 20px
      height:100%
      top: 0
      right: .2rem
      text-align: center
      padding-top: 3rem
      z-index: 10
      background-color: #fff
      color: #666
      .item
        margin-top:.25rem
        font-size: 12px
        line-height: 12px Helvetica;
        &.current
          color: #333
</style>