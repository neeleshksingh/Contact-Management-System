const express = require('express')
const contact = require('../model/contact')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post("/", async(req,res)=>{
    console.log(req.body);
    try{
        const {firstName, lastName, email, phone } = req.body
        if(firstName && lastName && email && phone){
            const data = await contact.create({firstName, lastName, email, phone })
            return res.status(201).json({
                status: "Success",
                data
            })
        }
        else{
            return res.status(400).json({
                message: "all fields required"
            })
        }
    } catch(e){
        res.status(400).json({
            status: "failed",
            message : e.message
        })
    }
})

router.get("/", async(req,res)=>{
    try{
        const data = await contact.find()
        return res.status(202).json({
            status: "Success",
            data
        })
    } catch(e){
        res.status(404).json({
            message: e.message
        })
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const data = await contact.findOne({_id:req.params.id})
        if(data){
            return res.status(200).json({
                status: "success",
                message: data
            })
        } 
        else{
            return res.status(404).json({
                message: "There is no contact with that id"
            })
        }
    }catch(e){
        res.status(404).json({
            message: e.message
        })
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const data = await contact.findOne({_id:req.params.id})
        if(data){
            const deleted = await contact.deleteOne({_id: req.params.id})
            return res.status(204).json({
                status: "success",
                message : "deleted"
            })
        }
        else{
            return res.status(400).json({
                message : error.message
            })
        }
    } catch(e){
        res.status(404).json({
            message : e.message
        })
    }
})

router.put("/:id", async(req,res)=>{
    try{
        const data = await contact.findOne({_id:req.params.id})
        if(data){
            const update = await contact.updateOne({_id:req.params.id}, {...req.body})
            return res.status(204).json({
                status: "success",
                message: "update",
                update
            })
        }
        else{
            return res.status(404).json({
                message: "There is no contact with that id"
            })
        }
    } catch(e){
        res.status(404).json({
            message : e.message
        })
    }
})

module.exports = router