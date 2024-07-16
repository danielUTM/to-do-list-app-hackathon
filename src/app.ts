import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { getAllTasksNonCompleted, Tasks}  from "./sqlMethods"

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

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});