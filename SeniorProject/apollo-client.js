import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      //uri: `ws://localhost:4000/graphql`,
      uri: `ws://localhost:4000/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  //uri: 'http://localhost:4000/graphql',
  uri: "https://popflash.herokuapp.com/graphql",
  credentials: "same-origin",
});

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink,
      httplink
    )
  : httplink;

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
