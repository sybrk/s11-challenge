import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  // ✨ proplarım nerede? burada...

  // ✨ koşullu mantık uygula: eğer token yoksa
  // login ekranını render edeceğiz (React Router v.6)

  useEffect(() => {
    // ✨ yalnızca ilk render anında makaleleri buradan alın
  })

  return (
    // ✨ JSX i düzenleyi: `Function.prototype`'ı gerçek fonksiyonlarla güncelleyin
    // ve makale üretmek için articles propunu kullanın
    <div className="articles">
      <h2>Makaleler</h2>
      {
        ![].length
          ? 'Hiç makale yok'
          : [].map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Başlık: {art.topic}</p>
                </div>
                <div>
                  <button disabled={true} onClick={Function.prototype}>Düzenle</button>
                  <button disabled={true} onClick={Function.prototype}>Sil</button>
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
