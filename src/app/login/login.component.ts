import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../user.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    isLocked: boolean;
    errorMsg: string;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) {
        this.isLocked = false;
    }

    ngOnInit() {
        this.isLocked = true;
        this.authService.isLoggedIn()
        .then(() => {
            this.router.navigateByUrl("/");
        })
        .catch(() => this.isLocked = false);
    }

    onClick() {
        this.isLocked = true;
        this.authService.login(this.username, this.password).then(() => {
            this.router.navigateByUrl("/");
            this.isLocked = false;
        }).catch(err => {
            this.errorMsg = err;
            this.isLocked = false;
        });
    }
}
