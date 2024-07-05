const { body } = require('express-validator')
const prisma = require('../../prisma/client')

const validatePurchase = [
    body('purchaseDate')
        .notEmpty().withMessage('Tanggal pembelian tidak boleh kosong!')
        .isDate().withMessage('Format tanggal salah!'),
    body('storeName').notEmpty().withMessage('Nama toko tidak boleh kosong!'),
    body('materials')
        .custom(async (value) => {
            if (value.length == 0) {
                throw new Error('Harus minimal memilih satu barang!')
            }
        })
]

module.exports = {
    validatePurchase
}