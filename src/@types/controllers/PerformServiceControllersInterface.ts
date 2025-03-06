import { NextFunction, Request, Response } from "express";

export interface PerfomServiceControllersInterface {
  perfom(request:Request, response:Response, next:NextFunction): Promise<void>;
}

