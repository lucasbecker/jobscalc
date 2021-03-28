const express = require('express');
const routes = express.Router();
const viewsPath = __dirname + '/views/';

const profile = { 
  'name': 'Lucas Becker',
  'avatar': 'https://avatars.githubusercontent.com/u/15279481',
  'monthly-budget': 3000,
  'hours-per-day': 5,
  'days-per-week': 8,
  'vacation-per-year': 4,
}

routes.get('/', (req, res) => 
  res.render(viewsPath + 'index.ejs'));
routes.get('/job', (req, res) => 
  res.render(viewsPath + 'job.ejs'));
routes.get('/job/edit', (req, res) => 
  res.render(viewsPath + 'job-edit.ejs'));
routes.get('/profile', (req, res) => 
  res.render(viewsPath + 'profile.ejs', {profile}));

module.exports = routes;