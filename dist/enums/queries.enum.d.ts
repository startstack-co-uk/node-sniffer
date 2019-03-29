export declare const _totalTracking = "SELECT sum(count) as total from requests";
export declare const _totalPerMethod = "SELECT method, sum(count)as total from requests group by method";
export declare const _totalPerPath = "SELECT path, sum(count)as total from requests group by path";
export declare const _totalPerPathMethodCombo = "SELECT path, method, count as total from requests where path = '?' and method = '?'";
