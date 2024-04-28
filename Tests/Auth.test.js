const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');

describe('Authentication system', () => {
    let token;

    it('Should be able to login and access the token', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "johndoe@gmail.com",
                password: "johndoe123"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeTruthy();
        token = res.body.token;
    });

    it('Should be able to access the protected routes', async () => {
        const res = await request(app)
            // get inventory
            .get('/books')
            .set('Authorization', `Authorization ${token}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Books in the stock");
    });

    it('Should be able to return 401 if JWT Token is missing(Unathorized)', async () => {
        const res = await request(app).get('/books')
        expect(res.statusCode).toEqual(401)
    })

    it('Should be able to return 403 if JWT is Invalid (Forbidden)', async () => {
        const res = await request(app)
            .get('/books')
            .set('Authorization', 'Authorization token')
        expect(res.statusCode).toEqual(403)
    })
});

/* 
1. Should be able to login and access the token
2. Should be able to access the protected routes
3. Should return 401 if JWT Token is missing (Unauthorized)
4. Should return 403 if JWT is Invalid (Forbidden)

*/