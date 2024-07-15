const { body } = require('express-validator')
const prisma = require('../../prisma/client')

const validateSale = [
    body('saleDate')
        .notEmpty().withMessage('Tanggal penjualan tidak boleh kosong!')
        .isDate().withMessage('Format tanggal salah!'),
]

module.exports = {
    validateSale
}