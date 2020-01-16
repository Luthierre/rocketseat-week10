const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors  = require('cors');

const app = express();
mongoose.connect('mongodb://localhost/weekteen',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP : get, post, put, delete
// Tipos de parametros:
// Query Params: request.query (filtros, ordenação, paginação, ....)
// Route Params:  request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (não-relacional)


app.listen(3333);