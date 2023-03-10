const {Strategy, ExtractJwt} = require('passport-jwt');
const {config} = require('./../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;

/*
DEL LADO DEL CLIENTE

guardar un estado de login y el token
puede ser en cookies o localStorage (mejor cookies)
interceptando la peticion y enviando el token en los header (consultar)
que el token expire (refresh token)

*/