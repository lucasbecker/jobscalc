const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../models/Profile');

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours = 0;
  
    const updatedJobs = jobs.map( job => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';
      const budget = JobUtils.calculateBudget(profile['value-hour'], job);

      statusCount[status] += 1;
      if(status === 'progress') jobTotalHours += Number(job['daily-hours']);
  
      return {
        ...job,
        remaining,
        status,
        budget
      };
    });

    const freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render('index.ejs', { 
      jobs: updatedJobs, 
      profile: profile, 
      status: statusCount,
      freeHours: freeHours });
  }
};