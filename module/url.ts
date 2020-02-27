// Terrible shim for Node's URL module. I miss Node.
export function resolveURLs (...urlFragments: string[]) {
    return urlFragments.map(x => x.replace(/^\/|\/$/, '')).join('/');
}