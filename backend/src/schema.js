export const schema = `
    type Query {
        getUserInfo(handle: String!): User!
    }

    type Tweet {
        tweet_id: String!
        tweet: String!
        handle: String!
        created_at: String!
    }

    type TweetConnection {
        items: [Tweet!]!
        nextToken: String
    }

    type User {
        name: String!
        description: String!
        followers_count: Int!
        following: [String!]!
        topTweet: Tweet
        tweets(limit: Int!, nextToken: String): TweetConnection
    }
`;
