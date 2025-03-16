import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fintelli'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    } as mongoose.ConnectOptions)
    
    console.log('MongoDB bağlantısı başarılı')
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB bağlantı hatası:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB bağlantısı koptu')
    })
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error)
    process.exit(1)
  }
} 