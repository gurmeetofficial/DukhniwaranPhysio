import { getDb } from './db';

async function check() {
  const db = await getDb();
  const therapies = await db.collection('therapies').find({}).toArray();
  console.log(JSON.stringify(therapies, null, 2));
  process.exit(0);
}
check();
