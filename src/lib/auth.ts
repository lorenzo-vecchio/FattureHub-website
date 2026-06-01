const BACKEND_URL = 'http://localhost:8080';

function dispatchAuthChange() {
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new CustomEvent('authchange'));
	}
}

function isTokenExpired(): boolean {
	const token = localStorage.getItem('fatturehub_access_token');
	if (!token) return true;
	try {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const payload = JSON.parse(atob(base64));
		return payload.exp * 1000 < Date.now();
	} catch {
		return true;
	}
}

export function isLoggedIn(): boolean {
	if (typeof window === 'undefined') return false;
	const token = localStorage.getItem('fatturehub_access_token');
	return !!token && !isTokenExpired();
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

export function saveAuth(data: { access_token: string; refresh_token: string; user: { id: string; email: string; name: string; verified: boolean } }) {
	localStorage.setItem('fatturehub_access_token', data.access_token);
	localStorage.setItem('fatturehub_refresh_token', data.refresh_token);
	localStorage.setItem('fatturehub_user', JSON.stringify(data.user));
	dispatchAuthChange();
}

export function logout() {
	localStorage.removeItem('fatturehub_access_token');
	localStorage.removeItem('fatturehub_refresh_token');
	localStorage.removeItem('fatturehub_user');
	dispatchAuthChange();
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
		saveAuth(data);
		return true;
	} catch {
		logout();
		return false;
	}
}

export async function tryRefreshAuth(): Promise<boolean> {
	if (typeof window === 'undefined') return false;
	if (!localStorage.getItem('fatturehub_access_token')) return false;
	if (!isTokenExpired()) return true;
	return refreshToken();
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
