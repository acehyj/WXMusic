import axios from 'axios'
import {HOST} from 'api/config'

export function getDiscDetail(id) {
  const url = HOST + `/playlist/detail?id=${id}`

  return axios.get(url)
}
