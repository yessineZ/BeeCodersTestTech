import jwt from 'jsonwebtoken' ; 

export const generateTokenAndsetCookie = async (id,res) => {
    const token = jwt.sign({id},process.env.SECRET,{
        expiresIn : '1d',
        
    });
    res.cookie('jwt',token,{
        httpOnly: true, //xss attacks protection
        expires: new Date(Date.now() + 60 * 60  *  24 * 1000),
        secure: process.env.NODE_ENV === 'production' ? true : false , 
        sameSite : 'strict' , //csrf protection
    });
    return token ;

}