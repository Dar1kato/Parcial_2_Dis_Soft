// Componente raíz. Ver docs/05-arquitectura.md: App es el ÚNICO componente con
// estado y el único que llama a src/data/. Menu, Orden y Confirmacion solo
// reciben props.
import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Orden from './components/Orden'
import Confirmacion from './components/Confirmacion'

import { 
  agregarPlatillo,
  crearOrden,
  quitarPlatillo,
  asignarMesa,
  calcularTotal,
  validarOrden,
  MENSAJES
} from './logic/orden'
import { cargarMenu } from './data/menu'
import { guardarOrden } from './data/ordenes'

export default function App() {
  const [menu, setMenu] = useState([])
  const [orden, setOrden] = useState(crearOrden())
  // TODO: los demás estados que necesites (cargando, mensajes de error, folio...)
  const [loading, setLoading] = useState(true)
  const [errores, setErrores] = useState([])
  const [folio, setFolio] = useState()

  // TODO HU-01 · RNF-04: cargar el menú UNA sola vez al montar el componente.
  useEffect(() => {
    cargarMenu()
      .then((data) => setMenu(data))
      .finally(() => setLoading(false))
  }, [])

  // TODO HU-02, HU-03: manejadores que llamen a las funciones de src/logic/orden.js.
  function handleAgregar(platillo) {
    setOrden(agregarPlatillo(orden, platillo))
  }

  function hanldeQuitar(id) {
    setOrden(quitarPlatillo(orden, id))
  }

  // TODO HU-04 · RNF-02: confirmar la orden.
  function handleMesa(valor) {
    setOrden(asignarMesa(orden, valor))
  }

  async function handleConfirmar() {
    const { valida, errores: codigos } = validarOrden(orden)

    if (!valida) {
      setErrores(codigos.map((codigo) => MENSAJES[codigo]))
      return
    }

    setErrores([])
    const { id } = await guardarOrden(orden)
    setFolio(id)
    setOrden(crearOrden())
  }

  return (
    <div className="app">
      <header className="encabezado">
        <h1>La Fonda de Doña Lupe</h1>
        <p>Toma de órdenes</p>
      </header>

      <main className="layout"> 
          { !loading && <Menu menu={menu} onAgregar={handleAgregar} />}
          { loading && <p>Cargando...</p>}
          
       <Orden 
        orden={orden} 
        onQuitar={hanldeQuitar} 
        total={calcularTotal(orden)} 
        onMesa={handleMesa}
        onConfirmar={handleConfirmar}
        errores={errores}
      />
      </main>

      <Confirmacion folio={folio} />
    </div>
  )
}
