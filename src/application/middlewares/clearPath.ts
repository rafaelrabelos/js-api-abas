import { Request, Response, NextFunction } from "express";

const clearPath = (req: Request, res: Response, next: NextFunction) => {

    const clearSlash = (str: string): string =>{
        const count = (str.match(/\/\//g) || []).length;
        if(count > 0 && count < 50)
            return clearSlash(str.replace('//', '/'))
        return str;
    }
    req.url = clearSlash(req.url);
    next();
  }

  export { clearPath };