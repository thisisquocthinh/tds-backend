import { MongoClient, ServerApiVersion } from "mongodb";
import { GREEN, RESET } from "../constants/listColor.js";
import { CONNECTION_STRING } from "../constants/connectionString.js";

export const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const insertDocument = async (collectionName, document) => {
  try {
    await client.connect();
    const database = client.db("TDSTiktok");
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(document);
    console.log("Document inserted: ", result.insertedId);
    await client.close();
  } finally {
    await client.close();
  }
};

export const getDocument = async (collectionName, query, options) => {
  try {
    await client.connect();
    const database = client.db("TDSTiktok");
    const collection = database.collection(collectionName);

    const data = await collection.findOne(query, options);
    await client.close();
    return data;
  } finally {
    await client.close();
  }
};

export const getAllDocument = async (collectionName, query, options) => {
  try {
    await client.connect();
    const database = client.db("TDSTiktok");
    const collection = database.collection(collectionName);

    const data = await collection.find({}).toArray();
    await client.close();
    return data;
  } finally {
    await client.close();
  }
};

export const countDocuments = async (collectionName) => {
  try {
    await client.connect();
    const database = client.db("TDSTiktok");
    const collection = database.collection(collectionName);

    const estimate = await collection.estimatedDocumentCount();
    return estimate;
  } finally {
    await client.close();
  }
};
