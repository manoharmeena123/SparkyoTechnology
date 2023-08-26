const express = require("express")
const { OrderModel } = require("../models/order.model")


//Get ALL ==============================================>

const orderGet = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        res.json(orders)

    } catch (error) {
        res.json(error)
    }

}


//POST=============================================>
const orderPost = async (req, res) => {
    const payload = req.body
    try {
        const data = new OrderModel(payload)
        await data.save()
        res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
}

//PATCH=====================================================>
const orderUpdate = async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const order = await OrderModel.findOne({ _id: id })
    try {
        const data = await OrderModel.findByIdAndUpdate({ _id: order }, payload)
        res.send("Data Updated Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
}

//DELETE====================================================>
const orderDelete = async (req, res) => {
    const id = req.params.id
    const order = await OrderModel.findOne({ _id: id })
    try {
        await OrderModel.findByIdAndDelete({ _id: order })
        res.send({ "msg": "Deleted successfully" })
    } catch (error) {
        console.log(Error)
        res.send("error in Delete")
    }


}



module.exports = {
   orderGet,
   orderPost, 
   orderUpdate, 
   orderDelete

}