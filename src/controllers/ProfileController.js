const Profile = require('../models/Profile');

module.exports = {
  index(req, res) {
    return res.render('profile.ejs', { profile: Profile.get() })
  },
  update(req, res) {
    const data = req.body;

    const weekPerYear = 52;
    const weekPerMonth = (weekPerYear - data['vacation-per-year']) / 12;
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
    const monthlyTotalHours = weekTotalHours * weekPerMonth;
    const valueHour = data['monthly-budget'] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      'value-hour': valueHour
    });

    return res.redirect('/profile');
  }
}