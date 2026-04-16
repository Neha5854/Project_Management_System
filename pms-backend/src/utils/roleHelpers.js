export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  ADMIN: "admin"
};

export const getViewerContext = (req) => ({
  viewerRole: req.query.viewerRole || req.body.viewerRole || req.headers["x-user-role"],
  viewerName: req.query.viewerName || req.body.viewerName || req.headers["x-user-name"]
});
