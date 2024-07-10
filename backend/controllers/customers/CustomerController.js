const { validationResult } = require('express-validator')
const prisma = require('../../prisma/client')
const slugify = require('slugify')

const findCustomers = async (req, res) => {

    const customers = await prisma.customer.findMany({
        where: {
            active: true
        },
        select: {
            id: true,
            name: true,
            phone: true,
            address: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all customer successfully.",
        data: customers
    })
}

const findCustomerById = async (req, res) => {
    const { id } = req.params

    const customer = await prisma.customer.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            phone: true,
            address: true
        }
    })

    res.status(200).send({
        success: true,
        message: `Get customer by ID ${id} successfully.`,
        data: customer
    })
}

const createCustomer = async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                slug: slugify(req.body.name+req.body.phone+req.body.address)
            }
        })

        res.status(201).send({
            success: true,
            message: "Customer created successfully.",
            data: customer
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    findCustomers,
    findCustomerById,
    createCustomer
}