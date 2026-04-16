import { useState } from "react";
import GoalList from "../components/GoalList";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import StatCard from "../components/StatCard";
import useDashboardData from "../hooks/useDashboardData";
import api from "../services/api";
import styles from "./DashboardPage.module.css";

function ManagerDashboard({ currentUser, activeSection }) {
  const { goals, feedback, loading, error, refresh } = useDashboardData(currentUser);
  const [approvingId, setApprovingId] = useState("");
  const [actionError, setActionError] = useState("");
  const pendingGoals = goals.filter((goal) => goal.status === "pending");

  const handleApprove = async (goalId) => {
    setApprovingId(goalId);
    setActionError("");

    try {
      await api.approveGoal(goalId, currentUser);
      refresh();
    } catch (approveError) {
      setActionError(approveError.message);
    } finally {
      setApprovingId("");
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.statsGrid}>
        <StatCard label="Pending Approvals" value={pendingGoals.length} tone="accent" />
        <StatCard
          label="Approved Goals"
          value={goals.filter((goal) => goal.status === "approved").length}
        />
        <StatCard label="Total Goals" value={goals.length} tone="warm" />
        <StatCard label="Feedback Entries" value={feedback.length} />
      </section>

      {loading ? <p className={`${styles.message} ${styles.loading}`}>Loading dashboard data...</p> : null}
      {error ? <p className={`${styles.message} ${styles.error}`}>{error}</p> : null}
      {actionError ? <p className={`${styles.message} ${styles.error}`}>{actionError}</p> : null}

      {activeSection === "overview" ? (
        <section className={styles.contentGrid}>
          <GoalList
            title="Goals Waiting for Approval"
            goals={pendingGoals.slice(0, 4)}
            emptyMessage="No pending approvals right now."
            canApprove
            approvingId={approvingId}
            onApprove={handleApprove}
          />
          <FeedbackForm currentUser={currentUser} onCreated={refresh} />
        </section>
      ) : null}

      {activeSection === "approvals" ? (
        <GoalList
          title="All Pending Approvals"
          goals={pendingGoals}
          emptyMessage="No pending approvals right now."
          canApprove
          approvingId={approvingId}
          onApprove={handleApprove}
        />
      ) : null}

      {activeSection === "feedback" ? (
        <section className={styles.contentGrid}>
          <FeedbackForm currentUser={currentUser} onCreated={refresh} />
          <FeedbackList feedback={feedback} />
        </section>
      ) : null}
    </div>
  );
}

export default ManagerDashboard;
