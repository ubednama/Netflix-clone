import mongoose from "mongoose";

mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('connected', () => console.log('connected'));

const dbConnection = () => {
    const URI = process.env.MONOGO_URL
    mongoose.connect(URI).then(()=>{
        console.log("Connected to database")
    }).catch ((error)=> {
        console.log("Error connecting to database", error)
    })
}

export default dbConnection;