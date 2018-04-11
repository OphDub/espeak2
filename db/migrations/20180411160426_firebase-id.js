
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user', (table) => {
      table.string('firebase_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('user', (table) => {
      table.dropColumn('firebase_id');
    });
  ]);
};
