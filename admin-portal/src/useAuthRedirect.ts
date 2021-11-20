import { authProvider } from './auth';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

const useAuthRedirect = (): void => {
	const { user } = get(authProvider);
	const href = window.location.href;
	if (user && href === '') {
		goto('/home');
	} else if (!user && href !== '') {
		goto('/');
	}
};

export default useAuthRedirect;
