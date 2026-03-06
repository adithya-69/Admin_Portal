export default function CompanyCard({ name, role, onRemove }) {
  return (
    <div className="dashboard-company-card">
      <div className="company-avatar"></div>

      <h4>{name}</h4>
      <p>{role}</p>

      <div className="company-actions">
        <button className="small-btn">View Jobs</button>
        <button className="danger-btn" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
