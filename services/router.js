const uri = require('../services/axios.js');
const express = require('express');
const router = new express.Router();

router.route('/uri/:uri?/:string?')
 .get(uri.get);
module.exports = router;