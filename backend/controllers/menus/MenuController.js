const prisma = require('../../prisma/client')

const findMenus = async (req, res) => {

    const menus = await prisma.menu.findMany({
        where: {
            active: true
        },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            image:true,
            active: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all menu successfully.",
        data: menus
    })
}

const findImageMenu = async (req, res) => {
    const { id } = req.params

    const menu = await prisma.menu.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            image: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all menu successfully.",
        data: menu
    })
}

module.exports = {
    findMenus,
    findImageMenu
}