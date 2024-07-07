import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ proplarım nerede? burada parçalayın
  const {login} = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ ekleyin
    login(values)
  }

  const isDisabled = () => {
    // ✨ ekleyin
    // Trimlenmiş username karakter sayısı >= 3, ve
    // trimlenmiş password karakter sayısı >= 8 
    // butonun enable durumuna geçmesi için
    if (!(values.username.trim().length >= 3) || !(values.password.trim().length >= 8)){
      return true
    }
    return false
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
