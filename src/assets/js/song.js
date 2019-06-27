
export default class Song {
  constructor ({id, singer, name, album, duration, image}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }
}
export function getSinger(arr) {
  const name = arr.map((item) => {
    return item.name
  })
  return name.join('/')
}
export function createSong (song) {
  return new Song({
    id: song.id,
    singer: getSinger(song.ar),
    name: song.name,
    album: song.al.name,
    duration: song.dt,
    image: song.al.picUrl || ''
  })
}

