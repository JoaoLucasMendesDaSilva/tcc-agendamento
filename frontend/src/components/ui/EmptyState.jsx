function EmptyState({ action, children, Icone, title }) {
  return (
    <div className="dashboard-empty operational-empty">
      {Icone && (
        <span className="empty-icon" aria-hidden="true">
          <Icone size={24} strokeWidth={2} />
        </span>
      )}
      <div>
        <strong>{title}</strong>
        {children && <p>{children}</p>}
        {action}
      </div>
    </div>
  );
}

export default EmptyState;
