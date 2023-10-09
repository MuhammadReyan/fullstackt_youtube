import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import cors from "cors"

//-------------------------- IMPORTING ROUTES ----------------------------------------- //

import userRoutes from './route/userRoute.js'
import commentRoutes from './route/commentRoute.js'
import videoRoutes from './route/videoRoute.js'
import authRoute from './route/authRoute.js'



const app = express()
app.use(cors())






// ==================== Connected Database =============================//

const connectDb = async () => {

    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database is Connected")
    }).catch((err) => {
        throw err
    })

}


// =============== MIDDLE  WARE ===============

app.use(cookieParser())
app.use(express.json())

//  ====================     APIS HITS          =========================//

app.use('/api/auth', authRoute)
app.use('/api/users', userRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/videos', videoRoutes)

//===================== App Error ===============================//

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something Went Wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


// ================ Server Connected ============================//

app.listen(8800, () => {
    connectDb()
    console.log("Server is Connected!")
})