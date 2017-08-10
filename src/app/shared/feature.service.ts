import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Feature } from './feature'
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";

@Injectable()
export class FeatureService {

    PATH: string = "/api/features/";

    constructor(
        private http: Http,
        private configService: ConfigService,
        private authService: AuthService
    ) { }

  query (): Promise<any> {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let authToken = this.authService.getToken()
    headers.append('Authorization', `Bearer ${authToken}`)

    return this.http.get(this.configService.HOST + this.PATH, { headers })
      .toPromise()
      .then((res) => {
        return res.json().filter(o => o.properties)
      })
  }

    getByPostID(postID: string): Promise<Feature[]> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);

        return this.http.get(this.configService.HOST + this.PATH, { headers })
                .toPromise()
                .then(function(res) {
                    return res.json().filter(o => o.properties && o.properties.postID === postID) as Feature[];
                });
    }

    create(feature: Feature): Promise<Feature> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + this.PATH, feature, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Feature;
                   });
    }
    //
    // update(post: Post): Promise<Post> {
    //     let headers = new Headers({ "Content-Type": "application/json" });
    //     let options = new RequestOptions({ headers: headers });
    //
    //     return this.http.put(this.configService.HOST + this.PATH + post._id, post, options)
    //                .toPromise()
    //                .then(function(res) {
    //                    return res.json() as Post;
    //                });
    // }

    delete(id: string): Promise<any> {
        let headers = new Headers();
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        return this.http.delete(this.configService.HOST + this.PATH + id, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json();
                   });
    }

}
