var express = require('express');
var router = express.Router();

/* GET API status. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'School Management API is running',
    status: 'ok'
  });
});

module.exports = router;
