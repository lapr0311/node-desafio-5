const bcrypt = require('bcryptjs')
const pool = require("../database/db")



const registrarUsuario = async (usuario) => {
    let { email, password, rol, lenguage } = usuario
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [email, passwordEncriptada, rol, lenguage]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2,$3,$4)"
    await pool.query(consulta, values)
}


const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
}


const getToken = (authorization) => {
    try {
        const token = authorization.split("Bearer ")[1];
        return token
    } catch (error) {
        throw { code: 401, message: 'Falta el token' }
    }
};


const getProfile = async (email) => {
    const value = [email];
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const result = await pool.query(query, value);
    const usuario = {
        email: result.rows[0].email,
        rol: result.rows[0].rol,
        lenguage: result.rows[0].lenguage
    }
    return usuario;
}




module.exports = { registrarUsuario, verificarCredenciales,getToken,getProfile }