export default class Rank {
  constructor({id, name, bgImage, desc,top3,songs}) {
    this.id = id
    this.name = name
    this.bgImage = bgImage
    this.desc = desc
    this.top3 = top3
    this.songs = songs
  }
}

export function createRank (rank) {
  return new Rank({
    id: rank.id,
    name: rank.name,
    bgImage: rank.coverImgUrl,
    desc: rank.description,
    top3: rank.tracks.slice(0,3),
    songs: rank.tracks
  })
}
