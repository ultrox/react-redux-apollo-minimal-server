import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";

const modules = [
    require('./modules/query'),
    require('./modules/person-type'),
    require('./modules/timer-type'),
];

const mainDefs = [
    `schema {
        query: Query,
        mutation: Mutation
    } `,
];

const resolvers = modules
    .map(m => {
        return m.resolver;
    })
    .filter(res => {
        return !!res;
    });

const typeDefs = mainDefs
    .concat(
        modules
            .map(m => {
                return m.typeDef
            })
            .filter(res => {
                return !!res
            })
    );

const Schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

export {
    Schema
}