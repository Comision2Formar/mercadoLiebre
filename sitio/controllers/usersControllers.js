const dbProducts = require('../data/database');
const dbUsers = require('../data/dbUsers');

const {validationResult, body} = require('express-validator');
const bcrypt =require('bcrypt');
const fs = require('fs');
const path = require('path');


module.exports = {
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de Usuario",
            css:'index.css'
        })
    },
    processRegister:function(req,res){
        let errors = validationResult(req);
        lastID = dbUsers.length;

        if(errors.isEmpty()){
            let nuevoUsuario = {
                id:lastID+1,
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                email:req.body.email,
                ciudad:req.body.ciudad!=""?req.body.ciudad:"sin especificar",
                pass:bcrypt.hashSync(req.body.pass,10),
                rol:"user"
            }

            dbUsers.push(nuevoUsuario);

            fs.writeFileSync(path.join(__dirname,'..','data','dbUsers.json'),JSON.stringify(dbUsers),'utf-8')
            return res.redirect('/users/login')
        }else{
            res.render('userRegister',{
                title:"Registro de Usuarios",
                css:'index.css',
                errors:errors.mapped(),
                old:req.body
            })
        }

    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingreso de Usuarios",
            css:'index.css'

        })
    },
    processLogin:function(req,res){

    },
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de Usuario",
            css:'index.css',
            productos: dbProducts.filter(producto=>{
                return producto.category != "visited" && producto.category != "in-sale"
            })

        })
    }
}