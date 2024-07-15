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
        },
        orderBy: {
            saleDate: 'desc'
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all sales successfully.",
        data: sales
    })
}

const findSaleById = async (req, res) => {
    const { id } = req.params

    const sales = await prisma.sale.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            saleDate: true,
            description: true,
            customerName: true,
            customerPhone: true,
            customerAddress: true,
            price: true,
            ongkir: true,
            createdAt: true,
            menus: {
                select: {
                    price: true, 
                    amount: true,
                    unit: true,
                    menu: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all sales successfully.",
        data: sales
    })
}

const findTotalSales = async (req, res) => {
    const sales = await prisma.$queryRaw`SELECT saleDate, SUM(price) as total FROM sales GROUP BY saleDate ORDER BY saleDate DESC`
    
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
    findSaleById,
    findTotalSales,
    createSale
}