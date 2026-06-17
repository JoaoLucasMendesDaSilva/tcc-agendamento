function MetricCard({ label, value, tone = 'green', detail }) {
  return (
    <article className="metric-card">
      <span className={`metric-icon metric-${tone}`} aria-hidden="true" />
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {detail && <small>{detail}</small>}
      </div>
    </article>
  );
}

export default MetricCard;
