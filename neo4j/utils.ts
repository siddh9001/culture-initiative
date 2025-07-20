import neo4j from "neo4j-driver";
import { queries } from "./queries";

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

if(!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD){
    throw new Error("Missing required Neo4j credentials");
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(
    NEO4J_USERNAME,
    NEO4J_PASSWORD
  )
)


//===================================== function to return list of names searched ===================================
export async function fetchNames(name: string) {
  const session = driver.session();

  try {
    const query = queries.getFetchNameQuery(name);
    const result = await session.run(query);
    return result.records.map((record) => record.toObject());
  } catch (error) {
    console.error("fetchnames error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
}