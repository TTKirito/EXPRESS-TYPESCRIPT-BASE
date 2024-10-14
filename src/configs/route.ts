import methodOverride from "method-override";
import NotFoundError from "../exceptions/notFoundError";
import baseRouter from "../api/router";
import { asyncException } from "../utils/Exception";
import swaggerUi from "swagger-ui-express";
import { api } from "../docs/api";

export const configRouter = (app: any) => {
  app.use(methodOverride("X-HTTP-Method-Override"));
  app.use(
    methodOverride((req) => {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;

        return method;
      }

      return undefined;
    })
  );
  app.use(baseRouter);

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(api(3000), {
      customSiteTitle: "BESTFOODY - Documentation",
    })
  );

  app.all(
    "*",
    asyncException(async () => {
      throw new NotFoundError();
    })
  );
};

export default {
  configRouter,
};
