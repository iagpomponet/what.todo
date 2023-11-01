var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pkg from "pg";
export function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (global.connection) {
            return global.connection.connect();
        }
        // connection pool
        const { Pool } = pkg;
        const pool = new Pool({
            connectionString: process.env.CONNECTION_STRING,
        });
        // testing connection
        yield pool.connect();
        console.log("created connection pool with postgres");
        // saving it to use always the same
        global.connection = pool;
        return pool.connect();
    });
}
export function selectUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const res = yield client.query('SELECT * from "user"');
        client.release();
        return res.rows;
    });
}
export function getUser(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = 'SELECT * from "user" WHERE user_id=$1 OR email=$2';
        const result = yield client.query(sql, [id, email]);
        client.release();
        return result.rows;
    });
}
export function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = 'INSERT INTO "user"(first_name, last_name, email, password, avatar_url) VALUES($1,$2,$3,$4,$5) RETURNING *';
        const values = [
            user.first_name,
            user.last_name,
            user.email,
            user.password,
            user.avatar_url,
        ];
        client.release();
        return yield client.query(sql, values);
    });
}
export function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = 'UPDATE "user" SET first_name=$1, last_name=$2, avatar_url=$3 WHERE user_id=$4 RETURNING *';
        const values = [data.first_name, data.last_name, data.avatar_url, id];
        client.release();
        return yield client.query(sql, values);
    });
}
export function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        console.log("id :>> ", id);
        const sql = 'DELETE FROM "user" WHERE user_id=$1';
        client.release();
        return yield client.query(sql, [id]);
    });
}
export function createTodo({ user_id, labels, content }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("label :>> ", labels);
        const client = yield connect();
        const sql = "INSERT INTO todo (user_id, labels, content) VALUES ($1,$2,$3) RETURNING *";
        const values = [user_id, labels, content];
        const result = yield client.query(sql, values);
        client.release();
        return result.rows;
    });
}
export function updateTodo(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = 'UPDATE todo SET labels=$1, content=$2, "completed"=$3 WHERE todo_id=$4 RETURNING *';
        const values = [data.labels, data.content, data.completed, id];
        const resu = yield client.query(sql, values);
        client.release();
        return resu.rows;
    });
}
export function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = "DELETE FROM todo WHERE todo_id=$1 RETURNING *";
        const result = yield client.query(sql, [id]);
        client.release();
        return result.rows;
    });
}
export function getTodoFromUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
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
        const result = yield client.query(sql, [user_id]);
        client.release();
        return result.rows;
    });
}
export function createLabel({ user_id, color, name, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield connect();
        const sql = "INSERT INTO label (user_id, color,name) VALUES ($1,$2,$3) RETURNING *";
        const values = [user_id, color, name];
        const result = yield client.query(sql, values);
        client.release();
        return result.rows;
    });
}
//# sourceMappingURL=db.js.map