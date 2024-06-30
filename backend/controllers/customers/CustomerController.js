const prisma = require('../../prisma/client')

const findCustomers = async (req, res) => {

    const customers = await prisma.customer.findMany({
        where: {
            active: true
        },
        select: {
            id: true,
            name: true,
            phone: true,
            address: true,
            active: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all customer successfully.",
        data: customers
    })
}

const createCustomer = async (req, res) => {

    const customers = await prisma.customer.create({
        data: {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address
        }
    })

    res.status(200).send({
        success: true,
        message: "Customer created successfully.",
        data: customers
    })
}

module.exports = {
    findCustomers,
    createCustomer
}