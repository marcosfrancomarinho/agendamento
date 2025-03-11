import { Express } from 'express';
import { container } from 'tsyringe';
import { CreateSchedulingControllers } from '../controllers/CreateSchedulingControllers';
import { SearchSchedulingControllers } from '../controllers/SearchSchedulingControlllers';
import { PerfomServiceControllers } from '../controllers/PerformServiceControllers';
import { LoginAdminControllers } from '../controllers/LoginAdminControllers';
import { AuthenticationUserMiddlewares } from '../middlewares/AuthenticationUserMiddlewares';
import { RegisterAdminControllers } from '../controllers/RegisterAdminControllers';

export class Router {
  public static Initializer(app: Express): void {
    const authenticateUserMiddlewares = container.resolve(AuthenticationUserMiddlewares);
    const createSchedulingControllers = container.resolve(CreateSchedulingControllers);
    const searchSchedulingControllers = container.resolve(SearchSchedulingControllers);
    const perfomServiceControllers = container.resolve(PerfomServiceControllers);
    const loginAdminControllers = container.resolve(LoginAdminControllers);
    const registerAdminControllers = container.resolve(RegisterAdminControllers);

    app.post('/create-scheduler', createSchedulingControllers.create.bind(createSchedulingControllers));

    app.get(
      '/search-scheduler-date',
      authenticateUserMiddlewares.authenticate.bind(authenticateUserMiddlewares),
      searchSchedulingControllers.searchByDate.bind(searchSchedulingControllers)
    );

    app.get(
      '/search-all-scheduler',
      authenticateUserMiddlewares.authenticate.bind(authenticateUserMiddlewares),
      searchSchedulingControllers.searchByAll.bind(searchSchedulingControllers)
    );

    app.post(
      '/perfom-service',
      authenticateUserMiddlewares.authenticate.bind(authenticateUserMiddlewares),
      perfomServiceControllers.perfom.bind(perfomServiceControllers)
    );

    app.post('/login-admin', loginAdminControllers.login.bind(loginAdminControllers));

    app.post('/register-admin', registerAdminControllers.register.bind(registerAdminControllers));
  }
}
