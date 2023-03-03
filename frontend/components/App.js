import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ Bu statelerle MVP'ye ulaşılabilir
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ `useNavigate` 'i araştırın React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ kodlar buraya */ }
  const redirectToArticles = () => { /* ✨ kodlar buraya */ }

  const logout = () => {
    // ✨ ekleyin
    // Eğer token local storage da kayıtlıysa silinmelidir,
    // ve state'ine "Güle güle!" mesajı eklenmelidir.
    // Herhangi bir case'de, tarayıcıyı login ekranına yönlendirin
  }

  const login = ({ username, password }) => {
    // ✨ ekleyin
    // State'deki mesajı yok edin, spinner'ı açın
    // uygun uç noktasına istek gönderin.
    // Başarılı olması durumunda local storage'a `token` ı kaydedin
    // başarılı mesajını state'e atayın
    // ve makaleler sayfasına yönlendirin. Spinnerı kapatmayı unutmayın!
  }

  const getArticles = () => {
    // ✨ ekleyin
    // Mesaj state'ini boşaltın, spinner'ı açın
    // uygun uç noktaya auth'lu isteği atın.
    // Başarılı olursa, articles'ı uygun state'e atayın ve 
    // başarılı mesajını uygun state'e atayın.
    // Eğer bir şeyler yanlış giderse, response'un durumunu inceleyin:
    // eğer 401'se token da bir sıkıntı olabilir ve tekrar login sayfasına yönlendirmeliyiz
    // Spinner'ı kapatmayı unutmayın!
  }

  const postArticle = article => {
    // ✨ ekleyin
    // Akış, "getArticles" işlevine çok benzer.
    // Ne yapacağınızı biliyorsunuz, log kullanabilirsiniz ya da breakpointler
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ ekleyin
    // Bunu biliyorsunuz!
  }

  const deleteArticle = article_id => {
    // ✨ ekleyin
  }

  return (
    // ✨ JSX'i düzenleyin: `Spinner`, `Message`, `LoginForm`, `ArticleForm` ve `Articles` gerekli proplarla beraber ❗
    <>
      <Spinner />
      <Message />
      <button id="logout" onClick={logout}>Oturumu kapat</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- bu satırı değiştirmeyin */}
        <h1>İleri Seviye Web Uygulaması</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Oturum aç</NavLink>
          <NavLink id="articlesScreen" to="/articles">Makaleler</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="articles" element={
            <>
              <ArticleForm />
              <Articles />
            </>
          } />
        </Routes>
        <footer>Tech mi Çift mi @2023</footer>
      </div>
    </>
  )
}
