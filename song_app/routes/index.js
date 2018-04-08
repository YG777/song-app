const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const search = require('../controllers/search');

router.route('/').get(home);
router.route('/search').get(search.searchForm);
router.route('/search/results').get(search.search);

module.exports = router;

