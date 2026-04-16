import styles from "./FeedbackList.module.css";

function FeedbackList({ feedback }) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h3>Recent Feedback</h3>
        <span>{feedback.length} entries</span>
      </div>

      {feedback.length === 0 ? (
        <div className={styles.emptyState}>No feedback submitted yet.</div>
      ) : (
        <div className={styles.stack}>
          {feedback.map((item) => (
            <article key={item._id} className={styles.feedbackCard}>
              <div className={styles.meta}>
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FeedbackList;
