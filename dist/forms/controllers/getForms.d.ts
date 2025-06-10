import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}
export declare const getForms: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=getForms.d.ts.map