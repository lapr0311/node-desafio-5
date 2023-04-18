const express = require ('express')
const morgan = require ('morgan')
const cors = require ('cors')
const pool = require ("./database/db")
const auto = require ("./router/auth.router")


const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(auto)



/*app.use((err, req, res, next) => {
	return res.json({
		message:err.message
	})
})*/


app.listen(3000,()=>{console.log('iniciando servidor')})