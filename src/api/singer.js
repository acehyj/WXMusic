import axios from 'axios'
import {HOST} from 'api/config'

export function getHotSinger () {
  const url = HOST + '/top/artists'

  return axios.get(url)
}

export function getSinger (alphabet) {
  const url = HOST + `/artist/list?initial=${alphabet}`

  return axios.get(url)
}

export function getSingerDetail (singerId) {
  const url = HOST + `/artists?id=${singerId}`

  return axios.get(url)
}
export function getSingerDesc (singerId) {
  const url = HOST + `/artist/desc?id=${singerId}`

  return axios.get(url)
}

