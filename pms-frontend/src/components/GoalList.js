import StatusBadge from "./StatusBadge";
import styles from "./GoalList.module.css";

function GoalList({
  title,
  goals,
  emptyMessage,
  canApprove = false,
  approvingId = "",
  onApprove
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <span>{goals.length} items</span>
      </div>

      {goals.length === 0 ? (
        <div className={styles.emptyState}>{emptyMessage}</div>
      ) : (
        <div className={styles.goalGrid}>
          {goals.map((goal) => (
            <article key={goal._id} className={styles.goalCard}>
              <div className={styles.goalTop}>
                <div>
                  <h4>{goal.title}</h4>
                  <p>{goal.description || "No description added yet."}</p>
                </div>
                <StatusBadge status={goal.status} />
              </div>

              <div className={styles.meta}>
                <span>Owner: {goal.createdBy}</span>
                <span>
                  {goal.status === "approved"
                    ? `Approved by ${goal.approvedBy || "manager"}`
                    : "Waiting for approval"}
                </span>
              </div>

              {canApprove && goal.status === "pending" ? (
                <button
                  type="button"
                  className={styles.approveButton}
                  onClick={() => onApprove(goal._id)}
                  disabled={approvingId === goal._id}
                >
                  {approvingId === goal._id ? "Approving..." : "Approve goal"}
                </button>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GoalList;
