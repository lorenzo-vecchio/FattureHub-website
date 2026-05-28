const BACKEND_URL = 'http://localhost:8080';

export function isLoggedIn(): boolean {
	if (typeof window === 'undefined') return false;
	return !!localStorage.getItem('fatturehub_access_token');
}

export function getUser(): { id: string; email: string; name: string; verified: boolean } | null {
	if (typeof window === 'undefined') return null;
	const raw = localStorage.getItem('fatturehub_user');
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export function logout() {
	localStorage.removeItem('fatturehub_access_token');
	localStorage.removeItem('fatturehub_refresh_token');
	localStorage.removeItem('fatturehub_user');
}

function getToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('fatturehub_access_token');
}

async function refreshToken(): Promise<boolean> {
	const refresh = localStorage.getItem('fatturehub_refresh_token');
	if (!refresh) return false;
	try {
		const res = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refresh }),
		});
		if (!res.ok) {
			logout();
			return false;
		}
		const data = await res.json();
		localStorage.setItem('fatturehub_access_token', data.access_token);
		localStorage.setItem('fatturehub_refresh_token', data.refresh_token);
		localStorage.setItem('fatturehub_user', JSON.stringify(data.user));
		return true;
	} catch {
		logout();
		return false;
	}
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
	const token = getToken();
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(options.headers as Record<string, string>),
	};
	if (token) headers['Authorization'] = `Bearer ${token}`;

	let res = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });

	if (res.status === 401 && localStorage.getItem('fatturehub_refresh_token')) {
		const refreshed = await refreshToken();
		if (refreshed) {
			headers['Authorization'] = `Bearer ${getToken()}`;
			res = await fetch(`${BACKEND_URL}${path}`, { ...options, headers });
		}
	}

	if (!res.ok) {
		const body = await res.json().catch(() => ({ error: res.statusText }));
		throw new Error(body.error || `HTTP ${res.status}`);
	}

	return res.json();
}
