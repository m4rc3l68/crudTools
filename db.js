const { MongoClient } = require('mongodb')
const router = require('./routes')
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

const ObjectId = require('mongodb').ObjectId
async function findOne(id) {
  const db = await connect()
  return db.collection(COLLECTION).findOne(new ObjectId(id))
}

async function update(id, customer) {
  const db = await connect()
  return db
    .collection(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: customer })
}

async function deleteOne(id) {
  const db = await connect()
  return db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) })
}

module.exports = { findAll, insert, findOne, update, deleteOne }
