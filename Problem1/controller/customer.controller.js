const express = require("express")
const customerRouter = express.Router()
const { customerModel } = require("../models/item.model")


//Get ALL ==============================================>

const customerGet = async (req, res) => {
    try {
        const customers = await customerModel.find()
        res.json(customers)

    } catch (error) {
        res.json(error)
    }

}


//POST=============================================>
const customerPost = async (req, res) => {
    const payload = req.body
    try {
        const data = new customerModel(payload)
        await data.save()
        res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
}

//PATCH=====================================================>
const customerUpdate = async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const item = await customerModel.findOne({ _id: id })
    try {
        const data = await customerModel.findByIdAndUpdate({ _id: item }, payload)
        res.send("Data Updated Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
}

//DELETE====================================================>
const customerDelete = async (req, res) => {
    const id = req.params.id
    const item = await customerModel.findOne({ _id: id })
    try {
        await customerModel.findByIdAndDelete({ _id: item })
        res.send({ "msg": "Deleted successfully" })
    } catch (error) {
        console.log(Error)
        res.send("error in Delete")
    }


}



module.exports = {
   customerGet,
   customerPost, 
   customerUpdate, 
   customerDelete

}