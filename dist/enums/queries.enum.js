"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._totalTracking = "SELECT sum(count) as total from requests";
exports._totalPerMethod = "SELECT method, sum(count)as total from requests group by method";
exports._totalPerPath = "SELECT path, sum(count)as total from requests group by path";
exports._totalPerPathMethodCombo = "SELECT path, method, count as total from requests where path = '?' and method = '?'";
//# sourceMappingURL=queries.enum.js.map