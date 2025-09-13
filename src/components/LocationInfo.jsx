export default function LocationInfo({ location }) {
  if (!location) return null;
  const { name, type, dimension, residents } = location;
  const total = Array.isArray(residents) ? residents.length : 0;

  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="row">
        <div>
          <div className="label">Nombre</div>
          <div className="value">{name || '—'}</div>
        </div>
        <div>
          <div className="label">Tipo</div>
          <div className="value">{type || '—'}</div>
        </div>
        <div>
          <div className="label">Dimensión</div>
          <div className="value">{dimension || '—'}</div>
        </div>
        <div>
          <div className="label">Residentes</div>
          <div className="value">{total}</div>
        </div>
      </div>
    </div>
  );
}
