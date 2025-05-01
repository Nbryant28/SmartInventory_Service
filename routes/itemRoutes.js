const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post('/', auth, async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
