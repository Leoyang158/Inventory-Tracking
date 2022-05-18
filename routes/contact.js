const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>{
    res.render('Info/contact')
})

module.exports = router;