import { Post } from '../models/Post';
import * as postDao from '../daos/post-dao';
import { AuthorsPosts } from '../models/AuthorsPosts';
/**Application Logic */


//READ all by id
export function getAllPosts(): Promise<Post[]> { //Promise<Post[]> returning array promise from doa's
    //Apply internal logic here(user privalleges/rules/authentication)
    return postDao.getAllPosts();
};

//Reference post object by database id 
export function getPostById(id: number): Promise<Post[]> {
    return postDao.getPostById(id);
};

/*Reference post object by database author id*/
export function getPostByAuthorId(authorId: number): Promise<AuthorsPosts[]> {
    return postDao.getPostByAuthorId(authorId);
};

//Create database object
export function savePost(post: any): Promise<Post> {
    const newPost = new Post ( //create object from service request
        undefined, //set undefined id to prevent sql injection
        post.title, 
        post.body, 
        post.published,
        post.authorId
    )

    if(post.title && post.body && post.published && post.authorId){ //Data is valid - submit to DAO
        return postDao.savePost(newPost);
    }else{
        //console.log('Posts invalid');
        return new Promise((resolve, reject) => reject(422));
    }
};

//Update by object properties
export function patchPost(properties: any): Promise<Post> {
    const post = new Post(
        properties.id,
        properties.title,
        properties.body,
        properties.published,
        properties.authorId
    );

    if(!post.id){
        throw new Error('400');
    }else{
        return postDao.patchPost(post);
    }
};

//Delete by Id
export function deletePostById(id: number): Promise<Post> {
    return postDao.deletePostById(id);
};