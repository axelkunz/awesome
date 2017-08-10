import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../../shared/post";
import { PostService } from "../../shared/post.service";
import { Feature } from "../../shared/feature";
import { FeatureService } from "../../shared/feature.service";
import { ImageService } from "../../image.service";
import { PictureService } from "../../shared/picture.service";
import { ConfigService } from "../../shared/config.service";

@Component({
    selector: "app-edit-post",
    templateUrl: "./edit-post.component.html",
    styleUrls: ["./edit-post.component.css"]
})
export class EditPostComponent implements OnInit, OnDestroy {
    sub: any;
    post: Post;
    postID: string;
    features: Feature[];
    file: string;
    isSaved: boolean;
    saving: boolean;
    pictures: string[];
    picturesPath: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postService: PostService,
        private featureService: FeatureService,
        private imageService: ImageService,
        private configService: ConfigService,
        private pictureService: PictureService
    ) {
        this.isSaved = true;
        this.saving = false;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.postID = params["id"];
            this.postService.get(this.postID).then(post => this.post = post);
            this.featureService.getByPostID(this.postID).then(features => this.features = features);

            // get available pictures for this post
            this.pictureService.get(this.postID).then(files => this.pictures = files);
            this.picturesPath = this.configService.PICTURE_PATH + "/" + this.postID;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save(): void {
        this.saving = true;
        this.postService.update(this.post).then(res => {
            this.saving = false;
            this.isSaved = true;
        }).catch(() => this.saving = false);
    }

    isUsed(picture: string): boolean {
        return this.post.text.includes(picture);
    }

    onPostChange(e): void {
        this.isSaved = false;
    }

    addBreak(textarea): void {
        let snippet = "<br><br>";
        this.post.text = this.post.text.substring(0, textarea.selectionStart) + snippet + this.post.text.substring(textarea.selectionEnd);
        this.isSaved = false;
    }

    addPicture(textarea, picture): void {
        let snippet = `<figure>\n  <a href="${ this.picturesPath }/${ picture }" class="image-link" data-lightbox="image-1" data-title="">\n    <img src="${ this.picturesPath }/${ picture }" class="img-responsive img-rounded">\n  </a>\n</figure>`;
        this.post.text = this.post.text.substring(0, textarea.selectionStart) + snippet + this.post.text.substring(textarea.selectionEnd);
        this.isSaved = false;
    }

    addLocation(textarea, feature): void {
        let snippet;
        if (textarea.selectionStart !== textarea.selectionEnd) {  // selected something
            let selection = this.post.text.substring(textarea.selectionStart, textarea.selectionEnd);
            snippet = `<span class="reference ${ feature._id }">${ selection }</span>`;
        } else {
            snippet = `<span class="reference ${ feature._id }">${ feature.properties.name }</span>`;
        }
        this.post.text = this.post.text.substring(0, textarea.selectionStart) + snippet + this.post.text.substring(textarea.selectionEnd);
        this.isSaved = false;
    }

    deleteFeature(id: string): void {
        this.featureService.delete(id).then(res => {
            let index = this.features.findIndex(o => o._id === id);
            this.features = this.features.splice(0, index);
        });
    }
}
