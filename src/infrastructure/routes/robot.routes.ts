import { graphqlHTTP } from "express-graphql";
import { RobotController } from "../controllers/robot.controller";
import schema from "../graphql/schema/schema";
import root from "../graphql/root";

export class RobotRoutes {
    public routes(app) {
        //Express API REST
        app.route(`/rest/run`).post(RobotController.runSimulation);
        //GraphQL
        app.use('/graphql/run', graphqlHTTP({
            schema,
            rootValue: root,
            graphiql: true,
        }));
    }
}