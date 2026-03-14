// src/pages/Register.tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

export function Register() {
  const { signUp }            = useAuthContext()
  const navigate              = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await signUp(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth:'400px', margin:'4rem auto', padding:'2rem' }}>
      <h1>Registrarse</h1>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email}
          onChange={e => setEmail(e.target.value)} required />
        <input type='password' placeholder='Contraseña' value={password}
          onChange={e => setPassword(e.target.value)} required />
        <button type='submit' disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
    </div>
  )
}