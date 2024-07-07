import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles({ articles, getArticles, deleteArticle, setCurrentArticleId }) {
  const token = localStorage.getItem('token')

  // Eğer token yoksa login sayfasına yönlendir
  if (!token) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    getArticles()
  }, [getArticles])

  return (
    <div className="articles">
      <h2>Makaleler</h2>
      {
        !articles.length
          ? 'Hiç makale yok'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Başlık: {art.topic}</p>
                </div>
                <div>
                  <button onClick={() => setCurrentArticleId(art.article_id)}>Düzenle</button>
                  <button onClick={() => deleteArticle(art.article_id)}>Sil</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 Dokunmayın: Makaleler aşağıdaki propları birebir istiyor:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // dizi boş olabilir
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // undefined ya da null olabilir
}
