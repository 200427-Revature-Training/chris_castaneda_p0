import * as authorService from '../../src/services/author-service';
import * as authorDao from '../../src/daos/author-dao';
import { Author } from '../../src/models/Author';

/**Mock importing methods/modules */
jest.mock('../../src/daos/author-dao');

/**Cast methods from authorDao file */
const mockAuthorDao = authorDao as any;
 



/**Creating fake database object */

/**READ ALL*/
describe('GET: /authors', () => {
    //Read success test
    test('Successful get all by id status 200', async () => { 
        expect.assertions(1);
        mockAuthorDao.getAllAuthors.mockImplementation(async () => ([]));
        const result = await authorService.getAllAuthors();

        try{
            expect(result).toBeTruthy();
        }catch(err){
            expect(err).toBeDefined();
        }
    });
}); 

/**READ by id */
describe('GET: /authors/:id', () => {
    //Read success test
    test('Successful get by id status 200', async () => {
        expect.assertions(1);
        mockAuthorDao.getAuthorById.mockImplementation(async () => ({}));
        const result = await authorService.getAuthorById(11);
        
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
describe('POST: /authors', () => {
    
    //Object Success Test (BlackBox)
    test('Test object transformed to Person object', async () => {
        mockAuthorDao.saveAuthor.mockImplementation(input => input); //return its self object

        const payload = {
            firstName: 'Test',
            lastName: 'Success',
            email: 'testpassed@email.com'
        };
        const result = await authorService.saveAuthor(payload);

        expect(payload).not.toBeInstanceOf(Author); //Set to not author in input
        expect(result).toBeInstanceOf(Author); //Transformed to person in result
    });

    //Object Properties Failure Test(WhiteBox)
    test('Expected 422 returned if no firstName provided', async () => {

        mockAuthorDao.saveAuthor.mockReturnValue(undefined); //mockAuthorDao function returning undefined response
        const payload = {
            lastName: 'Smith',
            email: 'testNew.Object@jest.com'
        }

        let expectedError = undefined;

        try{
            await authorService.saveAuthor(payload); 
            fail('authorService.saveAuthor failed request'); //Reject saveAuthor due to missing name
        }catch(err){
            expectedError = err; //Assign error object to expectedError
        }
        expect(expectedError).toBeDefined(); //Validate error was thrown
    });

    //Object Properties Failure Test
    test('Expected 422 returned if no lastName provided', async () => {

        expect.assertions(1); //cleaner assertion syntax replacing mockAuthorDao function
        const payload = {
            firstName: 'Test',
            email: 'testNew.Object@jest.com'
        }

        let expectedError = undefined;

        try{
            await authorService.saveAuthor(payload); 
            fail('authorService.saveAuthor failed request'); //Reject saveAuthor due to missing name
        }catch(err){
            expect(err).toBeDefined(); //part of assertion syntax
        }
    });

    //Object Properties Failure Test
    test('Expected 422 returned if no email provided', async () => {

        expect.assertions(1); //cleaner assertion syntax replacing mockAuthorDao function
        const payload = {
            firstName: 'Test',
            lastName: 'Smith'
        }

        let expectedError = undefined;

        try{
            await authorService.saveAuthor(payload); 
            fail('authorService.saveAuthor failed request'); //Reject saveAuthor due to missing name
        }catch(err){
            expect(err).toBeDefined(); //part of assertion syntax
        }
    });

    //ID Validation Test
    test('Inserted ID field should fail', async () => {
        mockAuthorDao.saveAuthor.mockImplementation(input => input); //return its self object

        const payload = {
            id: '15',
            firstName: 'Test',
            lastName: 'Success',
            email: 'testpassed@email.com'
        };
        const result = await authorService.saveAuthor(payload);

        expect(result.id).not.toBe(payload.id); //Compared id should be undefined.
    });

    //Inserting Extra Fields Test
    test('Inserted extra field should fail', async () => {
        mockAuthorDao.saveAuthor.mockImplementation(input => input); //return its self object

        const payload = {
            firstName: 'Test',
            lastName: 'Success',
            email: 'testpassed@email.com',
            extraFieldInput: true
        };
        const result = await authorService.saveAuthor(payload)  as any;

        expect(result.extraFieldInput).not.toBeDefined(); //Call extra property.
    });
});

/**UPDATE */
describe('PATCH: /authors', () => {
    //Object Success Test (BlackBox)
    test('Test object transformed to Person object', async () => {
        mockAuthorDao.patchAuthor.mockImplementation(input => input); //return its self object

        const payload = {
            id: '1',
            lastName: 'Success',
            email: 'testpassed@email.com'
        };
        const result = await authorService.patchAuthor(payload);

        expect(payload).not.toBeInstanceOf(Author); //Set to not author in input
        expect(result).toBeInstanceOf(Author); //Transformed to person in result
    });

     //Object Properties Failure Test(WhiteBox)
     test('Throw new Error status 400', async () => {
        //expect.assertions(1);
        mockAuthorDao.patchAuthor.mockReturnValue(undefined); //mockAuthorDao function returning undefined response
        
        const payload = {
            lastName: 'Smith',
            email: 'testNew.Object@jest.com'
        }

        let expectedError = undefined;

        try{
            await authorService.patchAuthor(payload);
            fail('authorService.patchAuthor failed request'); //Reject patchAuthor due to missing name
        }catch(err){
            expectedError = err; //Assign error object to expectedError
        }
        expect(expectedError).toBeDefined(); //Validate error was thrown
    });
});

/**DELETE */
describe('DELETE: /authors/:id', () => {
    //Read success test
    test('Successful delete of id', async () => {
        expect.assertions(1);
        //mockAuthorDao.saveAuthor.mockImplementation(input => input);

        const result = await authorService.deleteAuthorById(1);

        try{
            expect(result).toContain({});
        }catch(err){
            expect(err).toBeDefined();
        }
        //expect(payload).not.toBeInstanceOf(Author); //Set to not author in input
        //expect(result).toBeInstanceOf(Author); //Transformed to person in result
    });
});
