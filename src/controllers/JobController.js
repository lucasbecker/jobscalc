const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../models/Profile');

module.exports = {
  create(req, res) {
    return res.render('job.ejs')
  },
  save(req, res) {
    const job = req.body;
    const jobs = Job.get();
    const jobId = jobs[jobs.length - 1]?.id || 0;
    const createdAt = Date.now();
  
    Job.add({
      'id': jobId + 1,
      'name': job['name'],
      'daily-hours': job['daily-hours'],
      'total-hours': job['total-hours'],
      'created-at': createdAt
    });
  
    return res.redirect('/');
  },
  show(req, res) {
    const profile = Profile.get();
    const jobs = Job.get();
  
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if(!job) return res.send('Job not found!');
    
    job['budget'] = JobUtils.calculateBudget(profile['value-hour'], job);

    return res.render('job-edit.ejs', { job });
  },
  update(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;
    const job = jobs.find(job => Number(job.id) === Number(jobId));

    if(!job) return res.send('Job not found!');
    
    const updatedJob = {
      ...job,
      'name': req.body['name'],
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours'],
    }

    Job.update(jobId, updatedJob);

    return res.redirect('/job/' + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;
    
    Job.delete(jobId);

    return res.redirect('/');
  }
};