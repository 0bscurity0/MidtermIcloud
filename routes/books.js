const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Book Manager - skeleton'));

module.exports = router;