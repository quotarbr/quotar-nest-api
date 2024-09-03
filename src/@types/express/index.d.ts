import * as express from 'express';
declare global {
  namespace Express {
    interface Request {
      lojst_id?: number;
    }
  }
}
