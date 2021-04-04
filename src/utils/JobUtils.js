module.exports = {
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