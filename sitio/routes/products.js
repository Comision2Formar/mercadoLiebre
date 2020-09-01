const express = require('express'); //requiero express
const router = express.Router(); //requiero el método Router

const controller = require('../controllers/productsController') //requiero el controlador que se hará cargo de la lógica

const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage})


router.get('/', controller.listar) //construyo la ruta que me visualizará información de prueba
router.get('/search',controller.search);
router.get('/detail/:id',controller.detalle);

router.get('/add',controller.agregar);
router.get('/add/form',controller.agregar);
router.post('/add/form',upload.any(),controller.publicar);

router.get('/show/:id',controller.show);
router.put('/edit/:id',upload.any(),controller.actualizar);
router.delete('/delete/:id',controller.eliminar);

module.exports = router //exporto router