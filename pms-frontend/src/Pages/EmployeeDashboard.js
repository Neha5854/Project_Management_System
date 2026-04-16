import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import StatCard from "../components/StatCard";
import useDashboardData from "../hooks/useDashboardData";
import styles from "./DashboardPage.module.css";

function EmployeeDashboard({ currentUser, activeSection }) {
  const { goals, feedback, loading, error, refresh } = useDashboardData(currentUser);
  const pendingGoals = goals.filter((goal) => goal.status === "pending").length;
  const approvedGoals = goals.filter((goal) => goal.status === "approved").length;

  return (
    <div className={styles.page}>
      <section className={styles.statsGrid}>
        <StatCard label="My Goals" value={goals.length} tone="accent" />
        <StatCard label="Pending Approval" value={pendingGoals} tone="warm" />
        <StatCard label="Approved Goals" value={approvedGoals} />
        <StatCard label="Feedback Shared" value={feedback.length} />
      </section>

      {loading ? <p className={`${styles.message} ${styles.loading}`}>Loading dashboard data...</p> : null}
      {error ? <p className={`${styles.message} ${styles.error}`}>{error}</p> : null}

      {activeSection === "overview" ? (
        <section className={styles.contentGrid}>
          <GoalForm currentUser={currentUser} onCreated={refresh} />
          <GoalList
            title="My Goal Status"
            goals={goals.slice(0, 4)}
            emptyMessage="You have not created any goals yet."
          />
        </section>
      ) : null}

      {activeSection === "goals" ? (
        <div className={styles.singleColumn}>
          <GoalForm currentUser={currentUser} onCreated={refresh} />
          <GoalList
            title="All My Goals"
            goals={goals}
            emptyMessage="You have not created any goals yet."
          />
        </div>
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

export default EmployeeDashboard;
