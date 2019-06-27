import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from "pages/recommend/Recommend"
// import Singer from "pages/singer/Singer"
// import SingerDetail from 'pages/singer-detail/SingerDetail'
// import Rank from "pages/rank/Rank"
// import Search from "pages/search/Search"
// import SearchDetail from 'pages/search/components/SearchDetail'
// import Disc from 'pages/disc/Disc'
// import Album from 'pages/album/Album'
// import TopList from 'pages/rank/components/RankDetail'
Vue.use(Router)
const Recommend = (resolve) => {
  import('pages/recommend/Recommend').then((module) => {
    resolve(module)
  })
}

const Singer = (resolve) => {
  import('pages/singer/Singer').then((module) => {
    resolve(module)
  })
}

const SingerDetail = (resolve) => {
  import('pages/singer-detail/SingerDetail').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('pages/rank/Rank').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('pages/search/Search').then((module) => {
    resolve(module)
  })
}

const SearchDetail = (resolve) => {
  import('pages/search/components/SearchDetail').then((module) => {
    resolve(module)
  })
}

const Disc = (resolve) => {
  import('pages/disc/Disc').then((module) => {
    resolve(module)
  })
}
const Album = (resolve) => {
  import('pages/album/Album').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('pages/rank/components/RankDetail').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend ,
      children:[
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer, 
      children:[
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children:[
        {
          path: ':id',
          component: TopList
        }
      ] 
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SearchDetail
        },
        {
          path: 'album/:id',
          component: Album
        },
        {
          path: 'singer/:id',
          component: SingerDetail
        }
      ] 
    }
  ]
})
