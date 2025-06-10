import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}
export declare const createForm: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=createForm.d.ts.map