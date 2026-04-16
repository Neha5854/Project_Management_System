import styles from "./Navbar.module.css";

function Navbar({ currentUser, roleLabel, onSwitchRole }) {
  return (
    <header className={styles.navbar}>
      <div>
        <p className={styles.eyebrow}>Workspace</p>
        <h2>{roleLabel} Dashboard</h2>
      </div>

      <div className={styles.actions}>
        <div className={styles.identity}>
          <strong>{currentUser.name}</strong>
          <span>{currentUser.role}</span>
        </div>

        <button type="button" onClick={onSwitchRole}>
          Switch role
        </button>
      </div>
    </header>
  );
}

export default Navbar;
