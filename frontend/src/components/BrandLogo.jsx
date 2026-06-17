function BrandLogo({ compact = false }) {
  return (
    <div className="brand-logo" aria-label="Agendai">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      {!compact && <span className="brand-name">Agendai</span>}
    </div>
  );
}

export default BrandLogo;
