import dotenv from 'dotenv'
dotenv.config()
import { initServer } from "./app";

const PORT=Number(process.env.PORT) || 8000
const HOST=process.env.HOST || '0.0.0.0'
 
async function init(){
    const app = await initServer()
    app.get('/health',(req,res)=>{
        res.status(200).json({seccess:true,message:"Server is healty"})
    })
    app.listen(PORT,HOST,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
init()