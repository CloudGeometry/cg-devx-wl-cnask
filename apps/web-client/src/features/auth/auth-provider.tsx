import { ApolloError, useApolloClient } from '@apollo/client';
import {
  AuthFieldsFragment,
  LoginInput,
  MeDocument,
  MeFieldsFragment,
  useLoginMutation,
  useMeQuery,
  UserAddInput,
  UserFieldsFragment,
  useSignUpMutation
} from '@cnask/utils/api-client';
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
} from '../../app/utils';
import jwtDecode from 'jwt-decode';
import { createMongoAbility } from '@casl/ability';
import { AbilityContext } from '@cnask/casl/feature';

export type AuthContextType = {
  user: MeFieldsFragment | null;

  login: {
    loading: boolean;
    error: ApolloError | undefined;
    action: (data: LoginInput, cb: VoidFunction) => Promise<void>;
  };

  register: {
    loading: boolean;
    error: ApolloError | undefined;
    action: (data: UserAddInput, cb: VoidFunction) => Promise<void>;
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

  const { loading } = useMeQuery({
    skip: !token,
    onCompleted: (data) => {
      if (data?.me?.id) {
        setUser(data.me);

        //i18n will check for LS value on init
        data.me?.profile?.locale &&
          localStorage.setItem('i18nextLng', data.me?.profile?.locale);
      }
    }
  });
  const [user, setUser] = useState<UserFieldsFragment | null>(null);

  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useLoginMutation();
  const [signUpMutation, { loading: signupLoading, error: signUpError }] =
    useSignUpMutation();

  const onCompleted = useCallback(
    (data: AuthFieldsFragment) => {
      if (data?.user && data?.accessToken) {
        client.cache.writeQuery({
          query: MeDocument,
          data: { me: data.user }
        });
        setUser(data.user);
        setToken(data.accessToken, ACCESS_TOKEN);
        setToken(data.refreshToken, REFRESH_TOKEN);

        const decoded: {
          permissions: any[];
        } = jwtDecode(data.accessToken);
        ability.update(decoded.permissions || []);
      }
    },
    [client, ability]
  );

  const login = useCallback(
    async (data: LoginInput, cb: () => void): Promise<void> => {
      await loginMutation({
        variables: { data },
        onCompleted: (data) => onCompleted(data.login)
      });
      cb();
    },
    [loginMutation, onCompleted]
  );

  const register = useCallback(
    async (data: UserAddInput, cb: VoidFunction): Promise<void> => {
      await signUpMutation({
        variables: { data },
        onCompleted: (data) => onCompleted(data.signup)
      });

      cb();
    },
    [signUpMutation, onCompleted]
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
            loading: loading
          },

          register: {
            action: register,
            error: signUpError,
            loading: signupLoading
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
