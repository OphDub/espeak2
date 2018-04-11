
exports.seed = function (knex, Promise) {
  return knex('words').del()
    .then(() => {
      return knex('users').del()
    })
    .then(() => {
      return knex('stack').del()
    })
    .then(() => {
      return Promise.all([
        knex('stack').insert({ category: 'Basics 1' }, 'id')
          .then((stackId) => {
            return knex('words').insert([
              {
                english: 'hi',
                spanish: 'hola',
                hint: 'oh-la',
                stack_id: stackId[0]
              },
              {
                english: 'bye',
                spanish: 'adios',
                hint: 'ah-dee-ohs',
                stack_id: stackId[0]
              },
              {
                english: 'good morning',
                spanish: 'buenos dias',
                hint: 'wenos dee-ahz',
                stack_id: stackId[0]
              },
            ], 'stack_id')
          })
          .then((stackId) => {
            return knex('users').insert(
              {
                name: 'jon snow',
                email: 'jon@knownothing.com',
                stack_id: stackId[0],
                points: 0
              }
            )
          })
      ])
    })
    .catch(error => {
      console.log(`Error seeding data: ${error}`);
    })
};
