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
    // private router: Router
  ) {
    this.user = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.isValidating = true
    this.authService.isLoggedIn().then(() => {
      // this.router.navigateByUrl('/')
      // console.log('is logged in!')
    })
    .catch(() => this.isValidating = false)
  }

  onUsernameChange(input: string) {
    this.user.username = input
    this.errorMsg = null
  }

  onPasswordChange(input: string) {
    this.user.password = input
    this.errorMsg = null
  }

  onButtonClick() {
    this.isValidating = true
    this.authService.login(this.user.username, this.user.password).then(() => {
      // this.router.navigateByUrl('/')
      this.isValidating = false
    }).catch(err => {
      this.errorMsg = err
      this.isValidating = false
    })
  }

}
