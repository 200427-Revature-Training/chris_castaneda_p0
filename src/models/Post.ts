/**Convert Postres Schema into Javascript Object */
export class Post {
    id: number;
    title: string;
    body: string;
    published: Date;
    authorId: number;

    //Create new JS instance object from database schema
    static from(object: PostRow): Post {
        const post = new Post(
            object.id, object.title, object.body, object.publish_date, object.authors_id
        );
        return post;
    };

    //Project constructor
    constructor(id: number, title: string, body: string, published: Date, authorId: number){
        this.id = id;
        this.title = title;
        this.body = body;
        this.published = published;
        this.authorId = authorId;
    };
};

/**Template object of Database Table */
export interface PostRow {
    id: number;
    title: string;
    body: string;
    publish_date: Date;
    authors_id: number;
};