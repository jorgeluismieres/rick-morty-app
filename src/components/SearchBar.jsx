import { useEffect, useMemo, useRef, useState } from 'react';

export default function SearchBar({ onSelectLocation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const controllerRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    async function search() {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      try {
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const res = await fetch(`https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(debouncedQuery)}`, { signal: controllerRef.current.signal });
        if (!res.ok) throw new Error('Error');
        const json = await res.json();
        setResults(json.results || []);
        setOpen(true);
      } catch (_) {
        setResults([]);
      }
    }
    search();
  }, [debouncedQuery]);

  function handleSelect(loc) {
    setQuery(loc.name);
    setOpen(false);
    onSelectLocation?.(loc.id);
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Buscar locación por nombre…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar locación"
        style={{ width: 320 }}
      />
      {open && results.length > 0 && (
        <ul className="suggestions" role="listbox">
          {results.map((loc) => (
            <li key={loc.id} role="option" onClick={() => handleSelect(loc)}>
              <span className="value">{loc.name}</span>
              <span className="label"> — {loc.type} · {loc.dimension}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
