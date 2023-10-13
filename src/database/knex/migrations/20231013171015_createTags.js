exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table
      .integer("dishes_id")
      .references("id")
      .inTable("dishes")
      .onDelete("cascade");
    table.text("name").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("tags");
