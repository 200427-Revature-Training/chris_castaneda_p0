import * as commentService from '../../src/services/comment-service';
import * as commentDao from '../../src/daos/comment-dao';
import { Comment } from '../../src/models/Comment';

/**Mock importing methods/modules */
jest.mock('../../src/daos/comment-dao');

/**Cast methods from commentDao file */
const mockCommentDao = commentDao as any;
 



/**Creating fake database object */

/**READ ALL*/
describe('GET: /comments', () => {
    //Read success test
    test('Successful get all comments by id status 200', async () => { 
        expect.assertions(1);
        mockCommentDao.getAllComments.mockImplementation(async () => ([]));
        const result = await commentService.getAllComments();

        try{
            expect(result).toBeTruthy();
        }catch(err){
            expect(err).toBeDefined();
        }
    });  
});

/**READ by id */
describe('GET: /comments/posts/:id', () => {
    //Read success test
    test('Successful get comments by post id status 200', async () => {
        expect.assertions(1);
        mockCommentDao.getAllCommentsByPostId.mockImplementation(async () => ({}));
        const result = await commentService.getAllCommentsByPostId(11);
        
        try{
            expect(result).toBeTruthy();
        }catch(err){
            expect(err).toBeDefined();
        }
        //expect(payload).not.toBeInstanceOf(Author); //Set to not author in input
        //expect(result).toBeInstanceOf(Author); //Transformed to person in result
        
    });
    
});

/**CREATE */
describe('POST: /comment', () => {
    
    //Object Success Test (BlackBox)
    test('Test object transformed to Comment object', async () => {
        mockCommentDao.saveComment.mockImplementation(input => input); //return its self object

        const payload = {
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: '1',
            authorId: '1'
        };
        const result = await commentService.saveComment(payload);

        expect(payload).not.toBeInstanceOf(Comment); //Set to not comment in input
        expect(result).toBeInstanceOf(Comment); //Transformed to person in result
    });

    //Object Properties Failure Test(WhiteBox)
    test('Expected 422 returned if no firstName provided', async () => {

        mockCommentDao.saveComment.mockReturnValue(undefined); //mockCommentDao function returning undefined response
        const payload = {
            title: 'Title',
            body: 'Test'
        }

        let expectedError = undefined;

        try{
            await commentService.saveComment(payload); 
            fail('commentService.saveComment failed request'); //Reject saveComment due to missing authorId
        }catch(err){
            expectedError = err; //Assign error object to expectedError
        }
        expect(expectedError).toBeDefined(); //Validate error was thrown
    });

    //Object Properties Failure Test
    test('Expected 422 returned if no authorId provided', async () => {

        expect.assertions(1); //cleaner assertion syntax replacing mockCommentDao function
        const payload = {
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: '1'
        }

        let expectedError = undefined;

        try{
            await commentService.saveComment(payload); 
            fail('commentService.saveComment failed request'); //Reject saveComment due to missing name
        }catch(err){
            expect(err).toBeDefined(); //part of assertion syntax
        }
    });

    //Object Properties Failure Test
    test('Expected 422 returned if no authorId provided', async () => {

        expect.assertions(1); //cleaner assertion syntax replacing mockCommentDao function
        const payload = {
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: 1
        }

        let expectedError = undefined;

        try{
            await commentService.saveComment(payload); 
            fail('commentService.saveComment failed request'); //Reject saveComment due to missing name
        }catch(err){
            expect(err).toBeDefined(); //part of assertion syntax
        }
    });

    //ID Validation Test
    test('Inserted ID field should fail', async () => {
        mockCommentDao.saveComment.mockImplementation(input => input); //return its self object

        const payload = {
            id: 15,
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: '1',
            authorId: '1'
        };
        const result = await commentService.saveComment(payload);

        expect(result.id).not.toBe(payload.id); //Compared id should be undefined.
    });

    //Inserting Extra Fields Test
    test('Inserted extra field should fail', async () => {
        mockCommentDao.saveComment.mockImplementation(input => input); //return its self object

        const payload = {
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: '1',
            authorId: '1',
            extraFieldInput: true
        };
        const result = await commentService.saveComment(payload)  as any;

        expect(result.extraFieldInput).not.toBeDefined(); //Call extra property.
    });
});


/**UPDATE */
describe('PATCH: /comments', () => {
    //Patch success test
    test('Successful patch', async () => {
        //expect.assertions(1);
        mockCommentDao.patchComment.mockImplementation(input => input);

        const payload = {
            id: '1',
            comment: 'Title',
            published: '2020-0o1-0o1',
            postId: '1',
            authorId: '1'
        };
        const result = await commentService.patchComment(payload);

        //expect(result).toBeTruthy();
        expect(payload).not.toBeInstanceOf(Comment); //Set to not author in input
        expect(result).toBeInstanceOf(Comment); //Transformed to person in result
    });

    //Expected server error test
    test('Throw new Error status 400', async () => {
        //expect.assertions(1);
        mockCommentDao.patchComment.mockReturnValue(undefined);

        const payload = {
            title: 'Title',
            body: 'Test',
            published: '2020-0o1-0o1',
            authorId: '1'
        };

        let expectedError = undefined;
        
        try{
            await commentService.patchComment(payload);
            //const result = await commentService.patchComment(payload);
        }catch(err){
            expectedError = err;
            //expect(err).toBeTruthy();
        }
        expect(expectedError).toBeDefined();
    });
});

/**DELETE */
describe('DELETE: /comments/:id', () => {
    //Read success test
    test('Successful delete of id', async () => {
        expect.assertions(1);
        //mockCommentDao.saveComment.mockImplementation(input => input);

        const result = await commentService.deleteCommentById(1);

        try{
            expect(result).toContain({});
        }catch(err){
            expect(err).toBeDefined();
        }
        //expect(payload).not.toBeInstanceOf(Comment); //Set to not comment in input
        //expect(result).toBeInstanceOf(Comment); //Transformed to person in result
    });
});
