import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";

@Injectable()
export class PictureService {

    constructor(
        private http: Http,
        private configService: ConfigService,
        private authService: AuthService
    ) { }

    get(dirname: string): Promise<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);

        return this.http.get(this.configService.HOST + "/api/pictures/" + dirname, { headers })
            .toPromise()
            .then(function(res) {
                return res.json();
            });
    }
}