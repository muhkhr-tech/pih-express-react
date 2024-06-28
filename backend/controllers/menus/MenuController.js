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
            active: true
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all menu successfully.",
        data: menus
    })
}

module.exports = {
    findMenus
}