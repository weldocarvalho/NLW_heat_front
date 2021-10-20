import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';

export function LoginBox() {
	const { signInURL } = useContext(AuthContext);

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
