import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import connecttoDb from "./dbconnection/db.connection.js";

dotenv.config();
connecttoDb();
const app = express();
const port = process.env.PORT || 5500;


// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use("/api/users", userRoutes);


app.get('/',(req,res)=>{
    console.log('i am called at that time');
    res.send('Helo');
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
