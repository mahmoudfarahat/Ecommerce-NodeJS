const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');


module.exports = {
    requireEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Must be a valid email')
        .custom(async (email) => {
            const existingUser = await usersRepo.getOneBy({ email: email })
            if (existingUser) {
                throw new Error('Email in use');
            }
        }),
    requirePassword: check('password').trim().isLength({ min: 4, max: 20 }),

    requirePasswordConfirmation: check('passwordConfirmation').trim().isLength({ min: 4, max: 20 })
        .withMessage('Must be between 4 and 20 characters')
        .custom((passwordConfirmation, { password }) => {
            if (password !== passwordConfirmation) {
                throw new Error('Passwords must Match');
            }


        })
    ,

    requireVaildEmail: check('email').trim().normalizeEmail().isEmail().withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('Email not Found')
            }
        }),
    requireVaildPassword: check('password').trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email })
            const validPassword = await usersRepo.comparePasswords(user.password, password)
            if (!validPassword) {
                throw new Error('Invalid password')
            }
        })
}