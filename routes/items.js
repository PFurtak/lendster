const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Item = require('../models/ItemModel');

// GET route for api/items
// Get all users lent items
// Private access
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST route for api/items
// Add item
// Private access
router.post(
  '/',
  [auth, [check('item_name', 'Name of item is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      item_name,
      borrower_name,
      date_lent,
      borrower_email,
      borrower_phone,
      borrower_relationship,
    } = req.body;
    try {
      const newItem = new Item({
        item_name,
        borrower_name,
        date_lent,
        borrower_email,
        borrower_phone,
        borrower_relationship,
        user: req.user.id,
      });
      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// PUT route for api/items/:id
// update items
// Private access
router.put('/:id', auth, async (req, res) => {
  const {
    item_name,
    borrower_name,
    date_lent,
    borrower_email,
    borrower_phone,
    borrower_relationship,
  } = req.body;

  const itemFields = {};
  if (item_name) itemFields.item_name = item_name;
  if (borrower_name) itemFields.borrower_name = borrower_name;
  if (date_lent) itemFields.date_lent = date_lent;
  if (borrower_email) itemFields.borrower_email = borrower_email;
  if (borrower_phone) itemFields.borrower_phone = borrower_phone;
  if (borrower_relationship)
    itemFields.borrower_relationship = borrower_relationship;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized.' });
    }
    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE route for api/items/:id
// delete item
// Private access
router.delete('/:id', auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized.' });
    }
    await Item.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Item removed.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
