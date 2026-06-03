export interface Asset {
	name: string;
	browser_download_url: string;
	size: number;
}

export interface Release {
	tag_name: string;
	name: string;
	published_at: string;
	assets: Asset[];
}

export interface OSConfig {
	id: string;
	label: string;
}

export const osConfigs = [
	{ id: 'macos-arm64', label: 'macOS (Apple Silicon)' },
	{ id: 'macos-x64', label: 'macOS (Intel)' },
	{ id: 'windows', label: 'Windows' },
	{ id: 'linux-deb', label: 'Linux (Debian/Ubuntu)' },
	{ id: 'linux-appimage', label: 'Linux (AppImage)' },
	{ id: 'linux-rpm', label: 'Linux (RPM/Fedora)' },
] as const satisfies readonly OSConfig[];

export function formatSize(bytes: number): string {
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(1)} MB`;
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('it-IT', {
		year: 'numeric', month: 'long', day: 'numeric'
	});
}

export function detectOS(browser: boolean): string {
	if (!browser) return 'macos-arm64';
	const ua = navigator.userAgent;
	if (/mac|darwin/i.test(ua)) {
		return /arm|aarch64/i.test(ua) ? 'macos-arm64' : 'macos-x64';
	}
	if (/win/i.test(ua)) return 'windows';
	if (/linux/i.test(ua)) return detectLinuxDistro();
	return 'macos-arm64';
}

function detectLinuxDistro(): string {
	const ua = navigator.userAgent;
	if (/ubuntu|debian|mint|pop!/i.test(ua)) return 'linux-deb';
	if (/fedora|rhel|centos|suse/i.test(ua)) return 'linux-rpm';
	return 'linux-deb';
}

export async function detectOSAsync(browser: boolean): Promise<string> {
	if (!browser) return 'macos-arm64';
	const ua = navigator.userAgent;
	if (/win/i.test(ua)) return 'windows';
	if (/linux/i.test(ua)) return detectLinuxDistro();
	if (!/mac|darwin/i.test(ua)) return 'macos-arm64';

	if (/arm|aarch64/i.test(ua)) return 'macos-arm64';

	try {
		const uaData = (navigator as any).userAgentData;
		if (uaData?.getHighEntropyValues) {
			const data = await uaData.getHighEntropyValues(['architecture']);
			if (data.architecture === 'arm') return 'macos-arm64';
		}
	} catch {}

	return 'macos-x64';
}

export function matchAsset(name: string, osId: string): boolean {
	switch (osId) {
		case 'macos-arm64':
			return name.includes('aarch64') && (name.endsWith('.dmg') || name.endsWith('.tar.gz'));
		case 'macos-x64':
			return name.includes('_x64') && !name.includes('aarch64') && (name.endsWith('.dmg') || name.endsWith('.tar.gz'));
		case 'windows':
			return name.endsWith('.exe') || name.endsWith('.msi');
		case 'linux-deb':
			return name.endsWith('.deb');
		case 'linux-appimage':
			return name.endsWith('.AppImage');
		case 'linux-rpm':
			return name.endsWith('.rpm');
		default:
			return false;
	}
}

export function getPrimaryAsset(assets: Asset[], osId: string): Asset | null {
	switch (osId) {
		case 'macos-arm64':
			return assets.find(a => a.name.endsWith('.dmg') && a.name.includes('aarch64'))
				?? assets.find(a => a.name.endsWith('.tar.gz') && a.name.includes('aarch64'))
				?? null;
		case 'macos-x64':
			return assets.find(a => a.name.endsWith('.dmg') && a.name.includes('_x64') && !a.name.includes('aarch64'))
				?? assets.find(a => a.name.endsWith('.tar.gz') && a.name.includes('_x64') && !a.name.includes('aarch64'))
				?? null;
		case 'windows':
			return assets.find(a => a.name.endsWith('.exe'))
				?? assets.find(a => a.name.endsWith('.msi'))
				?? null;
		case 'linux-deb':
			return assets.find(a => a.name.endsWith('.deb')) ?? null;
		case 'linux-appimage':
			return assets.find(a => a.name.endsWith('.AppImage')) ?? null;
		case 'linux-rpm':
			return assets.find(a => a.name.endsWith('.rpm')) ?? null;
		default:
			return null;
	}
}

export function getAltAssets(assets: Asset[], osId: string): Asset[] {
	const primary = getPrimaryAsset(assets, osId);
	return assets.filter(a => matchAsset(a.name, osId) && a !== primary);
}
