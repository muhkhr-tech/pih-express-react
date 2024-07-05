const { validationResult } = require('express-validator')
const prisma = require('../../prisma/client')

const findPurchases = async (req, res) => {
    const purchases = await prisma.purchase.findMany({
        select: {
            id: true,
            purchaseDate: true,
            description: true,
            storeName: true,
            storePhone: true,
            storeAddress: true,
            price: true,
            materials: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all purchases successfully.",
        data: purchases
    })
}

const findPurchaseById = async (req, res) => {
    const { id } = req.params

    const purchases = await prisma.purchase.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            purchaseDate: true,
            description: true,
            storeName: true,
            storePhone: true,
            storeAddress: true,
            price: true,
            materials: true,
            createdAt: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all purchases successfully.",
        data: purchases
    })
}

const createPurchase = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }
    
    const materials =  req.body.materials
    
    await prisma.purchase.create({
        data: {
            purchaseDate: new Date(req.body.purchaseDate),
            description: req.body.description,
            storeName: req.body.storeName,
            storePhone: req.body.storePhone,
            storeAddress: req.body.storeAddress,
            price: Number(req.body.price),
            materials: {
                create: materials
            }
        }
    })

    res.status(201).send({
        success: true,
        message: "Item inserted to chart successfully.",
        data: materials
    })
}

module.exports = {
    findPurchases,
    findPurchaseById,
    createPurchase
}