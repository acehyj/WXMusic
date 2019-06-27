import axios from 'axios'
import {HOST} from 'api/config'

export function getRankList(id) {
  const url = HOST + `/top/list?idx=${id}`

  return axios.get(url)
}

export function getMusic(id) {
  const url = HOST + `/song/detail?ids=${id}`

  return axios.get(url)
}