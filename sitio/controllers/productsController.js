const dbProduct = require('../data/database'); //requiero la base de datos de productos
const dbCategories = require('../data/dbCategories');

const fs = require('fs');
const path = require('path');
const { resourceUsage } = require('process');

module.exports = { //exporto un objeto literal con todos los metodos
    listar: function(req, res) {
        res.render('products', {
                title: "Todos los Productos",
                productos: dbProduct
            }) //muestra información de prueba
    },
    search:function(req,res){
        let buscar = req.query.search;
        let resultados=[];
        dbProduct.forEach(producto=>{
            if(producto.name.toLowerCase().includes(buscar.toLowerCase())){
                resultados.push(producto)
            }
        })
        res.render('products',{
            title:"Resultado de la busqueda",
            productos:resultados
        })
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
    publicar:function(req,res,next){
        
        let lastID = 1;

        dbProduct.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })

        let newProduct ={
            id: lastID + 1,
            name: req.body.name.trim(),
            price:Number(req.body.price),
            discount:Number(req.body.discount),
            category:req.body.category.trim(),
            description:req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png"
        }

        dbProduct.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..",'data',"productsDataBase.json"),JSON.stringify(dbProduct),'utf-8')
        
        res.redirect('/products')
    },
    show:function(req,res){
        let idProducto = req.params.id;
        let resultado = dbProduct.filter(producto =>{
            return producto.id == idProducto
        })
        res.render('productShow',{
            title: "Ver/Editar Producto",
            producto: resultado[0],
            total: dbProduct.length,
            categorias:dbCategories
        })
    }
}