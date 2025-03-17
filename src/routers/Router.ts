import { Express } from 'express';
import { container } from 'tsyringe';
import { CreateSchedulingControllers } from '../controllers/CreateSchedulingControllers';
import { LoginAdminControllers } from '../controllers/LoginAdminControllers';
import { PerfomServiceControllers } from '../controllers/PerformServiceControllers';
import { RegisterAdminControllers } from '../controllers/RegisterAdminControllers';
import { SearchSchedulingControllers } from '../controllers/SearchSchedulingControlllers';
import { AuthenticationUserMiddlewares } from '../middlewares/AuthenticationUserMiddlewares';

export class Router {
  public static Initializer(app: Express): void {
    const authenticationUser = container.resolve(AuthenticationUserMiddlewares);
    const createScheduling = container.resolve(CreateSchedulingControllers);
    const searchScheduling = container.resolve(SearchSchedulingControllers);
    const perfomService = container.resolve(PerfomServiceControllers);
    const loginAdmin = container.resolve(LoginAdminControllers);
    const registerAdmin = container.resolve(RegisterAdminControllers);

    app.post('/create-scheduler', createScheduling.create.bind(createScheduling));

    app.get('/search-scheduler-date', authenticationUser.authenticate.bind(authenticationUser), searchScheduling.searchByDate.bind(searchScheduling));

    app.get('/search-all-scheduler', authenticationUser.authenticate.bind(authenticationUser), searchScheduling.searchByAll.bind(searchScheduling));

    app.post('/perfom-service', authenticationUser.authenticate.bind(authenticationUser), perfomService.perfom.bind(perfomService));

    app.post('/login-admin', loginAdmin.login.bind(loginAdmin));

    app.post('/register-admin', authenticationUser.authenticate.bind(authenticationUser), registerAdmin.register.bind(registerAdmin));
  }
}
