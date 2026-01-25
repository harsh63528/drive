import mongoose  from 'mongoose';


const connection=async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(
    console.log('database is created')
).catch(error=>{
    console.log(error)
}
)

}

export default connection