// Acceso a Firestore para las órdenes. Ver docs/04-modelo-datos.md.
//
// REGLA DE DISEÑO: este es el ÚNICO archivo de la aplicación (junto con
// src/firebase.js) que puede importar 'firebase/firestore'.
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { calcularTotal } from '../logic/orden'

// HU-04
// Recibe la orden actual { mesa, items } y la guarda como un documento nuevo
// en la colección `ordenes`, con la forma de docs/04-modelo-datos.md.
// Regresa { id } con el id del documento creado (es el folio).
export async function guardarOrden(orden) {
  const documento = {
    mesa: orden.mesa,
    items: orden.items,
    total: calcularTotal(orden),
    estado: 'pendiente',
    creadaEn: serverTimestamp(),
  }

  const ref = await addDoc(collection(db, 'ordenes'), documento)
  return { id: ref.id }
}
