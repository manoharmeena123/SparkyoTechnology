const express = require("express")
const deliveryRouter = express.Router()
const { deliveryModel } = require("../models/deliveryVehicles.model")


//Get ALL ==============================================>

const deliveryGet = async (req, res) => {
    try {
        const deliverys = await deliveryModel.find()
        res.json(deliverys)

    } catch (error) {
        res.json(error)
    }

}


//POST=============================================>
const deliveryPost = async (req, res) => {
    const payload = req.body
    try {
        const data = new deliveryModel(payload)
        await data.save()
        res.send("Data Posted Successfully")
    } catch (error) {
        console.log(error)
        res.send("error in Post")
    }
}

//PATCH=====================================================>
const deliveryUpdate = async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const delivery = await deliveryModel.findOne({ _id: id })
    try {
        const data = await deliveryModel.findByIdAndUpdate({ _id: delivery }, payload)
        res.send("Data Updated Successfully")
    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
}

//DELETE====================================================>
const deliveryDelete = async (req, res) => {
    const id = req.params.id
    const delivery = await deliveryModel.findOne({ _id: id })
    try {
        await deliveryModel.findByIdAndDelete({ _id: delivery })
        res.send({ "msg": "Deleted successfully" })
    } catch (error) {
        console.log(Error)
        res.send("error in Delete")
    }


}



module.exports = {
   deliveryGet,
   deliveryPost, 
   deliveryUpdate, 
   deliveryDelete

}