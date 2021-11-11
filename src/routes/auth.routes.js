const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { check } = require('express-validator')

/**
 * @api {get} /profile Perfil del usuario
 * @apiName Perfil
 * @apiDescription Perfil del usuario logueado
 * @apiGroup Data
 */
router.get('/profile', authController.profile)



/**
 * @api {post} /register Registro de usuarios
 * @apiName Registro
 * @apiGroup AUTH
 * @apiDescription Registro de usuarios usando los campos nombre, email, password
 * @apiParam {string} name Nombre del usuario que se registra
 * @apiParam {string} email Email del usuario que se registra
 * @apiParam {string} password Contraseña del usuario
 * @apiParamexample {json} Request-Example:
 *          {
 *              "name": "Pepito Pérez",
 *              "email": "pepitoperez@email.com",
 *              "password": "contraseña123"
 *          }
 * @apiPermission none
 * @apiSuccess {json} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 ok
 *  {
 *   "token": {
 *       "userData": {
 *           "name": "pepito",
 *           "email": "pepito@email.com",
 *           "password": "$2b$10$23wa3BPqzP5EFyX3KUqoweTkVEHEWhoOxD06vD82gXXsnsoCZksSO",
 *           "_id": "617c9660576a216f249b60f7",
 *           "__v": 0
 *       },
 *       "code": 200,
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2M5NjYwNTc2YTIxNmYyNDliNjBmNyIsImlhdCI6MTYzNTU1NDkxMiwiZXhwIjoxNjY3MDkwOTEyfQ.Bkp4ewlXqn3QyQWTFoc7wdHp_b5H67MYjo4N4M5lbWM"
 *   }
 *  }
 * @apiError (200) Error El email debe ser único
 * @apiErrorExample {json} Error-Response
 *  HTTP/1.1 200 ok
 *  {
 *      "token": {
 *          "index": 0,
 *          "code": 11000,
 *          "keyPattern": {
 *              "email": 1
 *          },
 *          "keyValue": {
 *              "email": "pepito@email.com"
 *          }
 *      }
 *  }
 * @apiError (200) Error El email es requerido
 * @apiErrorExample {json} Error-Response-Example
 *  HTTP/1.1 200 ok
 *  {
 *     "token": {
 *         "index": 0,
 *         "code": 11000,
 *         "keyPattern": {
 *             "email": 1
 *         },
 *         "keyValue": {
 *             "email": null
 *         }
 *     }
 *  }
 * @apiError (422) Data-Error Error en la validación de los datos
 * @apiErrorExample {json} Date-Error-Example
 * HTTP/1.1 422 unprocessable entry
 *  {
 *       "errors": [
 *           {
 *               "value": "P",
 *               "msg": "Nombre no válido, mínimo 2 caracteres, máximo 40 caracteres",
 *               "param": "name",
 *               "location": "body"
 *           },
 *           {
 *               "value": "pablo",
 *               "msg": "Email no válido",
 *               "param": "email",
 *               "location": "body"
 *           },
 *           {
 *               "value": "password",
 *               "msg": "Contraeña débil",
 *               "param": "password",
 *               "location": "body"
 *           }
 *       ]
 *  }
 */
router.post('/register', [
        //Mensajes personalizados
        check('name', 'Nombre no válido, mínimo 2 caracteres, máximo 40 caracteres').isLength({min: 2, max: 40}),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Contraeña débil').isStrongPassword(),
    ],
    // Va la función
    authController.register
)

/**
 * @api {post} /login Ingreso de usuarios
 * @apiName Login
 * @apiGroup AUTH
 * @apiDescription Ingreso de usuarios a la plataforma usando email y password
 * @apiParam {string} email Email del usuario que ingresa
 * @apiParam {string} password Contraseña del usuario
 * @apiSampleRequest https://mintic-c4g18.herokuapp.com/auth/login
 */
router.post('/login', authController.login)

module.exports = router