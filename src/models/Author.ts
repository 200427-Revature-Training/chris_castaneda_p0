/**Convert Postres Schema into Javascript Object */
export class Author {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    //Create new JS instance object from database schema
    static from(object: AuthorRow): Author {
        const author = new Author(
            object.id, object.first_name, object.last_name, object.email
        );
        return author;
    };

    //Project constructor
    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    };
};

/**Template object of Database Table */
export interface AuthorRow {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};