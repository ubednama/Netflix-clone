import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./db/db.connection.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";


dotenv.config()
dbConnection();

const app = express();
const PORT = process.env.PORT;
// console.log("from index", process.env.MONOGO_URL)

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())

const corsOptions = {
    origin:"http://localhost:3000",
    credentials: true
}

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(PORT, ()=> {
    console.log(`Port listening at ${PORT}`)
})