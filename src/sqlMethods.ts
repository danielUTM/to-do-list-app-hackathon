const { getClient } = require("./getClient");
const fs = require("node:fs");
var format = require("pg-format");

function read_in_query(file: String): String {
  return fs.readFileSync(`queries/${file}`, "utf-8");
}

const GET_TASKS_NON_COMPLETE_QUERY = read_in_query(
  "get_non_completed_tasks.sql",
);
const INSERT_TASK_QUERY = read_in_query("insert_task.sql");
const COMPLETE_TASK_QUERY = read_in_query("complete_task.sql");

export interface Tasks {
  id: number;
  title: String;
  summary: String;
  created_at: Date;
  due_by: Date;
  username: String;
}

/**
 * Reads all non-completed tasks and their assigned to from the DB.
 *
 * @returns A promise containing the result from the query.
 */
export async function getAllTasksNonCompleted(): Promise<Tasks[]> {
  const client = await getClient();

  const res = await client.query(GET_TASKS_NON_COMPLETE_QUERY);

  await client.end;

  return res.rows;
}


/**
 * Creates a new task in the task table.
 *
 * @param title the title of the task
 * @param summary the summary of the task
 * @param due_by the date that the task is due by. Optional.
 * @param assigned_to the person whom the task is assigned to
 */
export async function insertTask(
  title: String,
  summary: String,
  due_by: Date | null,
  assigned_to: Number,
) {
    const client = await getClient();

  let sql: String = format(
    INSERT_TASK_QUERY,
    title,
    summary,
    due_by,
    assigned_to,
  );

  const res = await client.query(sql);

  await client.end;
}

/**
 * Updates a tasks completed_at column to true.
 *
 * @param id the id number of the task to mark as complete.
 */
export async function updateTaskAsCompleted(id: number) {
  const client = await getClient();

  let sql: String = format(COMPLETE_TASK_QUERY, id);

  const res = await client.query(sql);

  await client.end;
}
