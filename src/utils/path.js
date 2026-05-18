export const resolvePath = (path) => {
  if (!path) return "";
  
  // If it's an external link, return it as is
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("#")) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  
  // If path starts with "/", we prepend base path
  if (path.startsWith("/")) {
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    if (cleanBase && !path.startsWith(cleanBase)) {
      return `${cleanBase}${path}`;
    }
  }
  
  return path;
};
