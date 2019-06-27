import axios from 'axios'
import {HOST} from 'api/config'

export function getUrl (musicId) {
  const url = HOST + `/song/url?id=${musicId}`
  return axios.get(url)
}
export function getLyric (musicId) {
  const url = HOST + `/lyric?id=${musicId}`
  return axios.get(url)
}

export function getSongDetail (id) {
  const url = HOST + `/song/detail?ids=${id}`

  return axios.get(url)
}