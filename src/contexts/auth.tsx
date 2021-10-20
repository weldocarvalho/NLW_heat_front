import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInURL: string;
};

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

const CLIENT_ID = '4d8bdc2fc4e39b93cbe3';

export function AuthProvider(props: AuthProvider) {
	const [user, setUser] = useState<User | null>(null);

	const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`;

	async function signIn(githubCode: string) {
		const response = await api.post<AuthResponse>('/authenticate', {
			code: githubCode,
		});

		const { token, user } = response.data;
		localStorage.setItem('@dowhile:token', token);
		setUser(user);
	}

	useEffect(() => {
		const token = localStorage.getItem('@dowhile:token');

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;

			api.get<User>('/profile').then((res) => {
				setUser(res.data);
			});
		}
	}, []);

	useEffect(() => {
		const url = window.location.href;

		const hasGithubCode = url.includes('?code=');

		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split('?code=');
			window.history.pushState({}, '', urlWithoutCode);

			signIn(githubCode);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ signInURL, user }}>
			{props.children}
		</AuthContext.Provider>
	);
}
