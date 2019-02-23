export const resolvers = {
    Query: {
        getUserInfo: (root, args) => getUserInfo(args),
    },
    User: {
        tweets: (obj, args) => getPaginatedTweets(obj.handle, args),
    },
};