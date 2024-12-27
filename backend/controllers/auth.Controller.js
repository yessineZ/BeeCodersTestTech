import { User } from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndsetCookie } from '../lib/utils/generateTokenAndsetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail ,forgetPassword } from '../mailTrap/emails.js';
import crypto from 'crypto';
export const signUp = async (req, res) => {
    try {
        const { username, email, password, gender } = req.body;

        if (!username || !email || !password || !gender) {
            return res.json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ message: 'Invalid email format' });
        }  


        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.json({ message: 'Username taken' });
        }

        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const verficationToken = Math.floor(100000 + Math.random() * 90000).toString();

        const user = new User({
            username,
            email,
            password: hashPassword,
            gender,
            verficationToken,
            verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        if (user) {
            await user.save();
            generateTokenAndsetCookie(user._id, res);
            await sendVerificationEmail(user.email,user.verficationToken) ;
            console.log(user.verficationToken) ; 
             return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    ...user._doc ,
                    password : null 
                }
            });
        } else {
            console.log('User not registered');
            return res.status(401).json({ message: 'User not registered' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};
export const signIn = async (req,res) => {
    try {
        const { email ,password} = req.body ; 
        console.log(req.body) ; 
        console.log(email) ; 
        console.log(password) ;
        if (!email ||!password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.json({ message: 'User not found'});
        }
        const isMatch = await bcrypt.compareSync(password,user.password);
        if(!isMatch) {
            return res.json({message : 'Email or Password Incorrect'}) ; 
        }
        generateTokenAndsetCookie(user._id, res);
        user.lastLogin = Date.now() ;
        await user.save() ;
        return res.json({message : "logged In succesfully" , user : {
            _id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            gender: user.gender,
            lastLogin : user.lastLogin ,
            createdAt: user.createdAt
        } });
    }catch(err) {
        console.log(err.message) ; 
        return res.json({message : err.message}) ; 
    }
}

export const verifyCode = async (req,res) => {

    try {

    
    // - - - - - - the user have 6 inputs in the ui to verify his verification code
    const {code} = req.body ; 
    const userFromCheckAuth = req.user ;
    const user = await User.findOne({verficationToken: code, verficationTokenExpiresAt: {$gt: Date.now()}});
    if(!user) {
        return res.status(400).json({message: 'Invalid or expired verification code'}) ;
    }

    if(user.email === userFromCheckAuth.email) {
    user.isVerfied = true ;
    user.verficationToken = undefined ; 
    user.verficationTokenExpiresAt = undefined ;
    Promise.all([user.save(),sendWelcomeEmail(user.email,user.name,"Misty App")]).then(() => {
        console.log('User verified successfully') ;
    }) ;
    return res.json({message: 'Verification successful'}) ; 
}else {
    return res.status(401).json({message: 'Unauthorized'}) ;
}
    
    }catch(error) {
        console.error(error) ;
        return res.status(500).json({error: 'Server Error'}) ;
    }
}


export const getMe = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select('-password') ; 
        if(!user) {
            return res.json({message: 'User not found'}) ;
        }
        res.json({user : user}) ;


    }catch(err) {
        console.log(err.message) ; 
        res.json({message : err.message}) ; 
    }
} 


export const logout = async (req,res) => {
    try{

    res.clearCookie('jwt') ;
    return res.json({message: 'Logged out'}) ;

    }catch(error) {
        console.log(error) ;
         res.status(500).json({message: 'Server Error'}) ;
    }

}

export const forgetPasswordAuth = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
       
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        await Promise.all([
            forgetPassword(email, user.username, `${process.env.URL}/reset-password/${resetToken}`)
            ,user.save()]);

        
    
        return res.status(200).json({ message: 'Password reset email sent' , user : user});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

export const resetPassword = async (req,res) => {
    try {
        const {token} = req.params ; 
        console.log(token)
        const {password } = req.body ; 
        if(!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        const user = await User.findOne({resetPasswordToken : token , resetPasswordExpiresAt : {$gt : Date.now() }}) ; 
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hashSync(password,10) ; 
        user.password = hashedPassword ;
        user.resetPasswordToken = undefined ;
        user.resetPasswordExpiresAt = undefined ;
        Promise.all([user.save(),PasswordChangedSuccessfully(user.email,user.username)]) ;
        return res.status(200).json({ message: 'Password reset successfully' });
    }catch(err) {
        console.log(err.message) ; 
        return res.status(500).json({message : err.message}) ;
    }
}

