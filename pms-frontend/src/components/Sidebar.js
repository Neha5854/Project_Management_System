import styles from "./Sidebar.module.css";

const LABELS = {
  overview: "Overview",
  goals: "Goals",
  approvals: "Approvals",
  feedback: "Feedback"
};

function Sidebar({ role, activeSection, onSectionChange, navItems }) {
  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.brand}>PMS</div>
        <p className={styles.caption}>Modern performance management workspace</p>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`${styles.navItem} ${
              activeSection === item ? styles.navItemActive : ""
            }`}
            onClick={() => onSectionChange(item)}
          >
            <span>{LABELS[item]}</span>
            <small>{role}</small>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
