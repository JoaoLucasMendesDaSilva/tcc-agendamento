function PageHeader({ eyebrow, title, description, actions, meta }) {
  return (
    <header className="page-title operational-page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="panel-text">{description}</p>}
      </div>
      {(actions || meta) && (
        <div className="page-title-actions">
          {meta}
          {actions}
        </div>
      )}
    </header>
  );
}

export default PageHeader;
