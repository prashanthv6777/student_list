import { NextFunction } from "express";
import keys from "../global_keys";
import { APIResponseype } from "./types";

const response = ({ res, code, data, message }: APIResponseype) => {
    return res.status(code).send({
        statusCode: code,
        data,
        message: message,
    });
};

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (_: string, value: Error | null) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }

        return value;
    };
};

const convertCircular = (data: Error) => {
    return JSON.stringify(data, getCircularReplacer());
};

const errorLogger = (
    next: NextFunction,
    path: string,
    error: Error,
    isDebug?: string
) => {
    if (keys.DEBUGGER_MODE) {
        console.log(
            "---- This can be replaced with winston or Sendgrid to track the log on produciton ----"
        );
        console.log(
            `${isDebug || "Error occured"
            } in ${path} and Logged on (${new Date()}) Error: `,
            convertCircular(error)
        );
        console.log(`------- End Current log ------`);
        console.log(` `);
    }

    return next ? next(error) : null;
};

export { response, errorLogger };
