import schedule from 'node-schedule';

export function runHistoryScheduler() {
  // update portofolio values every weekday at 9:30 am
  let marketOpen = schedule.scheduleJob('30 09 * * 1-5', () => {
    console.log('wow!');
  });

  // update portofolio values every weekday at 4:00 pm
  let marketClose = schedule.scheduleJob('00 16 * * 1-5', () => {
    console.log('wow!');
  });
};
