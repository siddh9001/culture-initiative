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

//===================================== function to return list of names searched ===================================
export async function fetchNames(name: string) {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    // const serverInfo = await driver.getServerInfo();
    // console.log("Connection Established");
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }

  const session = driver.session();
  try {
    const query = queries.getFetchNameQuery(name);
    // console.log("query: ", query);
    const result = await session.run(query);
    return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.error("fetchnames error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
}

// ===================================== function to return the relationship data ===================================
export async function fetchData(fromPersonKey: string, toPersonKey?: string) {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    // const serverInfo = await driver.getServerInfo();
    // console.log("Connection Established");
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }
  const session = driver.session();
  try {
    let query;
    if (toPersonKey !== undefined) {
      query = queries.getRelationshipQuery(fromPersonKey, toPersonKey);
    } else {
      query = queries.getFilterByIdQuery(fromPersonKey);
    }
    // console.log(query);
    const result = await session.run(query);
    return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.log("fetchdata error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
}

//======================================== function to retun recently added person nodes =======================================
export async function fetchRecentlyAddedNodes() {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    // const serverInfo = await driver.getServerInfo();
    // console.log("Connection Established");
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }
  const session = driver.session();
  try {
    const query = queries.getRecentlyAddedNodesQuery();
    const result = await session.run(query);
    return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.log("fetchdata error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
}

//============================================ function to insert new node ==========================================
export async function insertNewNode(nodeObj:Object) {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    // const serverInfo = await driver.getServerInfo();
    // console.log("Connection Established");
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }
  const session = driver.session();
  try {
    const query = queries.getInsertNewNodeQuery(nodeObj);
    console.log("query:", query);
    const result = await session.run(query);
    console.log(result);
    // return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.log("fetchdata error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
}


//========================================== funtion to update the exisiting node =================================
export async function updateNode(nodeObj:Object) {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
    // const serverInfo = await driver.getServerInfo();
    // console.log("Connection Established");
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }
  const session = driver.session();

  try {
    const query = queries.getUpdateNodeQuery(nodeObj);
    console.log("query:", query);
    const result = await session.run(query);
    console.log(result);
    // return result.records.map((record: any) => record.toObject());
  } catch (error) {
    console.log("fetchdata error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
  
}

//========================================== function to fetch node details =================================
export async function fetchNodeData(personId: string) {
  try {
    driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
  } catch (error: any) {
    console.error(`Connection Error:\n${error}`);
  }
  const session = driver.session();

  try {
    const query = queries.getGetAllDetailsByIdQuery(personId);
    const result = await session.run(query);
    // Return first record since we're querying by ID which should be unique
    return result.records[0]?.toObject();
  } catch (error) {
    console.log("fetchNodeData error: ", error);
  } finally {
    await session.close();
    await driver.close();
  }
  return null;
}