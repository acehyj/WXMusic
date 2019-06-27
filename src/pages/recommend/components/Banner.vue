<template>
  <div class="banner">
    <swiper class="banner-content" :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
        <a :href="item.url">
          <img class="swiper-img" :src="item.imageUrl" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        speed: 500
      }
    }
  },
  computed: {
    showSwiper() {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
  .banner >>> .swiper-pagination-bullet
    background-color: rgba(255,255,255,0.5)
  .banner >>> .swiper-pagination-bullet-active
    width: .3rem
    border-radius: .15rem
    background: rgba(255,255,255,0.8)
  .banner
    margin-top: 2.1rem
    overflow: hidden
    .banner-content
      height:2.8rem
    .swiper-img
      width: 100%
      height:100%
    
</style>
