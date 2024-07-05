const { validationResult } = require('express-validator')
const prisma = require('../../prisma/client')

const findSales = async (req, res) => {
    const sales = await prisma.sale.findMany({
        select: {
            id: true,
            saleDate: true,
            description: true,
            customerName: true,
            customerPhone: true,
            customerAddress: true,
            ongkir: true,
            price: true,
            menus: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all sales successfully.",
        data: sales
    })
}

const createSale = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    const menus =  req.body.menus

    await prisma.sale.create({
        data: {
            saleDate: new Date(req.body.saleDate),
            description: req.body.description,
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerAddress: req.body.customerAddress,
            ongkir: Number(req.body.ongkir),
            price: Number(req.body.price),
            menus: {
                create: menus
            }
        }
    })

    res.status(201).send({
        success: true,
        message: "Item inserted to chart successfully.",
        data: menus
    })
}

module.exports = {
    findSales,
    createSale
}