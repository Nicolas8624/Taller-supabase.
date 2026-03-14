// src/components/TaskForm.tsx
import { useState } from 'react'

interface Props {
  onCrear: (titulo: string, descripcion: string) => Promise<void>
}

export function TaskForm({ onCrear }: Props) {
  const [titulo,      setTitulo]      = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [submitting,  setSubmitting]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim()) return
    setSubmitting(true)
    try {
      await onCrear(titulo.trim(), descripcion.trim())
      setTitulo(''); setDescripcion('')
    } catch (err) { console.error(err) }
    finally { setSubmitting(false) }
  }

  return (
    <div style={{
      background: 'white', border: '1px solid #E2E8F0',
      borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem',
    }}>
      <p style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A', marginBottom: '12px' }}>
        Nueva tarea
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="¿Qué hay que hacer?"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = '#3B82F6'}
          onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          rows={2}
          style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = '#3B82F6'}
          onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
        />
        <button
          type="submit"
          disabled={submitting || !titulo.trim()}
          onClick={handleSubmit}
          style={{
            padding: '9px 16px', borderRadius: '8px', border: 'none',
            background: submitting || !titulo.trim() ? '#94A3B8' : '#0F172A',
            color: 'white', fontSize: '14px', fontWeight: 500,
            cursor: submitting || !titulo.trim() ? 'not-allowed' : 'pointer',
            alignSelf: 'flex-end',
          }}
        >
          {submitting ? 'Guardando...' : '+ Agregar tarea'}
        </button>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '9px 12px', border: '1px solid #E2E8F0',
  borderRadius: '8px', fontSize: '14px', outline: 'none',
  width: '100%', transition: 'border-color 0.15s', color: '#0F172A',
}