export class Feature {
  _id: string
  type: string
  category: string
  properties: {
    postID: string,
    category: string,
    name: string
  }
  geometry: {
    type: string,
    coordinates: any[]
  }
}
