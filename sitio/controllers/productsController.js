const dbProduct = require('../data/database'); //requiero la base de datos de productos
const dbCategories = require('../data/dbCategories');

const fs = require('fs');
const path = require('path');

module.exports = { //exporto un objeto literal con todos los metodos
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los Productos",
                productos: dbProduct
            }) //muestra información de prueba
    },

    detalle:function(req,res){
        let id = req.params.id;
        let producto = dbProduct.filter(producto=>{
            return producto.id == id
        })
        console.log(producto)
        res.render('productDetail',{
            title:"Detalle del Producto",
            producto:producto[0]
        })
    },
    agregar:function(req,res){
        let categoria;
        let sub;
        if(req.query.categoria){
            categoria = req.query.categoria;
            sub = req.query.sub
        }
        res.render('productAdd',{
            title:"Agregar Producto",
            categorias:dbCategories,
            categoria:categoria,
            sub:sub
        })
    },
    publicar:function(req,res){
        
        let lastID = 1;

        dbProduct.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })

        let newProduct ={
            id: lastID + 1,
            name: req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category:req.body.category,
            description:req.body.description,
            image:"default-image.png"
        }

        dbProduct.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..",'data',"productsDataBase.json"),JSON.stringify(dbProduct),'utf-8')
        
        res.redirect('/products')
    }
}