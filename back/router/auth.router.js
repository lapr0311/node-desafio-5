const {Router} = require ("express");
const {ingresarUsuario,ingresarLogin,leerUsuario} = require ("../controller/auth.controller")



const router = Router() 


router.post("/usuarios", ingresarUsuario)

router.post("/login",ingresarLogin)


router.get("/usuarios",leerUsuario)





module.exports = router;