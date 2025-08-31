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
  getRecentlyAddedNodesQuery: () => `MATCH (p:Person) RETURN p.person_id AS person_id, p.person_name AS person_name, p.person_surname AS person_surname ORDER BY p.updated_at DESC LIMIT 5`,
  getFilterByIdQuery: (personKey: string) => `MATCH (p:Person) WHERE p.person_id = '${personKey}' RETURN p.person_id AS person_id, p.person_name AS person_name, p.person_surname AS person_surname`,
  getInsertNewNodeQuery: (personObj: any) => `CREATE (p:Person {
      person_id: "${personObj.person_id}",
      person_name: "${personObj.person_name}",
      person_surname: "${personObj.person_surname}",
      person_dob: "${personObj.person_dob}",
      person_birth_place: "${personObj.person_birth_place}",
      person_modified_name: "${personObj.person_modified_name}",
      person_gender: "${personObj.person_gender}",
      person_marrige_status: "${personObj.person_marrige_status}",
      person_D_A_status: "${personObj.person_D_A_status}",
      person_sasuraal: "${personObj.person_sasuraal}",
      person_mayka: "${personObj.person_mayka}"
    }) return p`,
  getUpdateNodeQuery: (personObj: any) => `
    MATCH (p:Person)
    WHERE p.person_id = "${personObj.person_id}"
    SET p += {
      person_id: "${personObj.person_id}",
      person_name: "${personObj.person_name}",
      person_surname: "${personObj.person_surname}",
      person_dob: "${personObj.person_dob}",
      person_birth_place: "${personObj.person_birth_place}",
      person_modified_name: "${personObj.person_modified_name}",
      person_gender: "${personObj.person_gender}",
      person_marrige_status: "${personObj.person_marrige_status}",
      person_D_A_status: "${personObj.person_D_A_status}",
      person_sasuraal: "${personObj.person_sasuraal}",
      person_mayka: "${personObj.person_mayka}"
    }
    RETURN p
  `,
  getGetAllDetailsByIdQuery: (personId: string) => `
    MATCH (p:Person)
    WHERE p.person_id = '${personId}'
    RETURN p.person_id AS person_id,
           p.person_name AS person_name,
           p.person_surname AS person_surname,
           p.person_dob AS person_dob,
           p.person_birth_place AS person_birth_place,
           p.person_modified_name AS person_modified_name,
           p.person_gender AS person_gender,
           p.person_marrige_status AS person_marrige_status,
           p.person_D_A_status AS person_D_A_status,
           p.person_sasuraal AS person_sasuraal,
           p.person_mayka AS person_mayka
  `,
};
