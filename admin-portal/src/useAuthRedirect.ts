import { goto } from '$app/navigation';
import type { User } from '@firebase/auth';

const useAuthRedirect = (user: User): void => {
	const pathname = window.location.pathname;
	if (user && pathname === '/') {
		goto('/home');
	} else if (!user && pathname !== '/') {
		goto('/');
	}
};

export default useAuthRedirect;
