const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../models/Profile');

module.exports = {
  create(req, res) {
    return res.render('job.ejs')
  },
  async save(req, res) {
    const job = req.body;
    const createdAt = Date.now();
  
    await Job.add({
      'name': job['name'],
      'daily-hours': job['daily-hours'],
      'total-hours': job['total-hours'],
      'created-at': createdAt
    });
  
    return res.redirect('/');
  },
  async show(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();
  
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if(!job) return res.send('Job not found!');
    
    job['budget'] = JobUtils.calculateBudget(profile['value-hour'], job);

    return res.render('job-edit.ejs', { job });
  },
  async update(req, res) {
    const jobId = req.params.id;
    
    const updatedJob = {
      'name': req.body['name'],
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours'],
    }

    await Job.update(jobId, updatedJob);

    return res.redirect('/job/' + jobId);
  },
  async delete(req, res) {
    const jobId = req.params.id;
    
    await Job.delete(jobId);

    return res.redirect('/');
  }
};