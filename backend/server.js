import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./db/db.connection.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv"
import path from "path";

// const envPath = path.resolve(process.cwd(), "../.env");
// console.log("Resolved .env path:", envPath);

const __dirname = path.resolve();

dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT || 8080;
// console.log("from index", process.env.MONOGO_URL)
// console.log("Loaded environment variables:", process.env);


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser())

const corsOptions = {
    origin:"http://localhost:3000",
    credentials: true
}

app.use(cors(corsOptions));

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, '../frontend/build')));

// // This route should be the last route, serving your React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app.use(express.static(path.join(__dirname, "/frontend/build")))
        //file is saved in 'build' for better optimization


app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname,"frontend", "build", "index.html"));
})


app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.send("hello world")
})

// console.log("PORT:", process.env.PORT);
// console.log("MONOGO_URL:", process.env.MONOGO_URL);


app.listen(PORT, ()=> {
    console.log(`Port listening at ${PORT}`)
})