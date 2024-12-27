import jwt from 'jsonwebtoken' ; 
import { User } from '../models/User.model.js';


export const checkAuth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt ; 
        if(!token) {
            return res.status(401).json({message: 'Token not provided'});
        }
        const decoded = jwt.verify(token,process.env.SECRET) ; 
        if(!decoded) {
            return res.status(401).json({message : 'Token not valid'});
        }
        const id = decoded.id ; 
        const user = await User.findById(id);
        if(!user) {
            return res.status(401).json({message: 'User not found'});
        }
        req.user = user ;
        next() ; 
    }catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Server Error'});
    }
}