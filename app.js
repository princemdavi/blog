import express from "express"
import routes from "./routes/index.js"
import db from "./db_connect.js"

const app = express()
const PORT = process.env.PORT || 5000

app.set("view engine","ejs")

// middlewares
app.use(express.urlencoded({extended: false}))
app.use("/static", express.static("public"))
app.use("/", routes)



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))