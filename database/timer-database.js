export const timers = require('./fixtures')
    .timers;

export const findTimer = (id) => {
    return timers.find(timer => {
        return timer.id === id;
    })
}

export const addTimer = (timer) => {
    timers.push(timer);
    return timer;
}

export const searchTimersAgnostic = (query) => {
    return timers.filter(timer => {
        return query.strict ?
            timer[query.key] === query.value
            : timer[query.key].indexOf(query.value) > -1
    })
}