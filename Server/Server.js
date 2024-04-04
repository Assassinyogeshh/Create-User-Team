import express from "express"
import connectMongo from "./DB/ConnectDB.js";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./Routes/userRoutes.js"
import AllUserRoutes from "./Routes/AllUserRoutes.js";
dotenv.config({ path: './.env' });

const uri = process.env.DATABASE_URL

connectMongo(uri);

const app = express();

// const corsOptions = {
//     origin: "http://localhost:5173",
//     optionsSuccessStatus: 200
// }


app.use(cors())

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));


app.use('/auth', userRoutes);
app.use("/users", AllUserRoutes);


app.use('/', (req, res) => {
    res.status(200).send('I Am Live')
});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    try {
        console.log("Successfully Connected To The Server");
    } catch (error) {
        console.log(error);
    }
})
