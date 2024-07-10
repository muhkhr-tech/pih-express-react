const prisma = require('../../prisma/client')

const findMaterials = async (req, res) => {
    const { search } = req.query

    let materials = []

    if (search) {
        materials = await prisma.material.findMany({
            where: {
                name: {
                    contains: search
                    
                }
            },
            select: {
                id: true,
                name: true,
                price: true,
                unit: true,
            }
        })
    } else {
        materials = await prisma.material.findMany({
            take: 8,
            select: {
                id: true,
                name: true,
                price: true,
                unit: true,
            }
        })
    }

    res.status(200).send({
        success: true,
        message: "Get all materials successfully.",
        data: materials
    })
}

module.exports = {
    findMaterials
}