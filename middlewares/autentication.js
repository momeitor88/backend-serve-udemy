// Verificación token

var jwk = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

exports.verificaToken = function (req, res, next) {

    var token = req.query.token;
    jwk.verify( token, SEED,  ( err,decoded ) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}