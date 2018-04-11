const mockDecks = require('../../../mockData/decks.js');
const mockWords = require('../../../mockData/words.js');

const categories = {
  'Basics 1': 1,
  'Basics 2': 2,
  'Food 1': 3,
  'Food 2': 4,
  'Verbs': 5
}

const createDeck = (knex, deck) => {
  const { category } = deck;

  return knex('stack').insert({
    category
  }).returning(['id', 'category'])
    .then((stack) => {
      const stackId = stack[0].id;
      const { category } = stack[0];
      const categoryId = categories[category];
      const wordPromises =[];

      mockWords.filter(word => word.stack_id === categoryId)
        .forEach(stackWord => {
          wordPromises.push(createWord(knex, stackWord, stackId));  
        })

      return Promise.all(wordPromises);
    })
};

const createWord = (knex, word, stackId) => {
  const { english, spanish, hint } = word;

  return knex('words').insert({
    english,
    spanish,
    hint,
    stack_id: stackId
  }, 'stack_id')
}

exports.seed = function(knex, Promise) {
  return knex('words').del()
    .then(() => knex('users').del())
    .then(() => knex('stack').del())
    .then(() => {
      let stackPromises = [];

      mockDecks.forEach(stack => {
        stackPromises.push(createDeck(knex, stack));
      })
      
      return Promise.all(stackPromises);
    })
     .then(stacks => {
      return knex('users').insert(
        {
          name: 'jon snow',
          email: 'jon@knownothing.com',
          stack_id: stacks[0][0][0],
          points: 0 
        }
      )
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
