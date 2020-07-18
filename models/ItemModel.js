const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  item: {
    type: String,
    required: true,
  },

  borrower_name: {
    type: String,
    required: true,
  },

  date_lent: {
    type: Date,
    default: Date.now,
  },

  borrower_email: {
    type: String,
    required: true,
  },

  borrower_phone: {
    type: String,
  },

  borrower_relationship: {
    type: String,
    default: 'Friend',
  },

  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('items', ItemSchema);
