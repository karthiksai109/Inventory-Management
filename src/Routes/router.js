const express=require('express')
const router=express.Router()
const {createShortUrl,getUrl}=require('../Controllers/urlController')
router.post('/url/shorten',createShortUrl)
router.get('/:urlCode',getUrl)
module.exports=router