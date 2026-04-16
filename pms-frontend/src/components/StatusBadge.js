import styles from "./StatusBadge.module.css";

function StatusBadge({ status }) {
  return (
    <span
      className={`${styles.badge} ${
        status === "approved" ? styles.approved : styles.pending
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
