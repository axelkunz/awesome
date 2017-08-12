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
export class LoginComponent {
  user: User
  errorMsg: string
  isLocked: boolean

  constructor(
      // private authService: AuthService,
      // private userService: UserService,
      // private router: Router
  ) {
    this.user = {
      username: '',
      password: ''
    }
    this.isLocked = true
  }

  // ngOnInit() {
  //     this.isLocked = true
  //     this.authService.isLoggedIn()
  //     .then(() => {
  //         this.router.navigateByUrl('/')
  //     })
  //     .catch(() => this.isLocked = false)
  // }

  onUsernameChange(input: string) {
    this.user.username = input
    this.isLocked = !this.user.username || !this.user.password
  }

  onPasswordChange(input: string) {
    this.user.password = input
    this.isLocked = !this.user.username || !this.user.password
  }

  onButtonClick() {
    this.isLocked = true
    console.log('clicky')

      // this.authService.login(this.username, this.password).then(() => {
      //     this.router.navigateByUrl('/')
      //     this.isLocked = false
      // }).catch(err => {
      //     this.errorMsg = err
      //     this.isLocked = false
      // })
  }

}
