import { Author } from '../models/Author';
import * as authorDao from '../daos/author-dao';
/**Application Logic */


/**Read All */
export function getAllAuthors(): Promise<Author[]> { //Promise<Author[]> returning promise from doa in array's
    //Apply internal logic here(user privalleges/rules/authentication)
    return authorDao.getAllAuthors();
};

//READ/reference author object by database id
export function getAuthorById(id: number): Promise<Author> {
    //Apply internal logic here(user privalleges/rules/authentication)
    return authorDao.getAuthorById(id);
};

//Create database object
export function saveAuthor(author: any): Promise<Author> {
    const newAuthor = new Author ( //create object from service request
        undefined, //set undefined id to prevent sql injection
        author.firstName, 
        author.lastName, 
        author.email
    )

    if(author.firstName && author.lastName && author.email){ //Data is valid - submit to DAO
        return authorDao.saveAuthor(newAuthor);
    }else{
        //console.log('Author invalid');
        return new Promise((resolve, reject) => reject(422));
    }
};

//Update by object properties
export function patchAuthor(properties: any): Promise<Author> {
    const author = new Author(
        properties.id,
        properties.firstName,
        properties.lastName,
        properties.email
    );

    if(!author.id){
        throw new Error('400');
    }else{
        return authorDao.patchAuthor(author);
    }
};

//Delete by Id
export function deleteAuthorById(id: number): Promise<Author> {
    return authorDao.deleteAuthorById(id);
};