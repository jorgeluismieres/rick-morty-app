import { useEffect, useMemo, useState } from 'react';
import './index.css';
import { useFetch } from './hooks/useFetch';
import { getRandomId, MIN_LOCATION_ID, MAX_LOCATION_ID } from './utils/getRandomId';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';
import RickAndMorty from './assets/RICK-AND-MORTY.webp'

const API = 'https://rickandmortyapi.com/api/location/';
const PAGE_SIZE = 8;

export default function App() {
  const [locationId, setLocationId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [formError, setFormError] = useState('');
  const [page, setPage] = useState(1);

  const { data: location, loading, error, setUrl } = useFetch(null);

  useEffect(() => {
    const random = getRandomId();
    setLocationId(random);
  }, []);

  useEffect(() => {
    if (locationId == null) return;
    setUrl(`${API}${locationId}`);
    setPage(1);
  }, [locationId, setUrl]);

  function onSubmit(e) {
    e.preventDefault();
    const value = Number(inputValue);
    if (!Number.isInteger(value) || value < MIN_LOCATION_ID || value > MAX_LOCATION_ID) {
      setFormError(`Ingresa un número entre ${MIN_LOCATION_ID} y ${MAX_LOCATION_ID}.`);
      return;
    }
    setFormError('');
    setLocationId(value);
  }

  function handleRandom() {
    setFormError('');
    setInputValue('');
    setLocationId(getRandomId());
  }

  const residents = location?.residents || [];
  const totalPages = Math.max(1, Math.ceil(residents.length / PAGE_SIZE));
  const paginatedResidents = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return residents.slice(start, start + PAGE_SIZE);
  }, [residents, page]);

  return (
    <div className="container">
      <header className="header">
        <img src={RickAndMorty} alt='Rick and Morty' className='img-header'/>
        <h1 className="title">Rick & Morty — Locaciones</h1>
        <button onClick={handleRandom} aria-label="Locación aleatoria">🎲 Aleatoria</button>
      </header>
      <form className="form" onSubmit={onSubmit} style={{ marginBottom: 8 }}>
        <input
          type="number"
          min={MIN_LOCATION_ID}
          max={MAX_LOCATION_ID}
          placeholder={`ID de locación (${MIN_LOCATION_ID}-${MAX_LOCATION_ID})`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-invalid={Boolean(formError)}

        />
        <button type="submit">Buscar por ID</button>
      </form>

      {formError && <div className="error" role="alert">{formError}</div>}

      {loading && <div className="card">Cargando locación…</div>}
      {error && <div className="error">No se pudo cargar la locación. Intenta con otro ID.</div>}

      {!loading && !error && location && (
        <>
          <LocationInfo location={location} />

          {residents.length === 0 ? (
            <div className="card">Esta locación no tiene residentes.</div>
          ) : (
            <>

              <div className="grid">
                {(paginatedResidents.length > 0 ? paginatedResidents : residents).map((url) => (
                  <ResidentCard key={url} url={url} />
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} onPageChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))} />
            </>
          )}
        </>
      )}

      <div className="footer">Hecho con React + Vite — API: rickandmortyapi.com</div>
    </div>
  );
}
