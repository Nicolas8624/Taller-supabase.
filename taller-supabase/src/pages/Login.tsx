// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export function Login() {
  const { signIn }              = useAuthContext()
  const navigate                = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Credenciales incorrectas')
    } finally { setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F8FAFC',
    }}>
      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '380px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>

        {/* Header */}
        <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '6px' }}>
          Iniciar Sesión
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '1.5rem' }}>
          Bienvenido de nuevo
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: '#FEF2F2', border: '1px solid #FECACA',
            borderRadius: '8px', padding: '10px 12px',
            color: '#DC2626', fontSize: '13px', marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '9px 12px', border: '1px solid #E2E8F0',
                borderRadius: '8px', fontSize: '14px', outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = '#3B82F6'}
              onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '9px 12px', border: '1px solid #E2E8F0',
                borderRadius: '8px', fontSize: '14px', outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = '#3B82F6'}
              onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            style={{
              marginTop: '4px',
              padding: '10px',
              background: loading ? '#94A3B8' : '#0F172A',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </div>

        {/* Footer */}
        <p style={{ fontSize: '13px', color: '#64748B', textAlign: 'center', marginTop: '1.25rem' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>
            Regístrate aquí
          </Link>
        </p>

      </div>
    </div>
  )
}