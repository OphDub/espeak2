
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.integer('points');
      table.integer('stack_id').unsigned();
      table.foreign('stack_id').references('stack.id')
    }),
    knex.schema.createTable('stack', (table) => {
      table.increments('id').primary();
      table.string('category');
    }),
    knex.schema.createTable('words', (table) => {
      table.increments('id').primary();
      table.string('english');
      table.string('spanish');
      table.string('hint');
      table.integer('stack_id').unsigned();
      table.foreign('stack_id').references('stack.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('words'),
    knex.schema.dropTable('stack')
  ]);
};
