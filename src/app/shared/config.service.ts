import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {

  HOST: string
  PICTURE_PATH: string

  ROLES: string[] = ['admin', 'family', 'friend']

  // width in pixels for which the navbar gets displayed
  MOBILE_WIDTH = 480

  constructor() {
    this.HOST = 'http://localhost:3006'
    this.PICTURE_PATH = this.HOST ? this.HOST + '/images' : 'images'
  }
}
