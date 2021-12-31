'use stricts'
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect
const app = require('../app/app')
chai.use(chaiHttp);
const agent = chai.request.agent(app)
const admCredentials = { email: 'admin@alkemy.org', password: '123456' }
const usrCredentials = { email: 'user@alkemy.org', password: '123456' }


describe('Get movies/characters without login', () => {
    it('Get Movies: Should get error 401', (done) => {
        agent.get('/movies')
            .end((err, res) => {
                console.log(res.body.error)
                expect(res).to.have.status(401);
                done();
            })
    })

    it('Get Characters: Should get error 401', (done) => {
        agent.get('/characters')
            .end((err, res) => {
                console.log(res.body.error)
                expect(res).to.have.status(401);
                done();
            })
    })
})


describe('Test authenticated routes with user role', () => {

    let jwtToken;

    before((done) => {
        agent.post('/auth/login').send(usrCredentials).end((err, res) => {
            if (err) done(err);
            jwtToken = res.body.token;
            done();
        })
    })

    it('Get movies Authenticated - status 200', (done) => {
        agent.get('/movies')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                //console.log(res.body)
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Get an inexistent movie - status 404', (done) => {
        agent.get('/movies/5416554864')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(404)
                done()
            })
    })


    it('Get an inexistent character - status 404', (done) => {
        agent.get('/characters/5416554864')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(404)
                done()
            })
    })

    it('Post a movie without admin role - status 403', (done) => {
        agent.post('/movies/')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(403)
                done()
            })
    })

    it('Post a character without admin role - status 403', (done) => {
        agent.post('/characters/')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(403)
                done()
            })
    })

    

})

describe('Test authenticated routes with admin role', () => {

    let jwtToken;

    before((done) => {
        agent.post('/auth/login').send(admCredentials).end((err, res) => {
            if (err) done(err);
            jwtToken = res.body.token;
            done();
        })
    })

    it('Get movies Authenticated - status 200', (done) => {
        agent.get('/movies')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                //console.log(res.body)
                expect(res).to.have.status(200)
                done()
            })
    })

    it('Get an inexistent movie - status 404', (done) => {
        agent.get('/movies/5416554864')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(404)
                done()
            })
    })


    it('Get an inexistent character - status 404', (done) => {
        agent.get('/characters/5416554864')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(404)
                done()
            })
    })

    it('Post a movie without required fields - status 400', (done) => {
        agent.post('/movies/')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(400)
                done()
            })
    })

    it('Post a character without required fields - status 400', (done) => {
        agent.post('/characters/')
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(400)
                done()
            })
    })

    it('Create a new character within a creation of new Movie with errors - status 400 of CharacterService', (done) => {
        agent.post('/movies/')
            .send({title:"newMovie",imageURL:"http://asd.com",creationDate:new Date(),rating:4,GenreId:2,Characters:[{name:"Test"}]})
            .set('Authorization', 'Bearer ' + jwtToken)
            .end((err,res)=>{
                console.log(res.body.error)
                expect(res).to.have.status(400)
                done()
            })
    })



})