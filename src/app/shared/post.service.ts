import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Post } from "./post";
import { ConfigService } from "./config.service";
import { AuthService } from "./auth.service";

@Injectable()
export class PostService {

    PATH: string = "/api/posts/";

    constructor(
        private http: Http,
        private configService: ConfigService,
        private authService: AuthService
    ) { }

    query(): Promise<Post[]> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);

        return this.http.get(this.configService.HOST + this.PATH, { headers })
                .toPromise()
                .then(res => {
                    return res.json() as Post[];
                })
                .catch(res => res.json());
    }

    get(id): Promise<Post> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        return this.http.get(this.configService.HOST + this.PATH + id, { headers })
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    create(post: Post): Promise<Post> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.configService.HOST + this.PATH, post, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    update(post: Post): Promise<Post> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let authToken = this.authService.getToken();
        headers.append("Authorization", `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.configService.HOST + this.PATH + post._id, post, options)
                   .toPromise()
                   .then(function(res) {
                       return res.json() as Post;
                   });
    }

    // delete(id: string): Promise<any> {
    //     return this.http.delete(this.configService.HOST + "/api/stories/" + id)
    //                .toPromise()
    //                .then(function(res) {
    //                    return res.json();
    //                });
    // }

}
