import React, { useState } from 'react'
import PT from 'prop-types'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '',
  password: '',
}

export default function LoginForm({ login }) {
  const [values, setValues] = useState(initialFormValues)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = async evt => {
    evt.preventDefault()
    const success = await login(values) // login fonksiyonunu burada çağır
    if (success) {
      setMessage('Login successful.')
      navigate('/articles') // Başarılı oturum açma sonrası yönlendirme
    } else {
      setMessage('Login failed.')
    }
  }

  const isDisabled = () => {
    const { username, password } = values
    return username.trim().length < 3 || password.trim().length < 8
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Kullanıcı adınızı girin"
        id="username"
      />
      <input
        type="password"
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Şifrenizi girin"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Oturum aç</button>
      {message && <p>{message}</p>}
    </form>
  )
}

// 🔥 Dokunmayın: LoginForm aşağıdaki propları birebir istiyor:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
