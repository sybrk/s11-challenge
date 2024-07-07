import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import { articleBusiness } from '../businesssLayer/articleBusiness'
import {loginBusiness} from "../businesssLayer/loginBusiness"

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
  const redirectToLogin = () => { navigate('/')}
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    // ✨ ekleyin
    localStorage.removeItem('token')
    setMessage("Güle güle!")
    redirectToLogin()
  }

  const login = async ({ username, password }) => {
    // ✨ ekleyin
    setMessage('')
    setSpinnerOn(true)
    try {
      const result = await loginBusiness.login(username, password)
      if (result) {
        setMessage('Login successful')
        redirectToArticles()
      } else {
        setMessage('Login failed')
      }
    } catch (error) {
      setMessage('Login failed')
    }
    setSpinnerOn(false)
  }

  const getArticles = async () => {
    // ✨ ekleyin
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token');
      const articles = await articleBusiness.getArticles(token);
      if (articles) {
        setArticles(articles);
        setMessage('Articles fetched successfully');
        
      } else {
        setMessage('Failed to fetch articles');
        redirectToLogin();
      }
    } catch (error) {
      setMessage('Failed to fetch articles');
      redirectToLogin();
    } 

   
  }

  const postArticle = async (article) => {
    // ✨ ekleyin
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const result = await articleBusiness.postArticles(token, article.title, article.text, article.topic)
      if (result) {
        setArticles(prevArticles => [...prevArticles, result.data.article])
        setMessage('Article posted successfully')
        console.log("redericting")
        redirectToArticles()
        console.log("redericted")
      } else {
        setMessage('Failed to post article')
      }
    } catch (error) {
      setMessage('Failed to post article')
    }
    setSpinnerOn(false)
  }

  const updateArticle = async ({ article_id, article }) => {
    // ✨ ekleyin
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const result = await articleBusiness.updateArticle(token, article_id, article.title, article.text, article.topic)
      if (result) {
        setArticles(result)
        setMessage('Article updated successfully')
      } else {
        setMessage('Failed to update article')
      }
    } catch (error) {
      setMessage('Failed to update article')
    }
    setSpinnerOn(false)
  }

  const deleteArticle = async article_id => {
    // ✨ ekleyin
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const result = await articleBusiness.deleteArticle(token, article_id)
      if (result) {
        setArticles(prevArticles => prevArticles.filter(article => article.article_id !== article_id))
        setMessage('Article deleted successfully')
      } else {
        setMessage('Failed to delete article')
      }
    } catch (error) {
      setMessage('Failed to delete article')
    }
    setSpinnerOn(false)
  }

  return (
    // ✨ JSX'i düzenleyin: `Spinner`, `Message`, `LoginForm`, `ArticleForm` ve `Articles` gerekli proplarla beraber ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Oturumu kapat</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- bu satırı değiştirmeyin */}
        <h1>İleri Seviye Web Uygulaması</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Oturum aç</NavLink>
          <NavLink id="articlesScreen" to="/articles">Makaleler</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} setSpinnerOn={setSpinnerOn} spinnerOn={spinnerOn} message={message} />
              <Articles articles={articles} getArticles={getArticles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId} setSpinnerOn={setSpinnerOn} setMessage={setMessage} spinnerOn={spinnerOn} message={message}/>
            </>
          } />
        </Routes>
        <footer>WorkingÇift @2024</footer>
      </div>
    </>
  )
}
