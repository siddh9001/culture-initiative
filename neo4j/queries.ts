export const queries = {
  getFetchNameQuery: (str: string) => `
    MATCH (p:Person)
    WHERE lower(p.person_name) STARTS WITH '${str.toLowerCase()}'
      OR lower(p.person_name) ENDS WITH '${str.toLowerCase()}'
      OR lower(p.person_name) CONTAINS '${str.toLowerCase()}'
    RETURN p.person_name AS name, p.person_surname as lname, p.person_id AS id
  `,
}; 