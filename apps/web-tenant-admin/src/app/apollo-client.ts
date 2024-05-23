import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FetchResult,
  GraphQLRequest,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import {
  ACCESS_TOKEN,
  getToken,
  REFRESH_TOKEN,
  setToken
} from '../features/auth/utils';
import {
  RefreshTokenDocument,
  TokenFieldsFragment
} from '@cnask/utils/api-tenant';
import { GraphQLError } from 'graphql';
import { TypedTypePolicies } from '@cnask/utils/api-tenant';

const typePolicies: TypedTypePolicies = {};

const cache = new InMemoryCache({ typePolicies });

/**
 * Provide opportunity to make GraphQL queries over HTTP.
 */
const uri = import.meta.env.VITE_API_URL ?? "/api/graphql";
const httpLink = createHttpLink({ uri });

function isRefreshRequest(operation: GraphQLRequest) {
  return operation.operationName === 'refreshToken';
}

// Returns accesstoken if operation is not a refresh token request
function returnTokenDependingOnOperation(operation: GraphQLRequest) {
  if (isRefreshRequest(operation)) return getToken(REFRESH_TOKEN) || '';
  else return getToken(ACCESS_TOKEN) || '';
}

const authLink = setContext((operation, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = returnTokenDependingOnOperation(operation);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          console.log(operation);
          if (err?.extensions?.originalError?.message === 'Invalid token') {
            localStorage.clear();
            window.location.reload();
          }

          // ignore 401 error for a refresh request
          if (operation.operationName === 'RefreshToken') {
            return;
          }

          const observable = new Observable<FetchResult<Record<string, any>>>(
            (observer) => {
              // used an annonymous function for using an async function
              (async () => {
                try {
                  const accessToken = await refreshToken();

                  if (!accessToken) {
                    throw new GraphQLError('Empty AccessToken');
                  }

                  // Retry the failed request
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer)
                  };

                  forward(operation).subscribe(subscriber);
                } catch (err) {
                  console.log({ err });

                  observer.error(err);
                }
              })();
            }
          );

          return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate<{
      refreshToken: TokenFieldsFragment;
    }>({
      mutation: RefreshTokenDocument,
      variables: { refreshToken: getToken(REFRESH_TOKEN) || '' }
    });

    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;

    setToken(accessToken || '');

    return accessToken;
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development'
});

export default client;
