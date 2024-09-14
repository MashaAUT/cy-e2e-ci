export const createUserDetailsTable = `
  CREATE TABLE IF NOT EXISTS user_details (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(512) NOT NULL,
    gender VARCHAR(255) NOT NULL
)`;

export const getUsernamesByGender = `
  SELECT username
  FROM user_details
  WHERE gender = $1
  ORDER BY user_id DESC
  LIMIT 100;
`;