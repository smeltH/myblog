const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
router.post('/register',(req,res)=>{
  console.log(req.body)
})
module.exports = router













