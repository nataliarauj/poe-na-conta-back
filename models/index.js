const User = require('./User');
const Transaction = require('./Transaction');
const ViewBalance = require('./ViewBalance');
const ViewCategory = require('./ViewCategory');
const ViewDebtsNGains = require('./ViewDebtsNGains');
const ViewCount = require('./ViewCount');

// Define o relacionamento: um usuário pode ter muitas transações
User.hasMany(Transaction, { foreignKey: 'client_id' });

// Define o relacionamento inverso: uma transação pertence a um único usuário
Transaction.belongsTo(User, { foreignKey: 'client_id' });

module.exports = {
  User,
  Transaction,
  ViewBalance,
  ViewCategory,
  ViewDebtsNGains,
  ViewCount
};
