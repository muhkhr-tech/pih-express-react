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
        },
        orderBy: {
            purchaseDate: 'desc'
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
            createdAt: true,
            materials: {
                select: {
                    price: true,
                    amount: true,
                    unit: true,
                    material: {
                        select: {
                            name: true,
                            unit: true,
                            price: true
                        }
                    }
                }
            }
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all purchases successfully.",
        data: purchases
    })
}

const findTotalPurchases = async (req, res) => {
    const purchases = await prisma.$queryRaw`SELECT purchaseDate, SUM(price) as total FROM purchases GROUP BY purchaseDate ORDER BY purchaseDate DESC`
    
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
    findTotalPurchases,
    createPurchase
}