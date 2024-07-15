const { validationResult } = require('express-validator')
const prisma = require('../../prisma/client')
const slugify = require('slugify')

const findStores = async (req, res) => {

    const stores = await prisma.store.findMany({
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
        message: "Get all store successfully.",
        data: stores
    })
}

const findStoreById = async (req, res) => {
    const { id } = req.params

    const store = await prisma.store.findUnique({
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
        message: `Get store by ID ${id} successfully.`,
        data: store
    })
}

const createStore = async (req, res) => {
    try {
        const store = await prisma.store.create({
            data: {
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                slug: slugify(req.body.name+req.body.phone+req.body.address)
            }
        })

        res.status(201).send({
            success: true,
            message: "Store created successfully.",
            data: store
        })
    } catch (error) {
        if (error.code == 'P2002') {
            res.status(200).send({
                success: true,
                message: "Store created successfully."
            })
        } else {
            res.status(500).send({
                success: false,
                message: "Internal server error."
            })
        }
    }
}

module.exports = {
    findStores,
    findStoreById,
    createStore
}