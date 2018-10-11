import schedule from 'node-schedule';
import {getAllUsers} from '../Models/userDAO';

export async function runSchedulers() {
  // try {
  //   let allUsers = await getAllUsers();
  //
  //   for (let i in allUsers) {
  //     if (allUsers.hasOwnProperty(i)) {
  //       let user = allUsers[i].toObject();
  //       console.log(user._id);
  //
  //       for (let j in user.active_games) {
  //         if (user.active_games.hasOwnProperty(j)) {
  //           console.log(user.active_games[j]);
  //         }
  //       }
  //     }
  //   }
  //
  // } catch (error) {
  //   console.log(error);
  // }

  // update portofolio values every weekday at 9:30 am
  let marketOpen = schedule.scheduleJob('30 09 * * 1-5', async () => {
    try {
      let allUsers = await getAllUsers();


    } catch (error) {
      console.log(error);
    }
  });

  // update portofolio values every weekday at 4:00 pm
  let marketClose = schedule.scheduleJob('00 16 * * 1-5', () => {
    console.log('wow!');
  });
};
