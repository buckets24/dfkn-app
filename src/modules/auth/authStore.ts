import { CognitoUser } from 'amazon-cognito-identity-js';
import { PromiseValue } from 'type-fest';
import create, { StateSelector } from 'zustand';
import { requestAgentBySub } from '../agent/agentService';
import { requestClientBySub } from '../client/clientService';

export type AuthUserType =
  | PromiseValue<ReturnType<typeof requestAgentBySub>>
  | PromiseValue<ReturnType<typeof requestClientBySub>>;

export type Me = AuthUserType & { userType: 'AGENT' | 'CLIENT'; title?: string | null };

/**
 * Currently logged in user
 */
type AuthStore = {
  me: Me | null;
  setAuth: (authenticated: Me) => void;
  cognitoUser: CognitoUser | null;
  setCognitoUser: (cognitoUser: CognitoUser | null) => void;
  mediaRegion: string;
  setMediaRegion: (mediaRegion: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  /**
   * For dev purposes always set this.
   */
  me: null,
  cognitoUser: null,

  setAuth: (authenticated) => {
    set({ me: authenticated });
  },
  setCognitoUser: (cognitoUser) => set({ cognitoUser }),

  mediaRegion: 'eu-central-1',
  setMediaRegion: (mediaRegion) => set({ mediaRegion }),

  logout: () => set({ me: null, cognitoUser: null }),
}));

/**
 * Selectors
 */
export const getMe: StateSelector<AuthStore, Me | null> = (state) => state.me;
export const getCognitoUser: StateSelector<AuthStore, AuthStore['cognitoUser']> = (state) => state.cognitoUser;

/**
 * Type guards/helpers
 */
export const isAgent = (auth: Me): boolean => auth.userType === 'AGENT';
export const isClient = (auth: Me): boolean => auth.userType === 'CLIENT';
