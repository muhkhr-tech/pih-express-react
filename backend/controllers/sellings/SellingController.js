const prisma = require('../../prisma/client')

const findSellings = async (req, res) => {
    const sellings = await prisma.selling.findMany({
        select: {
            id: true,
            description: true,
            customerName: true,
            customerPhone: true,
            customerAddress: true,
            ongkir: true,
            menus: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all sellings successfully.",
        data: sellings
    })
}

const createSelling = async (req, res) => {
    const menus =  req.body.menus

    await prisma.selling.create({
        data: {
            sellingDate: new Date(req.body.sellingDate),
            description: req.body.description,
            customerName: req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerAddress: req.body.customerAddress,
            ongkir: Number(req.body.ongkir),
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
    findSellings,
    createSelling
}