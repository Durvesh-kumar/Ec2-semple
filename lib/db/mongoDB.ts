import mongoose from "mongoose";

const isConnected = false;

export const connectToDB = async():Promise<void> =>{
   mongoose.set('strictQuery', true)

   if(isConnected){
    console.log('mongoDB is already connected');
    return
   }

   try {
    await mongoose.connect(process.env.MONGODB_URL || '', {
        dbName: process.env.MOGODB_DBNAME
    })
    isConnected : true
   } catch (error) {
     console.log(error);
   }
}