const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'eSpeak db';
app.use(bodyParser.json());

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then( users => {
      response.status(200).json(users);
    })
    .catch( error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('users').where('firebase_id', id).select()
    .then( user => {
      response.status(200).json(user)
    })
    .catch( error => {
      response.status(500).json({ error })
    })
})

app.patch('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;
  const userPatch = request.body;

  database('users').where('firebase_id', id).update(userPatch)
    .then( user => {
      if ( user ) {
        response.status(200).json({ id });
      } else {
        response.status(404).json({ error: `No user with ${id} to update` });
      }
    })
    .catch( error => {
      response.status(500).json({ error });
    })
})

app.post('/api/v1/users', (request, response) => {
  const user = request.body;

  for (let requiredParam of ['name', 'email', 'stack_id', 'firebase_id', 'points']) {
    if(!user[requiredParam]) {
      return response.status(422)
      .send({error: `Expected format: {name: <String>, email: <String>, stack_id: <Number>, 'firebase_id': <String>, 'points': <Number> } You're missing a ${requiredParam}.`});
    }
  }

  database('users').insert(user, 'id')
    .then( user => {
      response.status(201).json({ user });
    })
    .catch( error => {
      response.status(500).json({ error });
    })
})

app.get('/api/v1/words', ( request, response ) => {
  database('words').select()
  .then( words => {
    response.status(200).json(words);
  })
  .catch( error => {
    response.status(500).json({ error });
  })
})

app.get('/api/v1/words/:stack_id', (request, response) => {
  const { stack_id } = request.params;
  database('words').where('stack_id', stack_id).select()
  .then( words => {
    response.status(200).json(words)
  })
  .catch( error => {
    response.status(500).json({ error });
  })
})

app.get('/api/v1/stack', ( request, response ) => {
  database('stack').select()
  .then( stack => {
    response.status(200).json(stack);
  })
  .catch( error => {
    response.status(500).json({ error });
  })
})

app.get('/api/v1/stack/:id', (request, response) => {
  const { id } = request.params;

  database('stack').where('id', id).select()
  .then( stack => {
    response.status(200).json(stack);
  })
  .catch( error => {
    response.status(500).json({error})
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is listening at ${app.get('port')}`);
});

module.exports = app;