import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {
  API_ADDRESS: string
  HOST: string
  PICTURE_PATH: string
  MOBILE_WIDTH = 480
  ROLES: string[] = ['admin', 'family', 'friend']

  constructor() {
    this.API_ADDRESS = 'http://localhost:3000'
    this.HOST = 'http://localhost:3000'
    this.PICTURE_PATH = this.HOST ? this.HOST + '/images' : 'images'
  }
}
