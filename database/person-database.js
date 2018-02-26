export const users = require('./fixtures')
    .users;

const normalizeFindString = (haystack, needle) => {
    return haystack.toLowerCase()
        .indexOf(needle) > -1;
}

export const findUser = (id) => {
    return users.find(user => {
        return user.id === id;
    })
}

export const searchUsers = (query) => {
    query = query.toLowerCase();
    return users.filter(user => {
        return (
            normalizeFindString(user.fname, query) ||
            normalizeFindString(user.lname, query) ||
            normalizeFindString(user.email, query) ||
            normalizeFindString(user.jobtitle, query) ||
            normalizeFindString(user.company, query) ||
            normalizeFindString(`${user.fname} ${user.lname}`, query)
        )
    })
}

export const searchUsersAgnostic = (query) => {
    return users.filter(user => {
        return query.strict ?
            user[query.key].toLowerCase() === query.value.toLowerCase() :
            user[query.key].toLowerCase().indexOf(query.value.toLowerCase()) > -1
    })
}