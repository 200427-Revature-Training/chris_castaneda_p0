import express from 'express';
import bodyParser from 'body-parser';
import { commentRouter } from '../../src/routers/comment-router';
import * as commentService from '../../src/services/comment-service';
import request from 'supertest';

/**Mock Service Layer */
jest.mock('../../src/services/comment-service');
const mockCommentService = commentService as any;

/**Test Express server & middleware */
const app = express();
app.use(bodyParser.json());
app.use('/comments', commentRouter);




/**
 * test ex:GET /people/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500
 */

 

/**Request fake http methods */

/**READ All */
describe('GET: /comments',() => {
    //GET success test
    test('Returns normal app with status 200', async () => {
        mockCommentService.getAllComments.mockImplementation( async () => []);//mockCommentService returning Object
        
        await request(app)
            .get('/comments') //Send request
            .expect('content-type', 'application/json; charset=utf-8') // Expect in response content-type JSON
            .expect(200); //SendStatus(200)
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockCommentService.getAllComments.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .get('/comments')
            .expect(500);
    });
});

/**READ comments by post id */
describe('GET: /comments/posts/:id', () => {
    //Get success test
    test('Returns normal app with status 200', async () => {
        mockCommentService.getAllCommentsByPostId.mockImplementation( async () => ({}));

        await request(app)
            .get('/comments/posts/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockCommentService.getAllCommentsByPostId.mockImplementation( async () => {0}); //insert value 0 as object
        
        await request(app)
            .get('/comments/posts/89')
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockCommentService.getAllCommentsByPostId.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .get('/comments/posts/40')
            .expect(500);
    });
});

/**CREATE */
describe('POST: /comments', () => {
    //Comment success test
    test('Successful create should return status 201', async () => {
        mockCommentService.saveComment.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'Test',
            lastName: 'Create',
            email: "new.create@email.com"
        };

        await request(app)
            .post('/comments')
            .send(payload)
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(201);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockCommentService.saveComment.mockImplementation(async () => {throw new Error()}); 
        const payload = {
            firstName: 'Test',
            lastName: 'Create',
            email: "new.create@email.com"
        };

        await request(app)
            .post('/comments')
            .send(payload)
            .expect(500);
    });
});

/**UPDATE */
describe('PATCH: /comments', () => {
    //comment success test
    test('Successful Patch', async () => {
        mockCommentService.patchComment.mockImplementation(async () => ({}));
        const payload = {
            id: '6',
            comment: 'object',
            postId: "1"
        };

        await request(app)
            .patch('/comments')
            .send(payload)
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });
    
    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockCommentService.patchComment.mockImplementation( async () => {0}); //insert value 0 as object
        const payload = {
            id: '1',
            comment: 'object',
            postId: "1"
        };

        await request(app)
            .patch('/comments')
            .send(payload)
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockCommentService.patchComment.mockImplementation(async () => {throw new Error()}); 
        const payload = {
            id: 'F',
            comment: 'object',
            postId: "1"
        };

        await request(app)
            .patch('/comments')
            .send(payload)
            .expect(500);
    });
});


/**DELETE */
describe('DELETE: /:id', () => {
    //Get success test
    test('DELETE returns status 200', async () => {
        mockCommentService.deleteCommentById.mockImplementation( async () => ({}));

        await request(app)
            .delete('/comments/1')
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });
    
    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockCommentService.deleteCommentById.mockImplementation( async () => {0}); //insert value 0 as object
        
        await request(app)
            .delete('/comments/1')
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockCommentService.deleteCommentById.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .delete('/comments/1') 
            .expect(500); 
    });
});