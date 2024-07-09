import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  email: '',
  password: '',
}
export default function SignUpForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ proplarım nerede? burada parçalayın
  const {signup} = props

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ ekleyin
    signup(values)
  }

  const isDisabled = () => {
    // ✨ ekleyin
    // Trimlenmiş username karakter sayısı >= 3, ve
    // trimlenmiş password karakter sayısı >= 8 
    // butonun enable durumuna geçmesi için
    if (!(values.email.trim().length >= 3) || !(values.password.trim().length >= 8)){
      return true
    }
    return false
  }

  return (
    <form id="signUpForm" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Kullanıcı adınızı girin"
        id="email"
        type='email'
        
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Şifrenizi girin"
        id="password"
        type='password'
      />
      <button disabled={isDisabled()} id="submitCredentials">Kaydol</button>
    </form>
  )
}

// 🔥 Dokunmayın: LoginForm aşağıdaki propları birebir istiyor:
SignUpForm.propTypes = {
  signup: PT.func.isRequired,
}
