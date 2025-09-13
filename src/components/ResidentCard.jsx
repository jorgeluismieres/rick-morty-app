import { useFetch } from '../hooks/useFetch';

function StatusDot({ status }) {
  const color = status === 'Alive' ? '#22c55e' : status === 'Dead' ? '#ef4444' : '#9ca3af';
  return <span className="status-dot" style={{ background: color }} />;
}

export default function ResidentCard({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) {
    return (
      <div className="card resident" aria-busy="true">
        <div style={{ height: 200, background: '#0f1520', borderRadius: 12, border: '1px solid #223049' }} />
        <div className="label">Cargando residente…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card resident">
        <div className="error">No se pudo cargar este residente.</div>
      </div>
    );
  }

  const { image, name, status, origin, episode } = data;

  return (
    <div className="card resident">
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <div className="status">
        <StatusDot status={status} />
        <span>{status}</span>
      </div>
      <div>
        <div className="label">Origen</div>
        <div className="value">{origin?.name || '—'}</div>
      </div>
      <div>
        <div className="label">Episodios</div>
        <div className="value">{Array.isArray(episode) ? episode.length : 0}</div>
      </div>
    </div>
  );
}
