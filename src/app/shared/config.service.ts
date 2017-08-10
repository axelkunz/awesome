import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {

  HOST: string = 'http://localhost:3000'  // http://localhost:3000
  PICTURE_PATH: string // = public/images

  ROLES: string[] = [
    'admin',
    'family',
    'friend'
  ]

  // width in pixels for which the navbar gets displayed
  MOBILE_WIDTH = 480

  constructor() {
    this.PICTURE_PATH = this.HOST ? this.HOST + '/images' : 'images'
  }

}
