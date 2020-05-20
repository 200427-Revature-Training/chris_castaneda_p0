import express from 'express';
import * as authorService from '../services/author-service';

/**Export authors from database */
export const authorRouter = express.Router();



/**CRUD from database */

/**READ All */
authorRouter.get('', (request, response, next) => { //localhost:3000/author
    authorService.getAllAuthors()
        .then(authors => { //calling new doa object from services 
                response.set('content-type', 'application/json');
                response.json(authors); //store in json
                next();
            }).catch(err => {//Request error handler
                //console.log(err);
                response.sendStatus(500);
        });
});

/**READ by id */ 
authorRouter.get('/:id', (request, response, next) => { //localhost:3000/author/id
    const id = parseInt(request.params.id); //request id as integer

    const author = authorService.getAuthorById(id)
        .then(author => {
            if(!author){
                response.sendStatus(404); //if RETURN object does not exist
            }else{
                response.json(author);
            }
            next();
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500); //if recieving datbase issue's
            next();
        });
});

/**CREATE */
authorRouter.post('', (request, response, next) => { //localhost:3000/author
    const author = request.body; //request entire body

    authorService.saveAuthor(author) //returns new object to database
        .then(newAuthor => {
            response.status(201);
            response.json(newAuthor); //return new object
            next();
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
            next();
        }); 
});

/**UPDATE Alternitive */
authorRouter.patch('', (request, response, next) => {
    const author = request.body;

    authorService.patchAuthor(author)
        .then(updatedAuthor => {
            if(!updatedAuthor){
                response.sendStatus(404);
            }else{
                response.json(updatedAuthor);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500);
        }).finally(() => {
            next();
        });
});

/**DELETE */ 
authorRouter.delete('/:id', (request, response, next) => {
    const id = parseInt(request.params.id);

    authorService.deleteAuthorById(id)
        .then(author => {
            if(!author){ 
                response.sendStatus(404);//if object does not exist
            }else{
                console.log(`Author account deleted at id:${id}`);
                response.json(author);
            }
        }).catch(err => {
            //console.log(err);
            response.sendStatus(500); //if recieving datbase issue's
            next();
        });
});