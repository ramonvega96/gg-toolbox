import { MongoClient } from "mongodb";
import config from '../config.json';
import bcrypt from 'bcrypt'

let client: MongoClient;
const testUserGG: {
  username: string;
  password: string;
  project: string;
} = {
  username: 'jestTestUser',
  password: 'jestTestPwd',
  project: 'GG',
};

const testUserTB: {
  username: string;
  password: string;
  project: string;
} = {
  username: 'jestTestUser',
  password: 'jestTestPwd',
  project: 'TB',
};

beforeAll(async () => {
  const uri = config.DATABASE_URL;
  if (uri === undefined) {
    throw Error("Where is URI?");
  }
  
  client = await MongoClient.connect(uri);
  
  const db = client.db(config.DATABASE_TEST_NAME);
  const userCollection = db.collection('user');

  const salt = await bcrypt.genSalt(12);
  const hashPwd = await bcrypt.hash(testUserGG.password, salt);
  await userCollection.insertOne({ username: testUserGG.username, password: hashPwd, project: testUserGG.project });
  await userCollection.insertOne({ username: testUserTB.username, password: hashPwd, project: testUserTB.project });
});

afterAll(async () => {
  if (client) {
    await client.db("nutritious_test").dropDatabase();
    await client.close();
  }
});

export { client, testUserGG,  testUserTB};
