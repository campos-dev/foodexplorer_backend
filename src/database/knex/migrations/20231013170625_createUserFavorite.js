exports.up = (knex) =>
  knex.schema.createTable("userFavorite", (table) => {
    table.increments("id");
    table.text("title");
    table
      .integer("dishes_id")
      .references("id")
      .inTable("dishes")
      .onDelete("cascade");
    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("userFavorite");
