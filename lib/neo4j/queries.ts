export const queries = {
  getFetchNameQuery: (str: string) => `
    MATCH (p:Person)
    WHERE toLower(toString(p.person_name)) CONTAINS '${str.toLowerCase()}'
    OR toLower(toString(p.person_surname)) CONTAINS '${str.toLowerCase()}'
    RETURN p.person_name AS name, p.person_surname as lname, p.person_id AS id
  `,
  getRelationshipQuery: (fromPersonKey: string, toPersonKey: string) => `
    MATCH p=shortestPath((a:Person {person_id: "${fromPersonKey}"})-[*1..10]->(b:Person {person_id: "${toPersonKey}"})) RETURN p
  `,
  getRecentlyAddedNodesQuery: () => `MATCH (p:Person) RETURN p.person_id AS id, p.person_name AS person_name, p.person_surname AS person_surname ORDER BY p.updated_at DESC LIMIT 5`,
  getFilterByIdQuery: (personKey: string) => `MATCH (p:Person) WHERE p.person_id = '${personKey}' RETURN p.person_id AS id, p.person_name AS person_name, p.person_surname AS person_surname`,
  getInsertNewNodeQuery: (personObj: Object) => `CREATE (p:Person ${JSON.stringify(personObj)}) return p`,
};
