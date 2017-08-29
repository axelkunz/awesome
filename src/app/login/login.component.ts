import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../shared/auth.service'
import { UserService } from '../user.service'

interface User {
  username: string
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User
  errorMsg: string
  isValidating: boolean

  constructor(
    private authService: AuthService,
    // private userService: UserService,
    private router: Router
  ) {
    this.user = {
      username: '',
      password: ''
    }
    this.isValidating = false
  }

  async ngOnInit() {
    // redirect if user is already logged in
    try {
      this.isValidating = true
      await this.authService.isLoggedIn()
      this.router.navigateByUrl('/')
    } catch (e) {
      this.isValidating = false
      // console.log(e)
    }
  }

  onUsernameChange(input: string) {
    this.user.username = input
    this.errorMsg = null
  }

  onPasswordChange(input: string) {
    this.user.password = input
    this.errorMsg = null
  }

  async onButtonClick() {
    try {
      this.isValidating = true
      await this.authService.login(this.user.username, this.user.password)
      this.router.navigateByUrl('/')
    } catch (err) {
      this.isValidating = false
      this.errorMsg = err
    }
  }
}
