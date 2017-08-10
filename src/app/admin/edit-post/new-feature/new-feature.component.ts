import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Feature } from "../../../shared/feature";
import { FeatureService } from "../../../shared/feature.service";

@Component({
  selector: "app-new-feature",
  templateUrl: "./new-feature.component.html",
  styleUrls: ["./new-feature.component.css"]
})
export class NewFeatureComponent implements OnInit, OnDestroy {

    newFeature: Feature;
    postID: string;
    sub: any;
    lat: number;
    lon: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private featureService: FeatureService
    ) { }

    ngOnInit() {
        console.log("init new feature");
        this.sub = this.route.params.subscribe(params => {
            this.postID = params["id"];

            this.newFeature = new Feature();
            this.newFeature.properties.postID = this.postID;

            // defaults
            this.newFeature.geometry.type = "Point";
            this.newFeature.properties.category = "post";
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    create() {
        this.newFeature.geometry.coordinates = [this.lat, this.lon];
        this.featureService.create(this.newFeature).then(res => {
            this.router.navigateByUrl(`/admin/posts/${ this.postID }`);
        });
    }

}
