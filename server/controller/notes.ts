import { Request, Response, NextFunction } from "express";
import { response, errorLogger } from "../utils";
import { Notes } from "../models";

const saveNotes = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    try {
        const createNote = new Notes({
            content,
        });

        await createNote.save();
        response({
            res,
            code: 200,
            data: createNote,
            message: "Note has created successfully.",
        });
    } catch (e: any) {
        errorLogger(next, "login/saveNotes", e);
    }
};

const fetchAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allNotes = await Notes.find({}).catch((e: Error) => {
            errorLogger(next, "login/fetchAllNotes", e);
        });

        response({
            res,
            code: 200,
            data: allNotes,
            message: "Note details are fetched successfully.",
        });
    } catch (e: any) {
        errorLogger(next, "login/fetchAllNotes", e);
    }
};

const getNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const singleNote = await Notes.findById(id).catch((e: Error) => {
            errorLogger(next, "login/getNote", e);
        });

        response({
            res,
            code: 200,
            data: singleNote,
            message: "Note detail successfully fetched.",
        });
    } catch (e: any) {
        errorLogger(next, "login/getNote", e);
    }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id, content } = req.body;
    try {
        const singleNote = await Notes.findOneAndUpdate({ id }, { content }).catch((e: Error) => {
            errorLogger(next, "login/updateNote", e);
        });

        response({
            res,
            code: 200,
            data: singleNote,
            message: "Note has updated successfully.",
        });
    } catch (e: any) {
        errorLogger(next, "login/updateNote", e);
    }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const deleteStatus = await Notes.findOneAndDelete({ id }).catch((e: Error) => {
            errorLogger(next, "login/deleteNote", e);
        });

        response({
            res,
            code: 200,
            data: deleteStatus,
            message: "Note has deleted successfully.",
        });
    } catch (e: any) {
        errorLogger(next, "login/deleteNote", e);
    }
};

export {
    saveNotes, fetchAllNotes, getNote, updateNote, deleteNote
};
