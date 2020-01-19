const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors  = require('cors');
const http = require('http');
const {setupWebSocket } = require('./websocket');

const app = express();

const server =http.Server(app);
setupWebSocket(server);

mongoose.connect('mongodb+srv://oministack:8M9uzDNAGzuuVWS@cluster0-zddk2.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
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