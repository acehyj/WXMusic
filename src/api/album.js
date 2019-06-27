import axios from 'axios'
import {HOST} from 'api/config'

export function getAlbumDetail(id) {
  const url = HOST + `/album?id=${id}`

  return axios.get(url)
}
