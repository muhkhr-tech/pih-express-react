const prisma = require('../../prisma/client')

const findMaterials = async (req, res) => {
    const materials = await prisma.material.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            unit: true,
        }
    })

    res.status(200).send({
        success: true,
        message: "Get all materials successfully.",
        data: materials
    })
}

const createMaterial = async (req, res) => {
    await prisma.material.create({
        data: {
            name: req.body.name,
            price: Number(req.body.price),
            unit: req.body.unit
        }
    })

    res.status(201).send({
        success: true,
        message: "Material created successfully.",
        data: []
    })
}

module.exports = {
    findMaterials,
    createMaterial
}