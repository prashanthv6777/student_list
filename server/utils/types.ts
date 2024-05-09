import { Request, Response } from "express";
import { Document } from "mongoose";

export type APIResponseype = {
    res: Response;
    code: number;
    data: null | void | Document<unknown, {}, {}> | Document<unknown, {}, {}>[]; // Can be any data source from Mongoose model
    message: string;
};
