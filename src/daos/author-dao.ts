import { dbConnection} from '../daos/db';
import { Author, AuthorRow } from '../models/Author';
/**Database query logic */


//Retrieve all
export function getAllAuthors(): Promise<Author[]> { //Promise<Author[]> returning promise
    const sql = 'SELECT * FROM authors'; //Query database
    
    return dbConnection.query<AuthorRow>(sql, []).then(result => { //return promise type as QueryResult<AuthorRow>
        const queryrows: AuthorRow[] = result.rows; //extract rows from query response
        const authors: Author[] = queryrows.map(row => Author.from(row)); //convert sql row data format into author.ts(static method) JS objects
        return authors; //return promise<Author[]>
    });
};

//Retrieve by Id
export function getAuthorById(id: number): Promise<Author> {
    const sql = 'SELECT * FROM authors WHERE id = $1'; //Parameterize queries

    return dbConnection.query<AuthorRow>(sql, [id]) //Filter response for only [id]
        .then(result => result.rows.map(row => Author.from(row))[0]); //Limit result to 1 object by index[0]
};

//Validation interface
interface Exists {
    exists: boolean;
};
//Valid author by id in database
export async function authorExists(authorId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT id FROM authors WHERE id = $1)`; //Validate user via database by boolean
    
    const result = await dbConnection.query<Exists>(sql, [authorId]);
    return result.rows[0].exists; //if boolean: 0, user exists
};

//Insert
export function saveAuthor(author: Author): Promise<Author> {
    const sql = `INSERT INTO authors (first_name, last_name, email) \
    VALUES ($1, $2, $3) RETURNING *`; //Returning Data after insertion 

    return dbConnection.query<AuthorRow>(sql, [ //Filter placeholder response with [firstName, lastName, email]
        author.firstName,
        author.lastName,
        author.email
    ]).then(result => result.rows.map(row => Author.from(row))[0]);
};

//Update by sql coalesce
export function patchAuthor(author: Author): Promise<Author> {
    const sql = `UPDATE authors SET \
                first_name = COALESCE($2, first_name), \
                last_name = COALESCE($3, last_name), \
                email = COALESCE($4, email) \
                WHERE id = $1 RETURNING *`;

    return dbConnection.query<AuthorRow>(sql, [
        author.id,
        author.firstName, 
        author.lastName, 
        author.email
    ]).then(result => result.rows.map(row => Author.from(row))[0]);
};

//Delete by Id
export function deleteAuthorById(id: number): Promise<Author> {
    const sql = `DELETE FROM authors WHERE id = $1 RETURNING *`;

    return dbConnection.query<AuthorRow>(sql, [id])
        .then(result => result.rows.map(row => Author.from(row))[0]);
};