const dbProducts = require('../data/database')

module.exports = {
    profile:function(req,res){
        res.render('userProfile',{
            title:"Perfil de Usuario",
            productos: dbProducts.filter(producto=>{
                return producto.category != "visited" && producto.category != "in-sale"
            })

        })
    }
}