import mongoose from "mongoose"

const connection = {}

const connectDB = async () => {

  if (connection.isConnected) {
    // use existing db connection
    console.log("Using existing connection")
    return
  }

  // connect MDB in Next
  const db = await mongoose.connect(process.env.MONGO_DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log("DB is connected")
  connection.isConnected = db.connections[0].readyState

  // 
}

export default connectDB