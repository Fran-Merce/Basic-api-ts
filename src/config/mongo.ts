import 'dotenv/config';
import { connect } from 'mongoose';

async function dbConnect(): Promise<void> {
try {
  const DB_URI = <string>process.env.DB_URI
  await connect(DB_URI)
  console.log('ok db')
} catch (error) {
  console.log('errro connect db',error)
}
}

export default dbConnect