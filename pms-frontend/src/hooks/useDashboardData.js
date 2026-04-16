import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function useDashboardData(currentUser) {
  const [goals, setGoals] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    if (!currentUser?.role || !currentUser?.name) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [goalsResponse, feedbackResponse] = await Promise.all([
        api.getGoals(currentUser),
        api.getFeedback(currentUser)
      ]);

      setGoals(goalsResponse.data || []);
      setFeedback(feedbackResponse.data || []);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    goals,
    feedback,
    loading,
    error,
    refresh: loadDashboard
  };
}

export default useDashboardData;
