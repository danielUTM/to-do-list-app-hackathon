import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {getAllTasksNonCompleted, insertTask, Tasks} from "./sqlMethods"

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (_request: Request, response: Response) => { 
  response.status(200).send("Hello World");
});

/**
 * End point that returns stories from database.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns A response object containing the stories from the database
 */
app.get("/tasks", async (req: Request, res: Response) => {
    let dbRes: Tasks[] = await getAllTasksNonCompleted();
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(dbRes));
});

app.post("/tasks", async (req: Request, res: Response) => {
    let title: String = req.query.title!.toString();
    let summary: String = req.query.summary!.toString();
    let created_at: Date = new Date();
    let due_by: Date|null = isNaN(Date.parse(req.query.due_by?.toString() || ""))?null:new Date(Date.parse(req.query.due_by!.toString()));
    let completed: Boolean = false;
    let assigned_to: number = parseInt(req.query.assigned_to!.toString());
    await insertTask(title, summary, due_by, assigned_to);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
})

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});