import mongoose  from 'mongoose';

const connection=mongoose.connect(process.env.MONGO_URI).then(
    console.log('database is created')
)

export default connection