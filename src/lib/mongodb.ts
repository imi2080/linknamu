import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// MONGODB_URI가 없으면 null을 돌려준다. (DB 없이도 화면은 동작해야 한다)
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  // 개발 모드의 핫 리로드와 서버리스 재호출에서 연결을 재사용한다.
  if (!globalForMongo._mongoClientPromise) {
    const promise = new MongoClient(uri).connect();
    // 연결에 실패하면 다음 요청에서 다시 시도할 수 있게 비운다.
    promise.catch(() => {
      if (globalForMongo._mongoClientPromise === promise) {
        globalForMongo._mongoClientPromise = undefined;
      }
    });
    globalForMongo._mongoClientPromise = promise;
  }

  const client = await globalForMongo._mongoClientPromise;
  return client.db(process.env.MONGODB_DB ?? "linktarae");
}
