export const typeDef = `
type UserType{
  id: String
  username: String
  password: String
  fname: String
  lname: String
  email: String
  jobtitle: String 
  company: String
  contactinfo: ContactinfoType
  socialaccts: [SocialAcctSingle]
  timers: [TimerType]
}
type ContactinfoType{
  tel: String
  mobile: String 
  fax: String 
  address: GeoPostal
}
type SocialAcctSingle{
  site: String
  profile: String 
}
type GeoPostal{
    street: String
    city: String
    state: String
    zip: String
    streetLine2: String
}
`;

export const personResolver = {
    Query: {
        getUser(root, args, ctx) {
            return ctx.findUser(args.id);
        },
        searchUsers(root, args, ctx) {
            return ctx.searchUsers(args.query);
        },
        searchUsersSpecific(root, args, ctx) {
            return ctx.searchUsersAgnostic({
                key: args.in,
                value: args.find,
                strict: args.strict
            })
        },
        users(root, args, ctx) {
            return ctx.users
        },
    },
    Mutation: {
        addUser(root, args, ctx) {
            return ctx.addUser(ctx.users, args)
        },
    },
    UserType: {
        timers(user, args, ctx) {
            return ctx.timers.filter(t=>{
                return t.user === user.id;
            })
        }
    },
    ContactinfoType: {},
    SocialAcctSingle: {},
};
