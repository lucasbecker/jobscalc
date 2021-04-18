const Profile = require('../models/Profile');

module.exports = {
  async index(req, res) {
    return res.render('profile.ejs', { profile: await Profile.get() })
  },
  async update(req, res) {
    const data = req.body;

    const weekPerYear = 52;
    const weekPerMonth = (weekPerYear - data['vacation-per-year']) / 12;
    const weekTotalHours = data['hours-per-day'] * data['days-per-week'];
    const monthlyTotalHours = weekTotalHours * weekPerMonth;
    const valueHour = data['monthly-budget'] / monthlyTotalHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...data,
      'value-hour': valueHour
    });

    return res.redirect('/profile');
  }
}