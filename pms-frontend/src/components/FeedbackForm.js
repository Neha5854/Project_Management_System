import { useState } from "react";
import api from "../services/api";
import styles from "./FormCard.module.css";

function FeedbackForm({ currentUser, onCreated }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitFeedback = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      setError("Please enter feedback before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.createFeedback({
        text,
        role: currentUser.role,
        author: currentUser.name
      });

      setSuccess(response.message);
      setText("");
      onCreated();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={submitFeedback}>
      <div className={styles.cardHeader}>
        <h3>Share Feedback</h3>
        <p>Capture quick, useful notes for the performance cycle.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="feedback-text">Feedback</label>
        <textarea
          id="feedback-text"
          rows="5"
          placeholder="Write constructive feedback"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
      {success ? <p className={styles.success}>{success}</p> : null}

      <button type="submit" className={styles.primaryButton} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
