const Database = require('./config');

const initDatabase = {
  async init() {
    const database = await Database();

    await database.exec(`
      CREATE TABLE profile(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
      );
    `);

    await database.exec(`
      CREATE TABLE jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      );
    `);

    await database.run(`
      INSERT INTO profile(
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
      ) VALUES (
        "Lucas Becker",
        "https://github.com/lucasbecker.png",
        3000,
        5,
        5,
        4,
        70
      );
    `);

    await database.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Project One",
        2,
        1,
        1617514376018
      );
    `)

    await database.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Project Two",
        3,
        47,
        1617514376018
      );
    `);

    await database.close();
  }
}

initDatabase.init();