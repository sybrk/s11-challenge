import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import Articles from './Articles';
import LoginForm from './LoginForm';
import Message from './Message';
import ArticleForm from './ArticleForm';
import Spinner from './Spinner';
import axios from 'axios';
import axiosWithAuth from '../axios/index';

const articlesUrl = 'http://localhost:9000/api/articles';
const loginUrl = 'http://localhost:9000/api/login';

export default function App() {
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);

  const navigate = useNavigate();
  const redirectToLogin = () => navigate('/');
  const redirectToArticles = () => navigate('/articles');

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Güle güle!');
    redirectToLogin();
  };

  const login = ({ username, password }) => {
    setMessage('');
    setSpinnerOn(true);

    axios.post(loginUrl, { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        redirectToArticles();
      })
      .catch(err => {
        console.error('API Error:', err);
        setMessage('Login failed. Please check your credentials.');
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const getArticles = () => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth().get(articlesUrl)
      .then(res => {
        if (Array.isArray(res.data)) {
          setArticles(res.data);
          setMessage('Makaleler başarıyla yüklendi.');
        } else if (res.data && Array.isArray(res.data.articles)) {
          setArticles(res.data.articles);
          setMessage('Makaleler başarıyla yüklendi.');
        } else {
          setMessage('Beklenmeyen veri formatı.');
        }
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          redirectToLogin();
        } else {
          setMessage('Makaleleri yüklerken bir hata oluştu.');
        }
      })
      .finally(() => {
        console.log('getArticles: Spinner kapatılıyor');
        setSpinnerOn(false);
      });
  };

  const postArticle = article => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth().post(articlesUrl, article)
      .then(res => {
        setArticles([...articles, res.data]);
        setMessage('Makale başarıyla eklendi.');
      })
      .catch(err => {
        console.error(err);
        setMessage('Makale eklenirken bir hata oluştu.');
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const updateArticle = ({ article_id, article }) => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth().put(`${articlesUrl}/${article_id}`, article)
      .then(res => {
        setArticles(articles.map(art => art.id === article_id ? res.data : art));
        setMessage('Makale başarıyla güncellendi.');
      })
      .catch(err => {
        console.error(err);
        setMessage('Makale güncellenirken bir hata oluştu.');
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  const deleteArticle = article_id => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
      .then(res => {
        setArticles(articles.filter(art => art.id !== article_id));
        setMessage('Makale başarıyla silindi.');
      })
      .catch(err => {
        console.error(err);
        setMessage('Makale silinirken bir hata oluştu.');
      })
      .finally(() => {
        setSpinnerOn(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // getArticles(); // Makaleleri al
      // redirectToArticles();
    }
  }, []);

  return (
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Oturumu kapat</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>İleri Seviye Web Uygulaması</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Oturum aç</NavLink>
          <NavLink id="articlesScreen" to="/articles">Makaleler</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm
                postArticle={postArticle}
                updateArticle={updateArticle}
                setCurrentArticleId={setCurrentArticleId}
                currentArticle={Array.isArray(articles) ? articles.find(art => art.id === currentArticleId) : null}
              />
              <Articles
                articles={Array.isArray(articles) ? articles : []}
                getArticles={getArticles}
                deleteArticle={deleteArticle}
                setCurrentArticleId={setCurrentArticleId}
              />
            </>
          } />
        </Routes>
        <footer>WorkingÇift @2024</footer>
      </div>
    </>
  );
}
