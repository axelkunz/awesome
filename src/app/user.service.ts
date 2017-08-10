import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { User } from "./user";

import { ConfigService } from "./shared/config.service";
import { AuthService } from "./shared/auth.service";

@Injectable()
export class UserService {

    PATH: string = "/api/users";

    constructor(
        private http: Http,
        private configService: ConfigService,
        private authService: AuthService
    ) { }

    query(): Promise<User[]> {
        let headers = new Headers();
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        return this.http.get(this.configService.HOST + this.PATH, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json() as User[];
                   });
    }

    get(id): Promise<User> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        return this.http.get(this.configService.HOST + this.PATH + "/" + id, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json() as User;
                   });
    }

    create(user): Promise<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        let data = {
            username: user.username,
            password: user.password
        };
        return this.http.post(this.configService.HOST + "/auth/signup", data, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }

    update(user): Promise<User> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        return this.http.put(this.configService.HOST + this.PATH + "/" + user._id, user, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }

    delete(id: string): Promise<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);

        return this.http.delete(this.configService.HOST + this.PATH + "/" + id, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }
}
