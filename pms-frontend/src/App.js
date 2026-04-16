import { useMemo, useState } from "react";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import ManagerDashboard from "./Pages/ManagerDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/navbar";
import styles from "./App.module.css";

const ROLE_OPTIONS = [
  {
    value: "employee",
    label: "Employee",
    description: "Create goals, track approvals, and submit feedback."
  },
  {
    value: "manager",
    label: "Manager",
    description: "Review pending goals and keep the team moving."
  },
  {
    value: "admin",
    label: "Admin",
    description: "Monitor overall progress across goals and feedback."
  }
];

const NAV_ITEMS = {
  employee: ["overview", "goals", "feedback"],
  manager: ["overview", "approvals", "feedback"],
  admin: ["overview", "goals", "feedback"]
};

function App() {
  const [currentUser, setCurrentUser] = useState({ role: "", name: "" });
  const [activeSection, setActiveSection] = useState("overview");
  const [hasEnteredWorkspace, setHasEnteredWorkspace] = useState(false);

  const selectedRole = useMemo(
    () => ROLE_OPTIONS.find((item) => item.value === currentUser.role),
    [currentUser.role]
  );

  if (!hasEnteredWorkspace) {
    return (
      <div className={styles.authShell}>
        <div className={styles.authCard}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Performance Management System</span>
            <h1>Simple goal tracking with a cleaner dashboard experience.</h1>
            <p>
              Pick a role, enter a display name, and test the full employee,
              manager, and admin workflow locally.
            </p>
          </div>

          <div className={styles.roleGrid}>
            {ROLE_OPTIONS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`${styles.roleCard} ${
                  currentUser.role === item.value ? styles.roleCardActive : ""
                }`}
                onClick={() => {
                  setCurrentUser((previous) => ({ ...previous, role: item.value }));
                  setActiveSection("overview");
                }}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>

          <div className={styles.nameField}>
            <label htmlFor="name">Display Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={currentUser.name}
              onChange={(event) =>
                setCurrentUser((previous) => ({
                  ...previous,
                  name: event.target.value
                }))
              }
            />
          </div>

          <button
            type="button"
            className={styles.enterButton}
            disabled={!currentUser.role || !currentUser.name.trim()}
            onClick={() => setHasEnteredWorkspace(true)}
          >
            Continue to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appShell}>
      <Sidebar
        role={currentUser.role}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        navItems={NAV_ITEMS[currentUser.role]}
      />

      <main className={styles.mainPanel}>
        <Navbar
          currentUser={currentUser}
          roleLabel={selectedRole?.label}
          onSwitchRole={() => {
            setCurrentUser({ role: "", name: "" });
            setActiveSection("overview");
            setHasEnteredWorkspace(false);
          }}
        />

        {currentUser.role === "employee" ? (
          <EmployeeDashboard
            currentUser={currentUser}
            activeSection={activeSection}
          />
        ) : null}
        {currentUser.role === "manager" ? (
          <ManagerDashboard
            currentUser={currentUser}
            activeSection={activeSection}
          />
        ) : null}
        {currentUser.role === "admin" ? (
          <AdminDashboard currentUser={currentUser} activeSection={activeSection} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
