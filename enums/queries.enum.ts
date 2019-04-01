
export const _totalTracking = "SELECT sum(count) as total from requests";

export const _totalPerMethod = "SELECT method, sum(count)as total from requests group by method";

export const _totalPerPath = "SELECT path, sum(count)as total from requests group by path";

export const _totalPerPathMethodCombo = "SELECT path, method, count as total from requests where path = '?' and method = '?'";

export const _dbAnalytics = "select (select count(*) from requests where count > 0) as trackedRoutes,(select count(*) from requests) as totalRoutes";

// FOLLOWING WILL BE STORAGE-TIME RELATED QUERIES FOR THE ABOVE CASES