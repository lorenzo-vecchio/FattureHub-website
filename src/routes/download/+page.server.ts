const GITHUB_OWNER = 'lorenzo-vecchio';
const GITHUB_REPO = 'FattureHub';
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
	data: ApiResponse;
	timestamp: number;
}

let cache: CacheEntry | null = null;

interface GithubAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

interface RawRelease {
	tag_name: string;
	name: string;
	prerelease: boolean;
	published_at: string;
	assets: { name: string; browser_download_url: string; size: number }[];
}

interface ApiResponse {
	latest: string;
	releases: Release[];
}

interface Release {
	tag_name: string;
	name: string;
	published_at: string;
	assets: { name: string; browser_download_url: string; size: number }[];
}

export async function load() {
	if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
		return { releases: cache.data.releases, latest: cache.data.latest };
	}

	try {
		const [latestRes, allRes] = await Promise.all([
			fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`),
			fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=50`)
		]);

		if (!latestRes.ok || !allRes.ok) {
			if (cache) {
				return { releases: cache.data.releases, latest: cache.data.latest };
			}
			return { releases: [], latest: '', error: 'Impossibile contattare GitHub.' };
		}

		const latest: { tag_name: string } = await latestRes.json();
		const all: RawRelease[] = await allRes.json();

		const releases: Release[] = all
			.filter(r => !r.prerelease && r.assets.length > 0)
			.map(r => ({
				tag_name: r.tag_name,
				name: r.name,
				published_at: r.published_at,
				assets: r.assets.map(a => ({
					name: a.name,
					browser_download_url: a.browser_download_url,
					size: a.size
				}))
			}));

		cache = { data: { latest: latest.tag_name, releases }, timestamp: Date.now() };

		return { releases, latest: latest.tag_name };
	} catch {
		if (cache) {
			return { releases: cache.data.releases, latest: cache.data.latest };
		}
		return { releases: [], latest: '', error: 'Errore di rete.' };
	}
}
