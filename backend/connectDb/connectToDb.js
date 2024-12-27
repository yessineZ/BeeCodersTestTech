import mongoose from 'mongoose'; 


export const connectToDb =  () => {
    try {
         mongoose.connect(process.env.MONGO).then(() => {
            console.log('Connected to MongoDB');
        })
    }catch(err) {
        console.error('Error connecting to MongoDB:', err.message);
    }finally{
        mongoose.connection.on('disconnect', () =>{
            console.log('MongoDB disconnected');
        })
    }

}