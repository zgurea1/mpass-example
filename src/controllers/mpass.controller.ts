import { NextFunction, Request, Response } from 'express';
import { samlStrategy } from '@config';

class MpassController {
  public loginCallbackController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(301).redirect('http://localhost:3000/v1/mpass/check');
    } catch (error) {
      next(error);
    }
  };
  public logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      samlStrategy.logout(req as any, (err, requestUrl) => {
        if (err) {
          return console.error(err);
        }
        const sessionID = req.session.id;
        req.sessionStore.destroy(sessionID, err2 => {
          if (err2) {
            return console.error(err2);
          }
        });

        if (requestUrl) {
          res.status(301).redirect(requestUrl);
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public logoutCallbackController = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      req.session.destroy(err => {
        if (err) {
          return console.error(err);
        }
        res.redirect('https://localhost:9000/#/');
      });
    });
  };
  public checkUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.isAuthenticated()) {
        return res.send({ auth: req.isAuthenticated() });
      }

      return res.send(req.user);
    } catch (error) {
      next(error);
    }
  };
}

export default MpassController;
