const dbUsers = require('../data/dbUsers');

const {check,validationResult,body} = require('express-validator');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .isEmpty()
    .withMessage('Debes ingresar una constraseña'),

    body('email')
    .custom(function(value){
        dbUsers.forEach(user => {
            if(user.email != value){
                result = false
            }
        });
        if(result == false){
            return false
        }else{
            return true
        }
    })
    .withMessage('El usuario no está regisrado')
]