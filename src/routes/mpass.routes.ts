import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import MpassController from '@/controllers/mpass.controller';
import passport from 'passport';

class MpassRoute implements Routes {
  public path = '/mpass';
  public router = Router();
  public mpassController = new MpassController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/login`,
      passport.authenticate('saml', {
        failureRedirect: '/v1/mpass/fail',
        successRedirect: '/v1/mpass/login/callback',
        failureFlash: true,
      }),
    );
    this.router.post(
      `${this.path}/login/callback`,
      passport.authenticate('saml', {
        failureRedirect: '/v1/mpass/fail',
        failureFlash: true,
      }),
      this.mpassController.loginCallbackController,
    );

    this.router.get(`${this.path}/logout`, this.mpassController.logoutController);
    this.router.get(`${this.path}/logout/callback`, this.mpassController.logoutCallbackController);
    this.router.get(`${this.path}/check`, this.mpassController.checkUserController);
  }
}

export default MpassRoute;
