import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../shared/auth.service'
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string
  password: string
  errorMsg: string
  isLocked: boolean

  constructor(
      // private authService: AuthService,
      // private userService: UserService,
      // private router: Router
  ) {
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

  onButtonClick() {
    this.isLocked = true
      // this.authService.login(this.username, this.password).then(() => {
      //     this.router.navigateByUrl('/')
      //     this.isLocked = false
      // }).catch(err => {
      //     this.errorMsg = err
      //     this.isLocked = false
      // })
  }

  onUsernameChange(input: string) {
    console.log(input)

    this.username = input
    this.isLocked = !this.username || !this.password
  }

  onPasswordChange(input: string) {
    this.password = input
    this.isLocked = !this.username || !this.password
  }

}
