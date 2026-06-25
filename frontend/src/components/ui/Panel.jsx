function Panel({
  actions,
  children,
  className = '',
  description,
  icon,
  title,
  titleId,
}) {
  return (
    <section
      aria-labelledby={titleId}
      className={`dashboard-panel operational-panel ${className}`.trim()}
    >
      {(title || description || icon || actions) && (
        <div className="panel-heading operational-panel-heading">
          <div>
            {title && <h2 id={titleId}>{title}</h2>}
            {description && <p className="panel-text">{description}</p>}
          </div>
          {(icon || actions) && (
            <div className="panel-heading-actions">
              {icon}
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export default Panel;
