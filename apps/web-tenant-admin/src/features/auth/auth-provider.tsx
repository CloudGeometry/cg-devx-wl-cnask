import { ApolloError, useApolloClient } from '@apollo/client';
import {
  LoginInput,
  useLoginMutation,
  useMeQuery,
  UserFieldsFragment
} from '@cnask/utils/api-tenant';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import {
  ACCESS_TOKEN,
  getToken,
  REFRESH_TOKEN,
  removeTokens,
  setToken
} from './utils';
import jwtDecode from 'jwt-decode';
import { createMongoAbility } from '@casl/ability';
import { AbilityContext } from '@cnask/casl/feature';

export type AuthContextType = {
  user: UserFieldsFragment | null;

  login: {
    loading: boolean;
    error: ApolloError | undefined;
    action: (data: LoginInput, cb: VoidFunction) => Promise<void>;
  };

  logout: {
    loading: boolean;
    action: (cb: VoidFunction) => Promise<void>;
  };
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const client = useApolloClient();
  const token = getToken();

  const { loading } = useMeQuery({
    skip: !token,
    onCompleted: (data) => {
      if (data?.me?.id) {
        setUser(data.me);
      }
    }
  });

  const ability = useMemo(() => {
    if (!token) {
      return createMongoAbility([
        {
          action: 'read',
          subject: 'all'
        }
      ]);
    }
    const decoded: {
      permissions: any[];
    } = jwtDecode(token);

    const permissions = decoded.permissions;

    return createMongoAbility(permissions || []);
  }, [token]);

  const [user, setUser] = useState<UserFieldsFragment | null>(null);

  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useLoginMutation({
      onCompleted: (response) => {
        setToken(response.login.accessToken, ACCESS_TOKEN);
        setToken(response.login.refreshToken, REFRESH_TOKEN);
        setUser(response.login.user);
      }
    });

  const login = useCallback(
    async (data: LoginInput, cb: () => void): Promise<void> => {
      await loginMutation({
        variables: { data }
      });
      cb();
    },
    [loginMutation]
  );

  const logout = useCallback(
    async (cb: VoidFunction): Promise<void> => {
      await client.resetStore();
      setUser(null);
      removeTokens();

      cb();
    },
    [client]
  );

  return (
    <AbilityContext.Provider value={ability}>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          user,
          login: {
            action: login,
            error: loginError,
            loading: loginLoading
          },
          logout: {
            action: logout,
            loading: false
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    </AbilityContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
