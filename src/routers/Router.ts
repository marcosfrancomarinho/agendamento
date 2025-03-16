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
    const authenticationUserMiddlewares = container.resolve(AuthenticationUserMiddlewares);
    const createSchedulingControllers = container.resolve(CreateSchedulingControllers);
    const searchSchedulingControllers = container.resolve(SearchSchedulingControllers);
    const perfomServiceControllers = container.resolve(PerfomServiceControllers);
    const loginAdminControllers = container.resolve(LoginAdminControllers);
    const registerAdminControllers = container.resolve(RegisterAdminControllers);

    app.post('/create-scheduler', createSchedulingControllers.create.bind(createSchedulingControllers));

    app.get(
      '/search-scheduler-date',
      authenticationUserMiddlewares.authenticate.bind(authenticationUserMiddlewares),
      searchSchedulingControllers.searchByDate.bind(searchSchedulingControllers)
    );

    app.get(
      '/search-all-scheduler',
      authenticationUserMiddlewares.authenticate.bind(authenticationUserMiddlewares),
      searchSchedulingControllers.searchByAll.bind(searchSchedulingControllers)
    );

    app.post(
      '/perfom-service',
      authenticationUserMiddlewares.authenticate.bind(authenticationUserMiddlewares),
      perfomServiceControllers.perfom.bind(perfomServiceControllers)
    );

    app.post('/login-admin', loginAdminControllers.login.bind(loginAdminControllers));

    app.post(
      '/register-admin',
      authenticationUserMiddlewares.authenticate.bind(authenticationUserMiddlewares),
      registerAdminControllers.register.bind(registerAdminControllers)
    );
  }
}
