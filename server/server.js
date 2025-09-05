import express from 'express'
import 'dotenv/config'
import cors from 'cors';
import {connectDb} from './config/db.js'
import cookieParser from 'cookie-parser';


import userRoutes from "./routes/userRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import expenseRoutes from "./routes/expenseRoutes.js";   
import salarySlipRoutes from "./routes/salarySlipRoutes.js"; 
import dashboardRoutes from "./routes/dashboardRoutes.js"; 


const app = express()
const port = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

await connectDb()

app.get('/',(req,res) => (res.send('Server connected'))) 
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/expenses", expenseRoutes);      
app.use("/api/salaryslips", salarySlipRoutes); 
app.use("/api/dashboard", dashboardRoutes);


app.listen(port , () => {
    console.log(`Server is running on http://localhost:${port}`);
})

export default app;