import { Injectable } from "@angular/core";
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs/Rx";

import { AuthService } from "./auth.service";

@Injectable()
export class GuardService {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let url: string = state.url;
            
            this.authService.isLoggedIn().then(() => {
                let user = this.authService.getUser();
                if (url.includes("/admin/") && user.role !== "admin") {
                    console.log("GuardService: insufficient rights.");
                    this.router.navigateByUrl("/");
                    reject(false);
                } else {
                    console.log("GuardService: valid.");
                    resolve(true);
                }

            }).catch((err) => {
                console.log("GuardService: The user is not logged in and can't navigate to this site. Redirecting to login page.");

                // Store the attempted URL for redirecting
                this.authService.redirectUrl = url;

                this.router.navigateByUrl("/login");
                reject(false);
            });
        });
    }
}
