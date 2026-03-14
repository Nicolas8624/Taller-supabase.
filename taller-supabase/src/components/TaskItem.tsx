// src/components/TaskItem.tsx
import { useState } from 'react'
import type { Tarea } from '../types/database'

interface Props {
  tarea: Tarea
  onActualizar: (id: string, completada: boolean) => Promise<void>
  onEliminar:   (id: string) => Promise<void>
}

export function TaskItem({ tarea, onActualizar, onEliminar }: Props) {
  const [eliminando, setEliminando] = useState(false)

  const handleEliminar = async () => {
    if (!confirm('¿Eliminar esta tarea?')) return
    setEliminando(true)
    await onEliminar(tarea.id)
  }

  return (
    <div style={{
      background: 'white', border: '1px solid #E2E8F0',
      borderRadius: '10px', padding: '0.875rem 1rem',
      display: 'flex', alignItems: 'center', gap: '12px',
      marginBottom: '8px',
      opacity: eliminando ? 0.4 : 1,
      transition: 'opacity 0.2s, box-shadow 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Checkbox custom */}
      <div
        onClick={() => onActualizar(tarea.id, !tarea.completada)}
        style={{
          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
          border: tarea.completada ? 'none' : '2px solid #CBD5E1',
          background: tarea.completada ? '#10B981' : 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {tarea.completada && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polyline points="2,5 4,7 8,3" fill="none"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '14px', fontWeight: 500, margin: 0,
          color: tarea.completada ? '#94A3B8' : '#0F172A',
          textDecoration: tarea.completada ? 'line-through' : 'none',
          transition: 'color 0.2s',
        }}>
          {tarea.titulo}
        </p>
        {tarea.descripcion && (
          <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0' }}>
            {tarea.descripcion}
          </p>
        )}
      </div>

      {/* Badge estado */}
      <span style={{
        fontSize: '11px', fontWeight: 500, padding: '3px 10px',
        borderRadius: '99px', flexShrink: 0,
        background: tarea.completada ? '#D1FAE5' : '#DBEAFE',
        color:      tarea.completada ? '#065F46' : '#1E40AF',
      }}>
        {tarea.completada ? 'Hecha' : 'Pendiente'}
      </span>

      {/* Botón eliminar */}
      <button
        onClick={handleEliminar}
        disabled={eliminando}
        style={{
          background: 'none', border: '1px solid #FECACA',
          borderRadius: '8px', padding: '5px 10px',
          fontSize: '12px', color: '#EF4444',
          cursor: eliminando ? 'not-allowed' : 'pointer',
          flexShrink: 0, transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#FEF2F2')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      >
        Eliminar
      </button>
    </div>
  )
}