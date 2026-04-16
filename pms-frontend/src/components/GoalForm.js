import { useState } from "react";
import api from "../services/api";
import styles from "./FormCard.module.css";

function GoalForm({ currentUser, onCreated }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a goal title.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = { title: trimmedTitle };
      console.log("[GoalForm] submitting goal payload:", payload);
      const response = await api.createGoal(payload, currentUser);
      console.log("[GoalForm] create goal response:", response);

      setSuccess(response.message);
      setTitle("");

      if (onCreated) {
        await onCreated();
      }
    } catch (submitError) {
      console.error("[GoalForm] create goal failed:", submitError);
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.cardHeader}>
        <h3>Create Goal</h3>
        <p>Submit a goal for manager approval.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="goal-title">Goal title</label>
        <input
          id="goal-title"
          type="text"
          placeholder="Example: Increase quarterly CSAT score"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
      {success ? <p className={styles.success}>{success}</p> : null}

      <button type="submit" className={styles.primaryButton} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit goal"}
      </button>
    </form>
  );
}

export default GoalForm;
