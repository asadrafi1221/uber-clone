import mongoose from "mongoose"

const connecttoDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('database is connected ')
    })
}

export default connecttoDb