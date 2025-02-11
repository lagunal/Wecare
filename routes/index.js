var express = require('express');


var router = express.Router();


router.all('*', async function(req, res) {
  res.status(404).json({
    message: 'Invalid path',
  });
});

module.exports = router;
