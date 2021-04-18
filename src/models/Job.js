const Database = require('../database/config');

module.exports = {
  async get() {
    const database = await Database();

    const data = await database.all('SELECT * FROM jobs');

    await database.close();

    return data.map( job => ({
      'id': job.id,
      'name': job.name,
      'daily-hours': job.daily_hours,
      'total-hours': job.total_hours,
      'created-at': job.created_at  
    }));
  },
  async add(newJob) {
    const database = await Database();

    await database.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "${newJob['name']}",
        ${newJob['daily-hours']},
        ${newJob['total-hours']},
        ${newJob['created-at']}
      )
    `)

    await database.close();
  },
  async update(id, updatedJob) {
    const database = await Database();

    await database.run(`
      UPDATE jobs SET 
      name = "${updatedJob['name']}",
      daily_hours = ${updatedJob['daily-hours']},
      total_hours = ${updatedJob['total-hours']}
      WHERE id = ${id}
    `);

    await database.close();
  },
  async delete(id) {
    const database = await Database();

    await database.run(`DELETE FROM jobs WHERE id = ${id}`);

    await database.close();
  }
}