const express = require("express")
const itemRouter = express.Router()
const { ItemModel } = require("../models/item.model")


const itemGet = async (req, res) => {
    try {
        const items = await ItemModel.find()
        res.json(items)

    } catch (error) {
        res.json(error)
    }

}


//POST=============================================>
const itemPost = async (req, res) => {
    const payload = req.body
    try {
        const data = new ItemModel(payload)
        await data.save()
        res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
}

//PATCH=====================================================>
const itemUpdate = async (req, res) => {
    const itemId = req.params.itemId
    const payload = req.body
    const item = await ItemModel.findOne({ _id: itemId })
    try {
        const data = await ItemModel.findByIdAndUpdate({ _id: item }, payload)
        res.send("Data Updated Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
}

//DELETE====================================================>
const itemDelete = async (req, res) => {
    const itemId = req.params.itemId
    const item = await ItemModel.findOne({ _id: itemId })
    try {
        await ItemModel.findByIdAndDelete({ _id: item })
        res.send({ "msg": "Deleted successfully" })
    } catch (error) {
        console.log(Error)
        res.send("error in Delete")
    }


}



module.exports = {
    itemGet,
    itemPost,
    itemUpdate,
    itemDelete,

}