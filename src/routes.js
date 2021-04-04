const express = require('express');
const routes = express.Router();
const viewsPath = __dirname + '/views/';

const Profile = { 
  data: {
    'name': 'Lucas Becker',
    'avatar': 'https://github.com/lucasbecker.png',
    'monthly-budget': 3000,
    'hours-per-day': 5,
    'days-per-week': 8,
    'vacation-per-year': 4,
    'value-hour': 75
  },
  controllers: {
    index(req, res) {
      return res.render(viewsPath + 'profile.ejs', { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body;

      const weekPerYear = 52;
      const weekPerMonth = (weekPerYear - data['vacation-per-year']) / 12;
      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
      const monthlyTotalHours = weekTotalHours * weekPerMonth;
      data['value-hour'] = data['monthly-budget'] / monthlyTotalHours;

      Profile.data = data;

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
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
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map( job => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
        const budget = Job.services.calculateBudget(Profile.data['value-hour'], job);
    
        return {
          ...job,
          remaining,
          status,
          budget
        };
      });
      
      return res.render(viewsPath + 'index.ejs', { jobs: updatedJobs });
    },
    create(req, res) {
      return res.render(viewsPath + 'job.ejs')
    },
    save(req, res) {
      const job = req.body;
      const jobId = Job.data[Job.data.length - 1]?.id || 0;
      const createdAt = Date.now();
    
      Job.data.push({
        'id': jobId + 1,
        'name': job['name'],
        'daily-hours': job['daily-hours'],
        'total-hours': job['total-hours'],
        'created-at': createdAt
      });
    
      return res.redirect('/');
    },
    show(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job) return res.send('Job not found!');
      
      job.budget = Job.services.calculateBudget(Profile.data['value-hour'], job);

      return res.render(viewsPath + 'job-edit.ejs', { job });
    },
    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => Number(job.id) === Number(jobId));

      if(!job) return res.send('Job not found!');
      
      const updatedJob = {
        ...job,
        'name': req.body['name'],
        'total-hours': req.body['total-hours'],
        'daily-hours': req.body['daily-hours'],
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) job = updatedJob;
        return job;
      })

      res.redirect('/job/' + jobId);
      
    },
    delete(req, res) {
      const jobId = req.params.id;
      
      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

      return res.redirect('/');
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
      const createdDate = new Date(job['created-at']);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDate = createdDate.setDate(dueDay);
    
      const timeDiffInMs = dueDate - Date.now();
      const daysInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / daysInMs);
    
      return dayDiff;
    },
    calculateBudget(valueHour, job) {
      return valueHour * job['total-hours'];
    }
  }
}


routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);


module.exports = routes;