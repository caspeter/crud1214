'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) =>{
    table.increments();
    table.text('user').notNullable().defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
