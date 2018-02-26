import {merge} from "lodash";
import {personResolver} from './person-type'
import {timerResolver} from "./timer-type";

export const typeDef = `
# Root Query
type Query {
    # users 
    getUser(id: String!):UserType
    searchUsers(query: String!):[UserType]
    searchUsersSpecific(in:String!, find:String!, strict:Boolean!):[UserType]
    users: [UserType]
    # timers 
    getTimer(id: String!):TimerType
    timers:[TimerType]
    searchTimers(in:String!, find:String!, strict:Boolean!):[TimerType]
}
type Mutation{
    addUser(fname: String!, lname: String!, email:String!, username:String!, password:String!): UserType
    addTimer(start: String!):TimerType
}
`;

export const resolver = merge(
    timerResolver,
    personResolver
);