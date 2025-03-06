import { Express } from 'express';
import { container } from 'tsyringe';
import { CheckDatasBodyRequestMiddlewares } from '../middlewares/CheckDatasBodyRequestMiddlewares';
import { CreateSchedulingControllers } from '../controllers/CreateSchedulingControllers';
import { SearchSchedulingControllers } from '../controllers/SearchSchedulingControlllers';
import { PerfomServiceControllers } from '../controllers/PerformServiceControllers';
import { LoginAdminControllers } from '../controllers/LoginAdminControllers';
import { AuthenticationUserMiddlewares } from '../middlewares/AuthenticationUserMiddlewares';
import { RegisterAdminControllers } from '../controllers/RegisterAdminControllers';

export class Router {
  public static Initializer(app: Express): void {
    const checkDatasBodyRequestMiddlewares = container.resolve(CheckDatasBodyRequestMiddlewares);
    const authenticateUserMiddlewares = container.resolve(AuthenticationUserMiddlewares);
    const createSchedulingControllers = container.resolve(CreateSchedulingControllers);
    const searchSchedulingControllers = container.resolve(SearchSchedulingControllers);
    const perfomServiceControllers = container.resolve(PerfomServiceControllers);
    const loginAdminControllers = container.resolve(LoginAdminControllers);
    const registerAdminControllers = container.resolve(RegisterAdminControllers);

    app.post(
      '/create-scheduler',
      checkDatasBodyRequestMiddlewares.checkAll.bind(checkDatasBodyRequestMiddlewares),
      createSchedulingControllers.create.bind(createSchedulingControllers)
    );

    app.get(
      '/search-scheduler-date',
      checkDatasBodyRequestMiddlewares.checkDate.bind(checkDatasBodyRequestMiddlewares),
      searchSchedulingControllers.searchByDate.bind(searchSchedulingControllers)
    );

    app.get('/search-all-scheduler', searchSchedulingControllers.searchByAll.bind(searchSchedulingControllers));

    app.post(
      '/perfom-service',
      authenticateUserMiddlewares.authenticate.bind(authenticateUserMiddlewares),
      checkDatasBodyRequestMiddlewares.checkId.bind(checkDatasBodyRequestMiddlewares),
      perfomServiceControllers.perfom.bind(perfomServiceControllers)
    );

    app.post(
      '/login-admin',
      checkDatasBodyRequestMiddlewares.checkLoginUser.bind(checkDatasBodyRequestMiddlewares),
      loginAdminControllers.login.bind(loginAdminControllers)
    );

    app.post(
      '/register-admin',
      authenticateUserMiddlewares.authenticate.bind(authenticateUserMiddlewares),
      checkDatasBodyRequestMiddlewares.checkRegisterUser.bind(checkDatasBodyRequestMiddlewares),
      registerAdminControllers.register.bind(registerAdminControllers)
    );
  }
}
