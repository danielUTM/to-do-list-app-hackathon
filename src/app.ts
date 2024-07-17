import express, { Request, Response } from "express";
import {getAllTasksNonCompleted, insertTask, Tasks} from "./sqlMethods"
import path from "path";


const app = express();


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_request: Request, response: Response) => { 
  response.sendFile(path.join(__dirname, "/public", "index.html"));
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
    let assigned_to: number = parseInt(req.query.assigned_to!.toString());
    console.log(req.query.due_by);
    if(req.query.due_by===undefined){
        await insertTask(title, summary, null, assigned_to);
    } else{
        await insertTask(title, summary, new Date(Date.parse(req.query.due_by!.toString())), assigned_to);
    }



    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
})

module.exports = app;