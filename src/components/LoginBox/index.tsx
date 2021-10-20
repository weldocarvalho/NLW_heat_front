import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../services/api';

import styles from './styles.module.scss';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

const CLIENT_ID = '4d8bdc2fc4e39b93cbe3';

export function LoginBox() {
	const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}`;

	async function signIn(githubCode: string) {
		const response = await api.post<AuthResponse>('/authenticate', {
			code: githubCode,
		});

		const { token } = response.data;

		localStorage.setItem('@dowhile:token', token);
	}

	useEffect(() => {
		const url = window.location.href;

		const hasGithubCode = url.includes('?code=');

		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split('?code=');
			window.history.pushState({}, '', urlWithoutCode);

			signIn(githubCode);
		}
	});

	return (
		<div className={styles.loginBoxWrapper}>
			<strong>entre e compartilhe sua mensagem</strong>
			<a href={signInURL} className={styles.signInWithGithub}>
				<VscGithubInverted size="32" />
        entrar com github
			</a>
		</div>
	);
}
