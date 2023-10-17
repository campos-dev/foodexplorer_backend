exports.up = (knex) =>
  knex.schema.createTable("userCart", (table) => {
    table.increments("id");
    table.integer("dishes_id").references("id").inTable("dishes");
    table.integer("user_id").references("id").inTable("users");
    table.text("title");
    table.integer("amount").notNullable();
    table.text("status");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("userCart");
