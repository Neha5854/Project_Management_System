import styles from "./StatCard.module.css";

function StatCard({ label, value, tone = "default" }) {
  return (
    <div className={`${styles.card} ${styles[tone] || ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default StatCard;
