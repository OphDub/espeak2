const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.rollback()
          .then(() => {
            database.migrate.latest()
              .then(() => {
                return database.seed.run()
                  .then(() => {
                    done();
                  })
              })
          })
      })
  })

  describe('GET /api/v1/users', () => {
    it('should return all of the users', () => {
      return chai.request(server)
      .get('/api/v1/users')
      .then( response => {
        response.should.have.status(200)
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.all.keys(['name', 'email', 'firebase_id', 'id', 'stack_id', 'points'])
        response.body[0].id.should.equal(1)
        response.body[0].name.should.equal('jon snow');
        response.body[0].email.should.equal('jon@knownothing.com');
        response.body[0].firebase_id.should.equal('KZ5xIaj7eQOOP4fD3sGXbXYIIN22');
        response.body[0].stack_id.should.equal(1);
      })
    })
  })

  describe('GET /api/v1/users/:id', () => {
    it('should return just one user', () => {
      const userFbId = 'KZ5xIaj7eQOOP4fD3sGXbXYIIN22';

      return chai.request(server)
      .get(`/api/v1/users/${userFbId}`)
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.all.keys(['name', 'email', 'firebase_id', 'id', 'stack_id', 'points'])
        response.body[0].id.should.equal(1);
        response.body[0].name.should.equal('jon snow');
        response.body[0].email.should.equal('jon@knownothing.com');
        response.body[0].points.should.equal(0);
        response.body[0].firebase_id.should.equal('KZ5xIaj7eQOOP4fD3sGXbXYIIN22');
        response.body[0].stack_id.should.equal(1);
      })
    })

    it('should return an error with status of 404 if the user is not found', () => {
      const invalidUserId = `928ur0j2imn09j0f2f`;

      return chai.request(server)
      .get(`/api/v1/users/${invalidUserId}`)
      .then( response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.error.should.equal(`User with id: ${invalidUserId}, not found.`)
      })
    })
  })

  describe('PATCH /api/v1/users/:id', () => {
    it('should update the user', () => {
      const userFbId = 'KZ5xIaj7eQOOP4fD3sGXbXYIIN22';

      return chai.request(server)
      .patch(`/api/v1/users/${userFbId}`)
      .send({
        points: 50
      })
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
      })
    })

    it('should return an error with status of 404 is the user is not found', () => {
      const invalidUserId = `928ur0j2imn09j0f2f`;

      return chai.request(server)
      .patch(`/api/v1/users/${invalidUserId}`)
      .send({
        points: 50
      })
      .then( response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.error.should.equal(`No user with ${invalidUserId} to update`)
      })
    })
  })

  describe('POST /api/v1/users', () => {
    it('should post a new user', () => {
      return chai.request(server)
      .post('/api/v1/users')
      .send({
        name: 'pophus',
        email: 'pophus@notpophanda.com',
        stack_id: 1,
        points: 1,
        firebase_id: 'KZ8xIaj7eQOOP4fD3sGXbXYIIN25'
      })
      .then( response => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.user[0].should.equal(2)
      })
    })

    it('should return an error with status 422 if the user is missing info', () => {
      const incompleteUser = {
        name: 'pophus',
        stack_id: 1,
        points: 1,
        firebase_id: 'KZ8xIaj7eQOOP4fD3sGXbXYIIN25'
      };
      const missingParam = 'email';

      return chai.request(server)
      .post('/api/v1/users')
      .send(incompleteUser)
      .then( response => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.error.should.equal(
          `Expected format: {name: <String>, email: <String>, stack_id: <Number>, 'firebase_id': <String>, 'points': <Number> } You're missing a ${missingParam}.`
        )
      })
    })
  })

  describe('GET /api/v1/words', () => {
    it('should return all the words', () => {
      return chai.request(server)
      .get('/api/v1/words')
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.all.keys(['english', 'spanish', 'hint', 'id', 'stack_id']);
        response.body[0].english.should.equal('hi');
        response.body[0].spanish.should.equal('hola');
        response.body[0].hint.should.equal('oh-la');
        response.body[0].stack_id.should.equal(1);
      })
    })
  })

  describe('GET /api/v1/words/:stack_id', () => {
    it('should return an array of words associated with given stack id' , () => {
      return chai.request(server)
      .get('/api/v1/words/1')
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.all.keys(['english', 'spanish', 'hint', 'id', 'stack_id']);
        response.body[0].english.should.equal('hi');
        response.body[0].spanish.should.equal('hola');
        response.body[0].hint.should.equal('oh-la');
        response.body[0].stack_id.should.equal(1);
      })
    })

    it('should return an error with status 404 if the stack id cannot be found', () => {
      const invalidStackId = 23;

      return chai.request(server)
      .get(`/api/v1/words/${invalidStackId}`)
      .then( response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.error.should.equal(`No stack with ${invalidStackId} found`)
      });
    })
  });

  describe('GET /api/v1/stack', () => {
    it('should return all of the stacks', () => {
      return chai.request(server)
      .get('/api/v1/stack')
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.all.keys(['category', 'id']);
        response.body[0].category.should.equal('Basics 1');
        response.body[0].id.should.equal(1);
      })
    })
  })

  describe('GET /api/v1/stack/:id', () => {
    it('should return one stack', () => {
      return chai.request(server)
      .get('/api/v1/stack/1')
      .then( response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.all.keys(['category', 'id']);
        response.body[0].category.should.equal('Basics 1');
        response.body[0].id.should.equal(1);
      })
    })

    it('should return an error with status 404 if the stack id cannot be found', () => {
      const invalidStackId = 1080;

      return chai.request(server)
      .get(`/api/v1/stack/${invalidStackId}`)
      .then( response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.error.should.equal(`No stack with ${invalidStackId} found`);
      });
    })
  })
});