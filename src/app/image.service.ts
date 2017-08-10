import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { ConfigService } from "./shared/config.service";

@Injectable()
export class ImageService {
    // PATH: string = "/api/posts/";

    constructor(
        private http: Http,
        private configService: ConfigService
    ) { }

    // query(): Promise<Post[]> {
    //     return this.http.get(this.configService.HOST + this.PATH)
    //             .toPromise()
    //             .then(function(res) {
    //                 return res.json() as Post[];
    //             });
    // }

    create(file: any): Promise<any> {
        // let headers = new Headers({ "Content-Type": "application/json" });
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });

        let formData = new FormData();
        formData.append("files", file, file.name);

        return this.http.post(this.configService.HOST + "/upload", formData, options)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }

}
