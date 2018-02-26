const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const personsDb = require('./database/person-database');
const timersDb = require('./database/timer-database');

import {Schema} from './schema/index';

const options = {
    env: 'dev',
    port: parseInt(process.env.PORT || '3000'),
    routes: {
        graphql: '/graphql',
        graphiql: '/graphiql'
    }
};

export function main() {
    const app = express();

    app.use(helmet());
    app.use(morgan(options.env));

    app.use(
        options.routes.graphql,
        cors()
    );

    app.use(
        options.routes.graphql,
        bodyParser.json(),
        graphqlExpress({
            context: {
                ...personsDb,
                ...timersDb,
            },
            schema: Schema
        })
    );

    app.use(
        options.routes.graphiql,
        graphiqlExpress({endpointURL: options.routes.graphql})
    );

    app.listen(options.port,
        () => {
            console.log(`Go to http://localhost:${options.port}${options.routes.graphiql} to run queries!`);
        }
    );
}

main();
