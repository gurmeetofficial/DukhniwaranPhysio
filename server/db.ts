import 'dotenv/config';
import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/dukhniwarn';
const DB_NAME = process.env.MONGO_DB_NAME || 'dukhniwarn';

let client: MongoClient;
let db: any;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

async function connectWithRetry(retries = MAX_RETRIES): Promise<any> {
  try {
    console.log(`Connecting to MongoDB at ${MONGO_URL}...`);
    client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    return db;
  } catch (err) {
    console.error('MongoDB connection failed after retries:', err);
    if (retries > 0) {
      console.error(`MongoDB connection failed. Retrying in ${RETRY_DELAY_MS / 1000}s... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
      return connectWithRetry(retries - 1);
    } else {
      console.error('MongoDB connection failed after retries:', err);
      throw err;
    }
  }
}

export async function getDb() {
  if (!db) {
    await connectWithRetry();
  }
  return db;
}
