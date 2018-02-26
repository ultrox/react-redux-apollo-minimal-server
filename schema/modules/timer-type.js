export const typeDef = `
type TimerType{
  id: String 
  label: String
  user: String
  description: String 
  active: Boolean
  start: String
  end: String
  loop: String 
  tags: [String]
  worker: UserType
}`;

export const timerResolver = {
    Query: {
        timers(root, args, ctx) {
            return ctx.timers;
        },
        getTimer(root, args, ctx) {
            return ctx.findTimer(args.id)
        },
        searchTimers(root, args, ctx) {
            return ctx.searchTimersAgnostic({
                key: args.in,
                value: args.find,
                strict: args.strict
            })
        }
    },
    Mutation: {
        addTimer(root, args, ctx) {
            return ctx.addLoop(ctx.users, args)
        },
    },
    TimerType: {
        worker(timer, args, ctx) {
            return ctx.users.find(u => u.id === timer.user)
        }
    }
};

