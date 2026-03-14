// src/pages/Home.tsx
import { Link }              from 'react-router-dom'
import { useRealtimeTasks }  from '../hooks/useRealtimeTasks'
import { usePresence }       from '../hooks/usePresence'
import { useAuthContext }    from '../context/AuthContext'
import { TaskForm }          from '../components/TaskForm'
import { TaskItem }          from '../components/TaskItem'
import { RealtimeIndicator } from '../components/RealtimeIndicator'

export function Home() {
  const { signOut } = useAuthContext()
  const { tareas, loading, crearTarea, actualizarTarea, eliminarTarea, conectado } =
    useRealtimeTasks()
  const { onlineUsers } = usePresence('home-sala')

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#F8FAFC' }}>
      <p style={{ color: '#94A3B8', fontSize: '14px' }}>Cargando tareas...</p>
    </div>
  )

  const completadas = tareas.filter(t => t.completada).length
  const progreso    = tareas.length ? Math.round((completadas / tareas.length) * 100) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Navbar */}
      <nav style={{
        background: 'white', borderBottom: '1px solid #E2E8F0',
        padding: '0 1.5rem', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Link to="/" style={navLinkActive}>Tareas</Link>
          <Link to="/dashboard" style={navLink}>Dashboard</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <RealtimeIndicator conectado={conectado} />
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            {onlineUsers.length} en línea
          </span>
          <button onClick={signOut} style={btnGhost}>Salir</button>
        </div>
      </nav>

      {/* Contenido */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#0F172A' }}>
            Mis Tareas
          </h1>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
            {completadas} de {tareas.length} completadas
          </p>
        </div>

        {/* Barra de progreso */}
        {tareas.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ background: '#E2E8F0', borderRadius: '99px', height: '6px' }}>
              <div style={{
                height: '6px', borderRadius: '99px', background: '#10B981',
                width: `${progreso}%`, transition: 'width 0.4s ease',
              }} />
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', textAlign: 'right' }}>
              {progreso}% completado
            </p>
          </div>
        )}

        {/* Formulario */}
        <TaskForm onCrear={async (titulo, descripcion) => {
          await crearTarea({ titulo, descripcion })
        }} />

        {/* Lista */}
        {tareas.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                No tienes tareas aún. ¡Crea una!
              </p>
            </div>
          )
          : tareas.map(t => (
            <TaskItem key={t.id} tarea={t}
              onActualizar={async (id, completada) => { await actualizarTarea(id, { completada }) }}
              onEliminar={async (id) => { await eliminarTarea(id) }}
            />
          ))
        }
      </div>
    </div>
  )
}

const navLink: React.CSSProperties = {
  fontSize: '14px', color: '#64748B', textDecoration: 'none',
  padding: '6px 12px', borderRadius: '8px',
}
const navLinkActive: React.CSSProperties = {
  ...navLink, color: '#0F172A', fontWeight: 500, background: '#F1F5F9',
}
const btnGhost: React.CSSProperties = {
  background: 'none', border: '1px solid #E2E8F0', borderRadius: '8px',
  padding: '6px 12px', fontSize: '13px', color: '#64748B', cursor: 'pointer',
}