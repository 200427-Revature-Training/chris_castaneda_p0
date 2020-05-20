/**Convert Postres Schema into Javascript Object */
export class Comment {
    id: number;
    comment: string;
    published: Date;
    postId: number;
    authorId: number;

    //Create new JS instance object from database schema
    static from(object: CommentRow): Comment {
        const comment = new Comment(
            object.id, 
            object.comment_body, 
            object.publish_date, 
            object.post_id,
            object.authors_id
        );
        return comment;
    };

    //Project constructor
    constructor(id: number, comment: string, published: Date, postId: number, authorId: number) {
        this.id = id;
        this.comment = comment;
        this.published = published;
        this.postId = postId;
        this.authorId = authorId;
    };
};

/**Template object of Database Table */
export interface CommentRow {
    id: number;
    comment_body: string;
    publish_date: Date;
    post_id: number;
    authors_id: number;
};