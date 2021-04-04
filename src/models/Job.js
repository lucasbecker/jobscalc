let data = [
  {
    'id': 1,
    'name': 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 1,
    'created-at': Date.now(),
  },
  {
    'id': 2,
    'name': 'OneTwo Project',
    'daily-hours': 3,
    'total-hours': 47,
    'created-at': Date.now(),
  }
];

module.exports = {
  get() {
    return data;
  },
  add(newJob) {
    data.push(newJob);
  },
  update(id, updatedJob) {
    data = data.map(job => {
      if(Number(job.id) === Number(id)) job = updatedJob;
      return job;
    });
  },
  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id));
  }
}