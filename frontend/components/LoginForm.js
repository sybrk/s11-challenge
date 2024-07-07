import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm({ login }) {
  const [values, setValues] = useState(initialFormValues)


  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    login(values)
  }

  const isDisabled = () => {
    return values.username.trim().length < 3 || values.password.trim().length < 8
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
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Şifrenizi girin"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Oturum aç</button>
    </form>
  )
}

// 🔥 Dokunmayın: LoginForm aşağıdaki propları birebir istiyor:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
