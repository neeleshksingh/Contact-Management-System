const express = require('express')
const contact = require('../model/contact')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post("/", async(req,res)=>{
    console.log(req.body);
    const {firstName, lastName, email, phone } = req.body
    try{
            const data = await contact.create({firstName, lastName, email, phone })
            return res.status(201).json({
                status: "Success",
                data
            })
    } catch(e){
        return res.status(400).json({
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

router.patch("/:id", async(req, res)=>{
    const {firstName, lastName, email, phone} = req.body
    const data = await contact.find({_id:req.params.id})
    if(data.length){
        try{
            const updatePartial = await contact.updateOne({_id:req.params.id}, {$set: {firstName, lastName, email, phone}})
            return res.status(204).json({
                data
            })
        } catch(e){
            return res.status(404).json({
                error : e.message
            })
        }
    }
    else{
        return res.status(404).json({
            error : "There is no contact with that id"
        })
    }
})

module.exports = router