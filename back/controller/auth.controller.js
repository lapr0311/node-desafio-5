const jwt = require("jsonwebtoken")
const { registrarUsuario, verificarCredenciales,getProfile,getToken } = require("../util/util")






const ingresarLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, "az_AZ")
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
}

const ingresarUsuario = async (req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send("Usuario creado con éxito")
    } catch (error) {
        res.status(500).send(error)
    }
}


const leerUsuario = async (req, res) => {
    try {
        const { email } = jwt.decode(getToken(req.header("Authorization")));
        console.log(email)
        const usuario = await getProfile(email);
        res.json(usuario)
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
};



module.exports = { ingresarLogin, ingresarUsuario, leerUsuario }
