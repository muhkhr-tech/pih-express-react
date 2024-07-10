const { validationResult } = require('express-validator')
const prisma = require('../../prisma/client')

const findMenus = async (req, res) => {

    const menus = await prisma.menu.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            active: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all menu successfully.",
        data: menus
    })
}

const findMenuById = async (req, res) => {
    const { id } = req.params

    const menus = await prisma.menu.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            name: true,
            price: true,
            description: true
        }
    })

    res.status(200).send({
        success: true,
        message: `Get menu by ID ${id} successfully.`,
        data: menus
    })
}

const createMenu = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    try {
        const menu = await prisma.menu.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price)
            }
        })

        res.status(201).send({
            success: true,
            message: "Menu created successfully.",
            data: menu
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error."
        })
    }
}

const updateMenu = async (req, res) => {
    const { id } = req.params

    try {
        const menu = await prisma.menu.update({
            where: {
                id: Number(id)
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price)
            }
        })

        res.status(200).send({
            success: true,
            message: "Menu updated successfully.",
            data: menu
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error."
        })
    }
}

const changeStatusMenu = async (req, res) => {
    const { id } = req.params

    try {
        const getMenu = await prisma.menu.findUnique({where: {id: Number(id)}})

        const menu = await prisma.menu.update({
            where: {
                id: Number(id)
            },
            data: {
                active: !getMenu.active
            }
        })

        res.status(200).send({
            success: true,
            message: "Menu changed status successfully.",
            data: menu
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error."
        })
    }
}

const deleteMenu = async (req, res) => {
    const { id } = req.params

    try {
        const menu = await prisma.menu.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).send({
            success: true,
            message: "Menu deleted successfully.",
            data: menu
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    findMenus,
    findMenuById, 
    createMenu,
    updateMenu,
    changeStatusMenu,
    deleteMenu
}