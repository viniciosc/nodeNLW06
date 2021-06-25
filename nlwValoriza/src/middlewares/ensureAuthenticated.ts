import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
    sub:string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){


    // Receber o token

    const authToken = request.headers.authorization;
    // Validar se o token esta preenchido
    if(!authToken){
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ");

    try {
        // Validar se token é válido
        const {sub} = verify(token,"58651340138deddda3360f7ce8f06844") as IPayload;

        request.user_id = sub

        return next();

    } catch (error) {

        return response.status(401).end()

    }

    
    // Recuperar informaçoes do usuário
}