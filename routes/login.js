

var express = require('express');
var bcrypt = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();

var Usuario = require('../models/usuario');

app.post('/', (req, res) =>{

    var body = req.body;
    Usuario.findOne({ email:body.email } , (err, usuarioBD) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }
        if( !usuarioBD ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no válidas',
                errors: err
            });
        }
        if ( !bcrypt.compareSync( body.password, usuarioBD.password ) ){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no válidas',
                errors: err
            });
        }

        // Crear TOKEN!!!
        usuarioBD.password = ':=';
        var token = jsonwebtoken.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 } ) // 4 horas expira

        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id: usuarioBD.id
        });
    });

});

module.exports = app;