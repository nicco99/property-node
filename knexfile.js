// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgres",
    connection:
      "postgres://owmsyhqj:qrfQaOgg809_lozA057nMZz6spCDdf94@mahmud.db.elephantsql.com/owmsyhqj",
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
    seeds: {
      directory: __dirname + "/knex/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection:
      "postgres://owmsyhqj:qrfQaOgg809_lozA057nMZz6spCDdf94@mahmud.db.elephantsql.com/owmsyhqj",
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
    seeds: {
      directory: __dirname + "/knex/seeds",
    },
  },
};
