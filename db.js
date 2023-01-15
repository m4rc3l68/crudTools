const { MongoClient, ObjectId } = require('mongodb')
const { route } = require('./routes')

let singleton

async function connect() {
  if (singleton) return singleton

  const client = new MongoClient(process.env.MONGO_HOST)
  await client.connect()

  singleton = client.db(process.env.MONGO_DATABASE)
  return singleton
}

const COLLECTION = 'customer'

async function findAll() {
  const db = await connect()
  return db.collection(COLLECTION).find().toArray()
}

async function insert(customer) {
  const db = await connect()
  return db.collection(COLLECTION).insertOne(customer)
}

module.exports = { findAll, insert }
