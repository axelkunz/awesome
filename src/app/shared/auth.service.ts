import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { User } from '../user'
import { ConfigService } from './config.service'

interface VerificationResponse {
  success: boolean
  message: string
}

interface LoginResponse {
  success: boolean
  message: string
  token: string
  user: {
    username: string
    role: string
  }
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

  getToken(): string {
    const user: User = JSON.parse(localStorage.getItem('user'))
    return user.token
  }

  async isLoggedIn(): Promise<VerificationResponse> {
    if (!this.getToken()) {
      throw new Error('no token provided')
    }

    // check if token is valid
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })
    const authToken = this.getToken()

    headers.append('Authorization', `Bearer ${ authToken }`)

    let data: VerificationResponse
    try {
      const response = await this.http.post(this.configService.HOST + '/auth/verify', {}, options).toPromise()
      data = response.json()
    } catch (error) {
      throw new Error(data.message || 'Server error')
    }

    if (!data.success) throw new Error('verification unsuccessful. invalid token?')

    return data
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })

    let data: LoginResponse
    try {
      const res = await this.http.post(
        this.configService.API_ADDRESS + '/auth/login',
        { username: username, password: password },
        options
      ).toPromise()
      data = res.json()
    } catch (error) {
      this._deleteUser()
      throw new Error('something went wrong on the server while trying to login: ' + error)
    }

    // TODO: check this server-side
    if (!data.success || !data.token) {
      this._deleteUser()
      throw new Error('login unsuccessfull')
    }

    const user: User = {
      username: data.user.username,
      role: data.user.role,
      token: data.token
    }
    this._setUser(user)
    return(data)
  }

  logout(): void {
    localStorage.removeItem('user')
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'))
  }

  _setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  }

  _deleteUser(): void {
    localStorage.removeItem('user')
  }
}
