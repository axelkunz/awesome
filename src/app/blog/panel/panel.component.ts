import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Post } from "../../shared/post";
import { ConfigService } from "../../shared/config.service";

@Component({
    selector: "app-panel",
    templateUrl: "./panel.component.html",
    styleUrls: ["./panel.component.css"]
})
export class PanelComponent implements OnInit {
    @Input() post: Post;
    @Output() panelClick = new EventEmitter<Post>();

    constructor(private configService: ConfigService) { }

    ngOnInit() { }

    getBackgroundImage(postID: string): string {
        if (this.post.hasBackground) {
            return `url("images/${ this.post._id }/background.jpg")`;
        }
    }

    onClick() {
        this.panelClick.emit(this.post)
    }

    /**
     * Workaround for formatted date strings on older safari versions
     */
    getFormattedDate(date: string) {
        let month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mrz";
        month[3] = "Apr";
        month[4] = "Mai";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Okt";
        month[10] = "Nov";
        month[11] = "Dez";

        let d = new Date(date);
        return `${ d.getDate() }. ${ month[d.getMonth()] } ${ d.getFullYear() }`;
    }

    getOpacity() {
        return this.post.published ? 1.0 : 0.5;
    }
}
