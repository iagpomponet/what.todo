import pkg from "pg";

export async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  // connection pool
  const { Pool } = pkg;
  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  // testing connection
  const client = await pool.connect();
  console.log("created connection pool with postgres");

  const res = await client.query("SELECT NOW()");
  client.release();

  // saving it to use always the same
  global.connection = pool;
  return pool.connect();
}

export async function selectUsers() {
  const client = await connect();
  const res = await client.query('SELECT * from "user"');

  return res.rows;
}

export async function getUser(id?: string, email?: string) {
  const client = await connect();
  const sql = 'SELECT * from "user" WHERE user_id=$1 OR email=$2';
  const result = await client.query(sql, [id, email]);

  return result.rows;
}

export async function createUser(user) {
  const client = await connect();
  const sql =
    'INSERT INTO "user"(first_name, last_name, email, password, avatar_url) VALUES($1,$2,$3,$4,$5) RETURNING *';
  const values = [
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    user.avatar_url,
  ];

  return await client.query(sql, values);
}

export async function updateUser(id, data) {
  const client = await connect();
  const sql =
    'UPDATE "user" SET first_name=$1, last_name=$2, avatar_url=$3 WHERE user_id=$4 RETURNING *';
  const values = [data.first_name, data.last_name, data.avatar_url, id];

  return await client.query(sql, values);
}

export async function deleteUser(id) {
  const client = await connect();
  console.log("id :>> ", id);
  const sql = 'DELETE FROM "user" WHERE user_id=$1';
  return await client.query(sql, [id]);
}
