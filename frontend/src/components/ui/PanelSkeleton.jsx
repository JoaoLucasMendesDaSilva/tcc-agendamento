function PanelSkeleton({ lines = 3 }) {
  return (
    <div className="panel-skeleton" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <span
          className={`skeleton-line skeleton-row skeleton-row-${index + 1}`}
          key={index}
        />
      ))}
    </div>
  );
}

export default PanelSkeleton;
