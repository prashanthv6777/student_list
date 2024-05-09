import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import indexRoutes from "./routes";
import keys from "./global_keys";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({ limit: "2048mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Initiate DB connection
mongoose
    .connect(
        "mongodb+srv://prashanthv6777:S2LmdOrDdYsMjTci@cluster1.e7awyuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
    )
    .then((e) => console.log("MongoDB is ready and connected"))
    .catch(console.error);

app.use("/api", indexRoutes);

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "../src")));

app.get("/api/ping", (_req: Request, res: Response) => {
    res.status(200).send(`API Server is running on Port: ${keys.PORT}`);
});

app.listen(keys.PORT, () => {
    console.log(`Example app listening at http://localhost:${keys.PORT}`);
});
