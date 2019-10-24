import axios from 'axios'
import {HOST} from 'api/config'

export function getHotKey() {
  const url = HOST + `/search/hot`

  return axios.get(url)
}
 
export function searchSuggest(key) {
  const url = HOST + `/search/suggest?keywords=${key}&type=mobile`

  return axios.get(url)
}

export function searchBestMatch(key) {
  const url = HOST + `/search/multimatch?keywords=${key}`

  return axios.get(url)
}

export function searchArtist(key) {
  const url = HOST + `/search?keywords=${key}&type=100`

  return axios.get(url)
}

export function searchAlbum(key) {
  const url = HOST + `/search?keywords=${key}&type=10`

  return axios.get(url)
}
export function searchSongs(key) {
  const url = HOST + `/search?keywords=${key}`

  return axios.get(url)
}

