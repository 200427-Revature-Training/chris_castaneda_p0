/**Convert Postres Schema into Javascript Object */
export class ArticleComments {
    title: string;
    commentId: number;
    comment: string;
    published: Date;
    postId: number;
    authorId: number;
    firstName: string;
    lastName: string;

    //Create new JS instance object from database schema
    static from(object: ArticleCommentsRow): ArticleComments {
        const post = new ArticleComments(
            object.title,
            object.id, 
            object.comment_body, 
            object.publish_date, 
            object.post_id,
            object.authors_id,
            object.first_name,
            object.last_name
        );
        return post;
    };

    //Project constructor
    constructor(title:string, commentId: number, comment: string, published: Date, postId: number, authorId: number, firstName: string, lastName: string){
        this.title = title;
        this.commentId = commentId;
        this.comment = comment;
        this.published = published;
        this.postId = postId;
        this.authorId = authorId;
        this.firstName = firstName;
        this.lastName = lastName;
    };
};

/**Template object of Database Table */
export interface ArticleCommentsRow {
    title: string;
    id: number;
    comment_body: string;
    publish_date: Date;
    post_id: number;
    authors_id: number;
    first_name: string;
    last_name: string;
};