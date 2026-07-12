/**
 * Resolve paths that are authored relative to the site root (MY_OC/).
 * Character profiles live under html/, so they need a ../ prefix.
 */
function siteUrl(path) {
  if (path == null || path === '') return path;
  const value = String(path);
  if (/^(https?:|data:|mailto:|blob:|\/|#)/i.test(value)) return value;

  const pathname = decodeURIComponent(location.pathname || '');
  const inHtmlFolder = /[/\\]html[/\\][^/\\]+\.html$/i.test(pathname);
  const normalized = value.replace(/^\.\.\//, '');
  return (inHtmlFolder ? '../' : '') + normalized;
}
