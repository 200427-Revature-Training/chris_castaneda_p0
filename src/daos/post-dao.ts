import { dbConnection} from '../daos/db';
import { Post, PostRow } from '../models/Post';
import { AuthorsPosts, AuthorsPostsRow } from '../models/AuthorsPosts';
/**Database query logic */


//Retrieve all
export function getAllPosts(): Promise<Post[]> { //Promise<Post[]> returning promise
    const sql = 'SELECT * FROM posts'; //Query database
    
    return dbConnection.query<PostRow>(sql, []).then(result => { //return promise type as QueryResult<AuthorRow>
        const queryrows: PostRow[] = result.rows; //extract rows from query response
        const posts: Post[] = queryrows.map(row => Post.from(row)); //convert sql row data format into post.ts(static method) JS objects
        return posts; //return promise<Post[]>
    });
};

//Retrieve post by id
export async function getPostById(id: number): Promise<Post[]> {
    const sql = `SELECT \
                posts.*, \
	            authors.first_name, authors.last_name \
                FROM posts \
                LEFT JOIN authors ON posts.authors_id = authors.id \
                WHERE posts.id = $1`;
                 
    const result = await dbConnection.query<Post>(sql, [id]); //Async/Await: Unwrap promise
    return result.rows; //return promise<Post[]>
};





//Validation interface
interface Exists {
    exists: boolean;
};
//Valid post by id
export async function postExists(postId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT id FROM posts WHERE id = $1)`; //Validate user via database by boolean
    
    const result = await dbConnection.query<Exists>(sql, [postId]);
    return result.rows[0].exists; //if boolean: 0, user exists
};

/**Retreive posts by author id */
export async function getPostByAuthorId(authorId: number): Promise<AuthorsPosts[]> {
    const userExists: boolean = await postExists(authorId); //call postExists fucntion for validation
    if(!userExists){
        return undefined; //If userExist: false, erturn un defined.
    }

    const sql = `SELECT \
                posts.*, \
	            authors.first_name, authors.last_name \
                FROM posts \
                LEFT JOIN authors ON posts.authors_id = authors.id \
                WHERE authors.id = $1`;
                 
    const result = await dbConnection.query<AuthorsPostsRow>(sql, [authorId]); //Async/Await: Unwrap promise
    return result.rows.map(AuthorsPosts.from); //return promise<[]>
};

//Create
export function savePost(post: Post): Promise<Post> {
    const sql = `INSERT INTO posts (title, body, publish_date, authors_id) \
    VALUES ($1, $2, $3, $4) RETURNING *`; //Returning Data after insertion 

    return dbConnection.query<PostRow>(sql, [ //Filter placeholder response with [firstName, lastName, email]
        post.title,
        post.body,
        post.published,
        post.authorId
    ]).then(result => result.rows.map(row => Post.from(row))[0]);
};

//Update by sql coalesce
export function patchPost(post: Post): Promise<Post> {
    const sql = `UPDATE posts SET \
                title = COALESCE($2, title), \
                body = COALESCE($3, body), \
                publish_date = COALESCE($4, publish_date) \
                WHERE id = $1 RETURNING *`;

    return dbConnection.query<PostRow>(sql, [
        post.id,
        post.title,
        post.body,
        post.published,
    ]).then(result => result.rows.map(row => Post.from(row))[0]);
};

//Delete by Id
export function deletePostById(id: number): Promise<Post> {
    const sql = `DELETE FROM posts WHERE id = $1 RETURNING *`;

    return dbConnection.query<PostRow>(sql, [id])
        .then(result => result.rows.map(row => Post.from(row))[0]);
};