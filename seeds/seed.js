const sequelize = require('../config/connection');

const { User, AI } = require('../models');


const userData = require('./userData.json');
const aiData = require('./aiData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const ai of aiData) {
    await AI.create({
      ...ai,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
