import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";

import { AuthService } from "../../../shared/auth.service";
import { Comment } from "./comment";

@Component({
    selector: "app-comments",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
    @Input() comments: any[];
    @Output() onNewComment = new EventEmitter<Comment>();
    @Output() onCommentDelete = new EventEmitter<Comment>();
    newComment: Comment;
    lock: boolean;
    user: any;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.newComment = new Comment();
    }

    create() {
        this.lock = true;
        this.newComment.username = this.user.username;
        this.newComment.createdAt = new Date();
        this.onNewComment.emit(this.newComment);

        // reset
        this.newComment = new Comment();
        this.lock = false;
    }

    onDelete(comment: Comment) {
        this.onCommentDelete.emit(comment);
    }

    // TODO: fix this
    isToday(commentDate: Date) {
        return commentDate !== new Date(); // returns true if not today
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
        let hours = d.getHours().toString();
        if (hours.length === 1) {
            hours = "0" + hours;
        }
        let minutes = d.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        return `${ d.getDate() }. ${ month[d.getMonth()] } ${ d.getFullYear() }, ${ hours }:${ minutes }`;
    }

}
