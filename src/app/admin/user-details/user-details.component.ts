import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../user.service";
import { ConfigService } from "../../shared/config.service";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    sub: any;
    user: any;
    userID: string;
    roles: string[];

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private configService: ConfigService
    ) { }

    ngOnInit() {
        this.roles = this.configService.ROLES;
        this.sub = this.route.params.subscribe(params => {
            this.userID = params["id"];
            this.userService.get(this.userID).then(user => {
                this.user = user;
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {
        this.userService.update(this.user).then(() => {
            this.router.navigateByUrl("admin/dashboard");
        });
    }

    delete() {
        this.userService.delete(this.user._id).then(() => {
            this.router.navigateByUrl("admin/dashboard");
        });
    }

}
