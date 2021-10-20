import { VscGithubInverted } from 'react-icons/vsc';

import styles from './styles.module.scss';

export function LoginBox() {
	return (
		<div className={styles.loginBoxWrapper}>
			<strong>entre e compartilhe sua mensagem</strong>
			<a href="#" className={styles.signInWithGithub}>
				<VscGithubInverted size="32" />
        entrar com github
			</a>
		</div>
	);
}
