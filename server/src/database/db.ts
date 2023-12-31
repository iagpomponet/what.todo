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
  await pool.connect();
  console.log("created connection pool with postgres");

  // saving it to use always the same
  global.connection = pool;
  return pool.connect();
}

export async function selectUsers() {
  const client = await connect();
  const res = await client.query('SELECT * from "user"');
  client.release();

  return res.rows;
}

export async function getUser(id?: string, email?: string) {
  const client = await connect();
  const sql = 'SELECT * from "user" WHERE user_id=$1 OR email=$2';
  const result = await client.query(sql, [id, email]);
  client.release();

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
  client.release();
  return await client.query(sql, values);
}

export async function updateUser(id, data) {
  const client = await connect();
  const sql =
    'UPDATE "user" SET first_name=$1, last_name=$2, avatar_url=$3 WHERE user_id=$4 RETURNING *';
  const values = [data.first_name, data.last_name, data.avatar_url, id];
  client.release();
  return await client.query(sql, values);
}

export async function deleteUser(id) {
  const client = await connect();
  console.log("id :>> ", id);
  const sql = 'DELETE FROM "user" WHERE user_id=$1';
  client.release();
  return await client.query(sql, [id]);
}

export async function createTodo({ user_id, labels, content }: any) {
  console.log("label :>> ", labels);
  const client = await connect();
  const sql =
    "INSERT INTO todo (user_id, labels, content) VALUES ($1,$2,$3) RETURNING *";
  const values = [user_id, labels, content];
  const result = await client.query(sql, values);
  client.release();
  return result.rows;
}

export async function updateTodo(id, data) {
  const client = await connect();
  const sql =
    'UPDATE todo SET labels=$1, content=$2, "completed"=$3 WHERE todo_id=$4 RETURNING *';
  const values = [data.labels, data.content, data.completed, id];
  const resu = await client.query(sql, values);
  client.release();
  return resu.rows;
}

export async function deleteTodo(id) {
  const client = await connect();
  const sql = "DELETE FROM todo WHERE todo_id=$1 RETURNING *";

  const result = await client.query(sql, [id]);
  client.release();

  return result.rows;
}

export async function getTodoFromUser(user_id: string) {
  const client = await connect();
  const sql = `SELECT
  todo.todo_id,
  todo.user_id,
  todo.content,
  todo.completed,
  todo.created_at,
  array_agg(jsonb_build_object('name', label.name, 'color', label.color)) AS labels
FROM
  todo
LEFT JOIN
  label
  ON todo.labels @> ARRAY[label.label_id]::UUID[]
WHERE
  todo.user_id = $1
GROUP BY
  todo.todo_id, todo.user_id, todo.content
ORDER BY created_at DESC;
;
  `;
  const result = await client.query(sql, [user_id]);
  client.release();

  return result.rows;
}

export async function createLabel({
  user_id,
  color,
  name,
}: {
  user_id: string;
  color: string;
  name: string;
}) {
  const client = await connect();
  const sql =
    "INSERT INTO label (user_id, color,name) VALUES ($1,$2,$3) RETURNING *";
  const values = [user_id, color, name];
  const result = await client.query(sql, values);
  client.release();

  return result.rows;
}
