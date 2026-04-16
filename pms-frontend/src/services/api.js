import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
});

const extractResponse = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Unable to connect to the server."
    );
  }
};

const getViewerParams = (user, extraParams = {}) => ({
  viewerRole: user.role,
  viewerName: user.name,
  ...extraParams
});

const getUserHeaders = (user = {}) => ({
  "x-user-role": user.role || "employee",
  "x-user-name": user.name || "Employee"
});

const api = {
  healthCheck: () => extractResponse(client.get("/health")),
  getGoals: (user, filters = {}) =>
    extractResponse(client.get("/goals", { params: getViewerParams(user, filters) })),
  createGoal: (payload, user) => {
    console.log("[api.createGoal] POST /goals payload:", payload);
    console.log("[api.createGoal] user headers:", getUserHeaders(user));

    return extractResponse(
      client.post("/goals", payload, {
        headers: getUserHeaders(user)
      })
    );
  },
  approveGoal: (goalId, approver) =>
    extractResponse(
      client.put(`/goals/${goalId}/approve`, {
        approverName: approver.name,
        approverRole: approver.role
      })
    ),
  getFeedback: (user) =>
    extractResponse(client.get("/feedback", { params: getViewerParams(user) })),
  createFeedback: (payload) => extractResponse(client.post("/feedback", payload))
};

export default api;
