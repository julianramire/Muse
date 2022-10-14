const User = require('./User');
const AI = require('./AI');

User.hasMany(AI, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

AI.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, AI };
