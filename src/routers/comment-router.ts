import express from 'express';
import * as commentService from '../services/comment-service';
import { ArticleComments } from '../models/ArticleComments';

/**Export comments from database */
export const commentRouter = express.Router();



/**CRUD from database */

/**READ All */
commentRouter.get('', (request, response, next) => { //localhost:3000/comment
    commentService.getAllComments()
        .then(comments => { //calling new doa object from services 
                response.set('content-type', 'application/json');
                response.json(comments); //store in json
                next();
            }).catch(err => {//Request error handler
                //console.log(err);
                response.sendStatus(500);
        });
});

/**READ comments by post id  */
commentRouter.get('/posts/:id', async (request, response, next) => { //request promise with async
    const postId: number = parseInt(request.params.id);
    let posts: ArticleComments[];

    try {
        posts = await commentService.getAllCommentsByPostId(postId); //unwrap promise
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
commentRouter.post('', (request, response, next) => { //localhost:3000/comment
    const comment = request.body; //request entire body

    commentService.saveComment(comment) //returns new object to database
        .then(newComment => {
            response.status(201);
            response.json(newComment); //return new object
            next();
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
            next();
        }); 
});

/**UPDATE Alternitive */
commentRouter.patch('', (request, response, next) => {
    const comment = request.body;

    commentService.patchComment(comment)
        .then(updatedComment => {
            if(!updatedComment){
                response.sendStatus(404);
            }else{
                response.json(updatedComment);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        });
});

/**DELETE */ 
commentRouter.delete('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);

    commentService.deleteCommentById(id)
        .then(comment => {
            if(!comment){ 
                response.sendStatus(404);//if object does not exist
            }else{
                //console.log(`Comment deleted at post id:${id}`);
                response.json(comment);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500); //if recieving datbase issue's
            next();
        });
});