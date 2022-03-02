import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdapter }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';
import * as jwt from 'jsonwebtoken';
import { CustomLogger } from '../config/Logger'

export class securityController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/signup', this.signup);
this.router.post('/login', this.login);
this.router.put('/consent', this.consent);
this.router.put('/logout', this.logout);
this.router.post('/googlesignin', this.googleLogin);
this.router.get('/getallusers', this.getAllUser);
this.router.get('/getuser/:id', this.getUserById);
this.router.get('/getallroles', this.getAllRole);
this.router.put('/updateuser', this.updateUser);
this.router.put('/updateuserimg', this.updateuserimg);
this.router.post('/saveroles', this.saveRoles);
this.router.delete('/deleteroles/:id', this.deleteRoles);
this.router.delete('/deleteuser/:id', this.deleteUser);
    }

public signup(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: signup');
        new ApiAdapter().post(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: signup');
        }).catch(err => {
            res.send(err);
        });
    }
public logout(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: logout');
        new ApiAdapter().put(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: logout');
        }).catch(err => {
            res.send(err);
        });
    }
public googleLogin(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: googleLogin');
        new ApiAdapter().post(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: googleLogin');
        }).catch(err => {
            res.send(err);
        });
    }
public getAllUser(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getAllUser');
        new ApiAdapter().get(Constant.SECURITYURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getAllUser');
        }).catch(err => {
            res.send(err);
        });
    }
public getUserById(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getUserById');
        new ApiAdapter().get(Constant.SECURITYURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getUserById');
        }).catch(err => {
            res.send(err);
        });
    }
public getAllRole(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: getAllRole');
        new ApiAdapter().get(Constant.SECURITYURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: getAllRole');
        }).catch(err => {
            res.send(err);
        });
    }
public updateUser(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: updateUser');
        new ApiAdapter().put(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: updateUser');
        }).catch(err => {
            res.send(err);
        });
    }
public updateuserimg(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: updateuserimg');
        new ApiAdapter().put(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: updateuserimg');
        }).catch(err => {
            res.send(err);
        });
    }
public saveRoles(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: saveRoles');
        new ApiAdapter().post(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: saveRoles');
        }).catch(err => {
            res.send(err);
        });
    }
public deleteRoles(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: deleteRoles');
        new ApiAdapter().delete(Constant.SECURITYURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: deleteRoles');
        }).catch(err => {
            res.send(err);
        });
    }
public deleteUser(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into securityController.ts: deleteUser');
        new ApiAdapter().delete(Constant.SECURITYURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/web' ? res.send(result) : res.send(null)
            new CustomLogger().showLogger('info', 'Exit from securityController.ts: deleteUser');
        }).catch(err => {
            res.send(err);
        });
    }






  public login(req: Request, res: Response) {
                  new CustomLogger().showLogger('info', 'Enter into securityController.ts: login');
        new ApiAdapter().post(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json())
        .then(async (result) => {
            // @ts-ignore
            const token = result.Idtoken;
            // @ts-ignore
            if (result.Idtoken === null || result.Idtoken === '' || result.Idtoken === undefined) {
                req.baseUrl === '/mobile' ? res.send({"Userdetails": result}) :
                    req.baseUrl === '/web' ? res.send({"Userdetails": result}) : res.send(null)
            } else {
                          
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    res.send ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdapter().post(Constant.AUTHPROXYURL + `/proxy`, decoded)
                    .then((res: any) => res.response.json()).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)),
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/web' ? res.send(temp) : res.send(null)
                  new CustomLogger().showLogger('info', 'Exit from securityController.ts: login');
                    })
                }
            })

            }
        }).catch(err => {
            res.send(err);
        });
    }



   public consent(req: Request, res: Response) {
                         new CustomLogger().showLogger('info', 'Enter into securityController.ts: consent');
        new ApiAdapter().put(Constant.SECURITYURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json())
        .then(async (result) => {
            // @ts-ignore
            const token = result.Idtoken;
            
            jwt.verify(token, 'geppettosecret', (err, decoded) => {
                if (err) {
                    res.send ({ 'status': 'Unauthorized', 'error': err, 'Userdetails': result });
                } else {
                    new ApiAdapter().post(Constant.AUTHPROXYURL + `/proxy`, decoded)
                    .then((res: any) => res.response.json()).then((response) => {
                        const temp = {
                            "Access": JSON.parse(JSON.stringify(response)),
                            "Userdetails": result
                        }
                req.baseUrl === '/mobile' ? res.send(temp) :
                req.baseUrl === '/web' ? res.send(temp) :
                         new CustomLogger().showLogger('info', 'Exit from securityController.ts: consent');
                    })
                }
            })

        }).catch(err => {
            res.send(err);
        });
    }

}

