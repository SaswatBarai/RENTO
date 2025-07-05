import {app} from './app.js';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from "./utils/db.js"

const PORT = process.env.PORT || 5001;

app.listen(PORT,async ()=>{
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
    
})

