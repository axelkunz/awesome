export class Post {
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    published: boolean = false;
    hasBackground: boolean = false;
    storyID: string;
    comments: any[];
    likes: string[];
    publishedAt: Date;
    viewCount: number;
}
