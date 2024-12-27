import express from 'express' ; 
import dotenv from 'dotenv' ; 
import  {connectToDb} from './connectDb/connectToDb.js' ;
import AuthRoutes from  "./routes/Auth.routes.js"  ;  
import cookieParser from 'cookie-parser';

const app = express() ; 

app.use(express.json()) ;
app.use(cookieParser()) ; 
dotenv.config({
    path: './.env'
})


app.listen(process.env.port, () => {
    connectToDb() ; 
    console.log(`Server is running on port ${process.env.port}`) 
});



app.get('/', (req, res) => {
    res.send('Hello World')
});


app.use('/api/auth',AuthRoutes) ; 

