const express=require('express')
const route=require('../Routes/router')
const shorId=require('shortid')
const validator=require('validator')
const baseUrl='http://localhost:3000/'
const urlModel = require("../Models/urlModel");
const shortid = require('shortid')

const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

const createShortUrl=async function(req,res){
    res.setHeader("Access-Control-Allow-Origin","*")
    try{
    let body=req.body
    let data={}
    console.log(body)
   let obj=Object.keys(body)
   if(obj.length==0)return  res.status(400).send({status:false,message:'please enter longurl'})
   if(obj.length>1) return res.status(400).send({status:false,message:'please remove attributes other than longurl'})
   if(!obj.includes('longUrl')) return res.status(400).send({status:false,message:'longurl is required'})
   if(body.longUrl.trim()==""){
    return res
      .status(400)
      .send({ status: false, message: `longUrl cant be empty`});
  }
   let longUrl=body['longUrl']
   
  let x=await urlModel.findOne({"longUrl":body['longUrl']})
console.log(x)
if (!regex.test(longUrl.trim())) {
    return res
      .status(400)
      .send({ status: false, message: "please enter validUrl" });
  }

if(x) return res.status(200).send({ status: true, message: `shorturl for this url is already generated `,urlCode:x.urlCode});
  let urlcode=shortid.generate(longUrl)
  let shortUrl=baseUrl+urlcode.toLowerCase()
  data['urlCode']=urlcode.toLowerCase()
  data['longUrl']=longUrl.trim()
  data['shortUrl']=shortUrl
let createdata=await urlModel.create(data)
return res.status(201).send({status:true,message:'shorturl succesfully created',urlCode:data.urlCode})
    }
catch(err){
    return res.status(500).send({status:false,message:err.message})
}

}
module.exports.createShortUrl=createShortUrl


const getUrl=async function(req,res){
     res.setHeader("Access-Control-Allow-Origin","*")
     try{
        let urlCode=req.params['urlCode']
        if(!shortid.isValid(urlCode.trim())) return res.status(400).send({status:false,message:'please enter valid urlcode'})
        let y=await urlModel.findOne({'urlCode':urlCode})
        console.log(y)
        if(!y) return res.status(404).send({status:false,message:'url not found'})
        return res.status(302).redirect(y.longUrl)

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
module.exports.getUrl=getUrl