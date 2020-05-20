import express from 'express';
import * as postService from '../services/post-service';
import { Post } from '../models/Post';
import { AuthorsPosts } from '../models/AuthorsPosts';
/**Export post from database */
export const postRouter = express.Router();



/**CRUD from database */

/**READ All */
postRouter.get('', (request, response, next) => { //localhost:3000/post
    postService.getAllPosts()
        .then(posts => { //calling new doa object from services 
                response.set('content-type', 'application/json');
                response.json(posts); //store in json
                next();
            }).catch(err => {//Request error handler
                //console.log(err);
                response.sendStatus(500);
        });
});

/**READ post by Id */
postRouter.get('/:id', async (request, response, next) => { //request promise with async
    const id: number = parseInt(request.params.id);
    let posts: Post[];

    try {
        posts = await postService.getPostById(id); //unwrap promise
    }catch(err){
        response.sendStatus(500); //send status promise not met
        //console.log(err);
        return;
    }
    
    if(!posts){
        response.sendStatus(404); //return undefined if author does not exist
    }else{
        response.json(posts);
    }
    next();
});

//Read posts by author
postRouter.get('/authors/:id', async (request, response, next) => { //request promise with async
    const authorId: number = parseInt(request.params.id);
    let posts: AuthorsPosts[];

    try {
        posts = await postService.getPostByAuthorId(authorId); //unwrap promise
    }catch(err){
        response.sendStatus(500); //send status promise not met
        //console.log(err);
        return;
    }
    
    if(!posts){
        response.sendStatus(404); //return undefined if author does not exist
    }else{
        response.json(posts);
    }
    next();
}); 

/**CREATE */
postRouter.post('', (request, response, next) => { //localhost:3000/post
    const post = request.body; //request entire body

    postService.savePost(post) //returns new object to database
        .then(newPost => {
            response.status(201);
            response.json(newPost); //return new object
            next();
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
            next();
        }); 
});

/**UPDATE Alternitive */
postRouter.patch('', (request, response, next) => {
    const post = request.body;

    postService.patchPost(post)
        .then(updatedPost => {
            if(!updatedPost){
                response.sendStatus(404);
            }else{
                response.json(updatedPost);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        });
});

/**DELETE */ 
postRouter.delete('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);

    const post = postService.deletePostById(id)
        .then(post => {
            if(!post){ 
                response.sendStatus(404);//if object does not exist
            }else{
                //console.log(`Post deleted at id:${id}`);
                response.json(post);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500); //if recieving datbase issue's
            next();
        });
});