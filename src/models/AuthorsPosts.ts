/**Convert Postres Schema into Javascript Object */
export class AuthorsPosts {
    postId: number;
    title: string;
    body: string;
    published: Date;
    authorId: number;
    firstName: string;
    lastName: string;

    //Create new JS instance object from database schema
    static from(object: AuthorsPostsRow): AuthorsPosts {
        const post = new AuthorsPosts(
            object.id, 
            object.title, 
            object.body, 
            object.publish_date, 
            object.authors_id, 
            object.first_name,
            object.last_name
        );
        return post;
    };

    //Project constructor
    constructor(postId: number, title: string, body: string, published: Date, authorId: number, firstName: string, lastName: string){
        this.postId = postId;
        this.title = title;
        this.body = body;
        this.published = published;
        this.authorId = authorId;
        this.firstName = firstName;
        this.lastName = lastName;
    };
};

/**Template object of Database Table */
export interface AuthorsPostsRow {
    id: number;
    title: string;
    body: string;
    publish_date: Date;
    authors_id: number;
    first_name: string;
    last_name: string;
};