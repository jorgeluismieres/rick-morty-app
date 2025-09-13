export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={page === 1}>« Primero</button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>‹ Anterior</button>
      <span className="label">Página {page} de {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Siguiente ›</button>
      <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>Último »</button>
    </div>
  );
}
