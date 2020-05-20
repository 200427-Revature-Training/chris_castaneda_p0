import express from 'express';
import bodyParser from 'body-parser';
import { postRouter } from '../../src/routers/post-router';
import * as postService from '../../src/services/post-service';
import request from 'supertest';

/**Mock Service Layer */
jest.mock('../../src/services/post-service');
const mockPostService = postService as any;

/**Test Express server & middleware */
const app = express();
app.use(bodyParser.json());
app.use('/posts', postRouter);




/**
 * test ex:GET /people/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500
 */



/**Request fake http methods */

/**READ All */
describe('GET: /posts',() => {
    //GET success test
    test('Returns normal app with status 200', async () => {
        mockPostService.getAllPosts.mockImplementation( async () => []);//mockPostService returning Object
        
        await request(app)
            .get('/posts') //Send request
            .expect('content-type', 'application/json; charset=utf-8') // Expect in response content-type JSON
            .expect(200); //SendStatus(200)
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.getAllPosts.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .get('/posts')
            .expect(500);
    });
});

/**READ by id */
describe('GET: /posts/:id', () => {
    //Get success test
    test('Returns normal app with status 200', async () => {
        mockPostService.getPostById.mockImplementation( async () => ({}));

        await request(app)
            .get('/posts/1')
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });

    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockPostService.getPostById.mockImplementation( async () => {0}); //insert value 0 as object
        
        await request(app)
            .get('/posts/1')
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.getPostById.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .get('/posts/40')
            .expect(500);
    });
}); 

/**Read posts by author */
describe('GET: posts/authors/:id', () => {
    //Get success test
    test('Failed read should return status 200', async () => {
        mockPostService.getPostByAuthorId.mockImplementation( async () => ({}));

        await request(app)
            .get('/posts/authors/1')
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });

    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockPostService.getPostByAuthorId.mockImplementation( async () => {0}); //insert value 0 as object
        
        await request(app)
            .get('/posts/authors/1')
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.getPostByAuthorId.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .get('/posts/authors/40')
            .expect(500);
    });
});

/**CREATE */
describe('POST: /posts', () => {
    //Post success test
    test('Successful create should return status 201', async () => {
        mockPostService.savePost.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'Test',
            lastName: 'Create',
            email: "new.create@email.com"
        };

        await request(app)
            .post('/posts')
            .send(payload)
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(201);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.savePost.mockImplementation(async () => {throw new Error()}); 
        const payload = {
            firstName: 'Test',
            lastName: 'Create',
            email: "new.create@email.com"
        };

        await request(app)
            .post('/posts')
            .send(payload)
            .expect(500);
    });
});

/**UPDATE */
describe('PATCH: /posts', () => {
    //Post success test
    test('Successful Patch', async () => {
        mockPostService.patchPost.mockImplementation(async () => ({}));
        const payload = {
            id: '6',
            title: 'object',
            body: "content"
        };

        await request(app)
            .patch('/posts')
            .send(payload)
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });

     //Expected server error test
     test('Returns 404 status from throw error', async () => {
        mockPostService.patchPost.mockImplementation( async () => {0}); //insert value 0 as object
        const payload = {
            id: '1',
            title: 'object',
            body: "content"
        };

        await request(app)
            .patch('/posts')
            .send(payload)
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.patchPost.mockImplementation(async () => {throw new Error()}); 
        const payload = {
            id: 'F',
            title: 'object',
            body: "content"
        };

        await request(app)
            .patch('/posts') 
            .send(payload)
            .expect(500);
    });
});


/**DELETE */
describe('DELETE: /:id', () => {
    //Get success test
    test('DELETE returns status 200', async () => {
        mockPostService.deletePostById.mockImplementation( async () => ({}));

        await request(app)
            .delete('/posts/1')
            .expect('content-type', 'application/json; charset=utf-8')
            .expect(200);
    });

    //Expected server error test
    test('Returns 404 status from throw error', async () => {
        mockPostService.deletePostById.mockImplementation( async () => {0}); //insert value 0 as object
        
        await request(app)
            .delete('/posts/1')
            .expect(404);
    });

    //Expected server error test
    test('Returns 500 status from throw error', async () => {
        mockPostService.deletePostById.mockImplementation( async () => {throw new Error()});
        
        await request(app)
            .delete('/posts/1') 
            .expect(500); 
    });
});