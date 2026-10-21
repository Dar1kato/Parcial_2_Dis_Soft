// Muestra la orden en curso: mesa, platillos, total, errores y el botón de
// confirmar. Ver docs/08-contrato-ui.md y el wireframe de docs/07-wireframes.md.
// Toma Menu.jsx como modelo.
//
// Props: decide tú cuáles necesita y escríbelas aquí.
//        (Pista: la orden, el total, los mensajes de error y una función por acción.)
export default function Orden({ orden, onQuitar, total, onMesa, onConfirmar, errores }) {
  return (
    <section aria-label="Orden">
      <h2>Orden</h2>
      <label>
        Mesa <input type="number" value={orden.mesa ?? ''} onChange={(e) => onMesa(e.target.value)}/>
      </label>
      <ul>
        {orden.items.map((item) => (
          <li key={item.id} aria-label={item.nombre}>
            <div>
              <strong>{item.nombre} x <span data-testid="cantidad">{item.cantidad}</span></strong>
            </div>
            <button onClick={() => onQuitar(item.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>
        Total: <span data-testid="total">${total.toFixed(2)}</span>
      </p>
      
      {errores.map((texto) => (
        <p key={texto} role="alert">{texto}</p>
      ))}

      <button onClick={onConfirmar}>Confirmar Orden</button>
    </section>
  )
}
