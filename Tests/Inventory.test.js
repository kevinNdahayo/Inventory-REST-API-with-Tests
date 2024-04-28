const app = require('../index');
const request = require('supertest');

describe("Test Inventory Routes", () => {
    let token;
    //  Should be able to post a new book inventory
    beforeAll(async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "johndoe@gmail.com",
                password: "johndoe123"
            });
        token = res.body.token;
    }, 10000);
    it("Should be able to post a new book inventory", async () => {
        const res = await request(app)
            .post('/books/register')
            .set('Authorization', `Authorization ${token}`)
            .send({
                bookTitle: "Aladin",
                bookAuthor: "Jack smith",
                bookPrice: 15,
                stockQuantity: 120
            })
        expect(res.statusCode).toEqual(201)
    });

    it("Should be able to give a 401(Unauthorized) incase missing JWT Token to access inventory", async () => {
        const res = await request(app)
            .get('/books')

        expect(res.statusCode).toEqual(401)
    });

    it("Should be able to give a 403 (Forbidden) incase an Invalid JWT Token to access inventory", async () => {
        const res = await request(app)
            .get('/books')
            .set('Authorization', 'Authorization token')
        expect(res.statusCode).toEqual(403)
    });

    it("Should be able to retrieve book inventory", async () => {
        const res = await request(app)
            .get('/books')
            .set('Authorization', `Authorization ${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual("Books in the stock")
    });

    it("Should be able to update book inventory", async () => {
        const bookId = '662e0962c0c1e88b4e423f61';
        const res = await request(app)
            .put(`/books/update/${bookId}`)
            .set('Authorization', `Authorization ${token}`)
            .send({
                bookTitle: "Think and Grow Rich",
                bookAuthor: "Napoleon Hills",
                bookPrice: 65,
                stockQuantity: 100
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body.message).toEqual("Updated Book Inventory")
    });

    it("Should be able to Delete book inventory", async () => {
        const bookId = '662eab7ca949742572fce60b';
        const res = await request(app)
            .delete(`/books/delete/${bookId}`)
            .set('Authorization', `Authorization ${token}`)
        expect(res.statusCode).toEqual(200)
    });

})

/*
1. Should be able to post a new book inventory
2. Should be able to give a 401(Unauthorized) incase a JWT Token is passed to access inventory
3. Should be able to give a 403 (Forbidden) incase an Invalid JWT Token is passed to access inventory
4. We should be able to retrieve book inventory in a database
5. Should be able to retrieve a book using a bookId 
5. We should be able to update our book Inventory in database
7. We should be able to delete our book Inventory in database
8. Should show 404 Not Found incase a book isnot found

*/