import neo4j from "neo4j-driver";
import { queries } from "./queries";

// const {
//   NEXT_PUBLIC_NEO4J_URI,
//   NEXT_PUBLIC_NEO4J_USERNAME,
//   NEXT_PUBLIC_NEO4J_PASSWORD,
// } = process.env;

// if (
//   !NEXT_PUBLIC_NEO4J_URI ||
//   !NEXT_PUBLIC_NEO4J_USERNAME ||
//   !NEXT_PUBLIC_NEO4J_PASSWORD
// ) {
//   throw new Error("Missing required Neo4j credentials");
// }
const neo4jUri = process.env.NEXT_PUBLIC_NEO4J_URI!;
const neo4jUser = process.env.NEXT_PUBLIC_NEO4J_USERNAME!;
const neo4jPassword = process.env.NEXT_PUBLIC_NEO4J_PASSWORD!;
let driver: any;
//===================================== create and check server connection ==========
try {
  // console.log(NEXT_PUBLIC_NEO4J_URI, " ", NEXT_PUBLIC_NEO4J_USERNAME, " ", NEXT_PUBLIC_NEO4J_PASSWORD);
  driver = neo4j.driver(
    neo4jUri,
    neo4j.auth.basic(neo4jUser, neo4jPassword)
  );
  const serverInfo = await driver.getServerInfo();
  // console.log("Connection Established");
} catch (error: any) {
  console.error(`Connection Error:\n${error}`);
}

//===================================== function to return list of names searched ===================================
export async function fetchNames(name: string) {
  
  const session = driver.session();
  try {
    const query = queries.getFetchNameQuery(name);
    console.log("query: ", query);
    const result = await session.run(query);
    return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.error("fetchnames error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
}
