exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.text("avatar").notNullable();
    table.text("title").notNullable();
    table.text("category");
    table.text("description").notNullable();
    table.decimal("price").notNullable();
  });

exports.down = (knex) => knex.schema.dropTable("dishes");
