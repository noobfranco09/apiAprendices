import jwt from 'jsonwebtoken';

/* Librería para gestionar los tokens */


export const generarToken=(payload, vida)=>{
    const options = {
        expiresIn:vida
    };
    return jwt.sign(payload, process.env.SALT, options);
};