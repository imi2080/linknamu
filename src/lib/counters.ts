import { getDb } from "./mongodb";

// clicks: 카드를 누른 수, hearts: 하트 버튼으로 받은 마음 수
export type CounterKind = "clicks" | "hearts";
export type Counts = Record<string, number>;

type CounterDoc = {
  linkId: string;
  count: number;
};

export async function getCounts(kind: CounterKind): Promise<Counts> {
  try {
    const db = await getDb();
    if (!db) return {};

    const docs = await db.collection<CounterDoc>(kind).find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc.linkId, doc.count]));
  } catch (error) {
    console.error(`${kind} 수를 불러오지 못했습니다.`, error);
    return {};
  }
}

// 저장된 뒤의 수를 돌려준다. 저장하지 못했으면 null.
export async function incrementCount(
  kind: CounterKind,
  linkId: string,
): Promise<number | null> {
  try {
    const db = await getDb();
    if (!db) return null;

    const doc = await db
      .collection<CounterDoc>(kind)
      .findOneAndUpdate(
        { linkId },
        { $inc: { count: 1 } },
        { upsert: true, returnDocument: "after" },
      );
    return doc?.count ?? null;
  } catch (error) {
    console.error(`${kind} 수를 저장하지 못했습니다.`, error);
    return null;
  }
}
