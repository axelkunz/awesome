import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../user";
import { UserService } from "../../user.service";
import { ConfigService } from "../../shared/config.service";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.css"]
})
export class NewUserComponent implements OnInit {
    roles: string[];
    newUser: User;

    constructor(
        private configService: ConfigService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.roles = this.configService.ROLES;
        this.newUser = new User();
    }

    create() {
        this.userService.create(this.newUser).then(res => {
            this.router.navigateByUrl("/admin/dashboard");
        });
    }

}
