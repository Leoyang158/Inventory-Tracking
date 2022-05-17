const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('info/about')
})

module.exports = router;