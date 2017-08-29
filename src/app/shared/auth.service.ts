import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'

import { ConfigService } from './config.service'
import { User } from '../user'

interface Response {
  success: boolean
  message: string
}

@Injectable()
export class AuthService {

  allowed: Observable<boolean>
  redirectUrl: any

  // private user: User
  constructor(
    private configService: ConfigService,
    private http: Http
  ) { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'))
  }

  getToken(): string {
    let user: User = JSON.parse(localStorage.getItem('user'))
    return user.token
  }

  async isLoggedIn(): Promise<any> {
    if (!this.getToken()) {
      throw new Error('no token provided')
    }

    // check if token is valid
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })
    const authToken = this.getToken()

    headers.append('Authorization', `Bearer ${ authToken }`)

    let data: Response
    try {
      const response = await this.http.post(this.configService.HOST + '/auth/verify', {}, options).toPromise()
      data = response.json()
    } catch (error) {
      throw new Error(data.message || 'Server error')
    }

    if (!data.success) throw new Error('verification unsuccessful. invalid token?')

    return data
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {

      console.log('logging in!!!')

      let headers = new Headers({ 'Content-Type': 'application/json' })
      let options = new RequestOptions({ headers: headers })
      let postData = { username: username, password: password }

      return this.http.post(this.configService.API_ADDRESS + '/auth/login', postData, options)
        .toPromise()
        .then(res => {
            let data = res.json()
            if (data.success && data.token) {
                let user = {
                    username: data.user.username,
                    role: data.user.role,
                    token: data.token
                }
                localStorage.setItem('user', JSON.stringify(user))
                resolve()
            } else {
                localStorage.removeItem('user')
                reject(data.message)
            }
        })
        .catch(res => {
            localStorage.removeItem('user')
            reject('something went wrong on the server while trying to login')
        })
    })
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user')
      resolve()
    })
  }
}
