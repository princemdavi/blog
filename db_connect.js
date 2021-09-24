import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()


const db = mongoose.connect(process.env.DB_URI)
.then(() => console.log("db connection established"))
.catch((err) => console.log(err.message))


export default db