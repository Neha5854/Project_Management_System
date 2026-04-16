import GoalList from "../components/GoalList";
import FeedbackList from "../components/FeedbackList";
import StatCard from "../components/StatCard";
import useDashboardData from "../hooks/useDashboardData";
import styles from "./DashboardPage.module.css";

function AdminDashboard({ currentUser, activeSection }) {
  const { goals, feedback, loading, error } = useDashboardData(currentUser);

  return (
    <div className={styles.page}>
      <section className={styles.statsGrid}>
        <StatCard label="All Goals" value={goals.length} tone="accent" />
        <StatCard
          label="Pending Goals"
          value={goals.filter((goal) => goal.status === "pending").length}
          tone="warm"
        />
        <StatCard
          label="Approved Goals"
          value={goals.filter((goal) => goal.status === "approved").length}
        />
        <StatCard label="All Feedback" value={feedback.length} />
      </section>

      {loading ? <p className={`${styles.message} ${styles.loading}`}>Loading dashboard data...</p> : null}
      {error ? <p className={`${styles.message} ${styles.error}`}>{error}</p> : null}

      {activeSection === "overview" ? (
        <section className={styles.contentGrid}>
          <GoalList
            title="Recently Submitted Goals"
            goals={goals.slice(0, 4)}
            emptyMessage="No goals have been submitted yet."
          />
          <FeedbackList feedback={feedback.slice(0, 4)} />
        </section>
      ) : null}

      {activeSection === "goals" ? (
        <GoalList
          title="All Goals"
          goals={goals}
          emptyMessage="No goals have been submitted yet."
        />
      ) : null}

      {activeSection === "feedback" ? <FeedbackList feedback={feedback} /> : null}
    </div>
  );
}

export default AdminDashboard;
