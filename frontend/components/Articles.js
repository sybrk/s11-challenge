import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PT from 'prop-types'
import { loginBusiness } from '../businesssLayer/loginBusiness'

export default function Articles(props) {
  // ✨ proplarım nerede? burada...
  const {getArticles, articles, deleteArticle, setCurrentArticleId} = props
  // ✨ koşullu mantık uygula: eğer token yoksa
  // login ekranını render edeceğiz (React Router v.6)

  useEffect(() => {
    // ✨ yalnızca ilk render anında makaleleri buradan alın
    getArticles()
  },[])

  const editButtonHandler = (evt)=> {
    const articleId = evt.target.getAttribute("articleid")
    setCurrentArticleId(articleId)
  }
  const deleteButtonHandler = (evt)=> {
    const articleId = evt.target.getAttribute("articleid")
    deleteArticle(articleId)
  }
  return (
    // ✨ JSX i düzenleyi: `Function.prototype`'ı gerçek fonksiyonlarla güncelleyin
    // ve makale üretmek için articles propunu kullanın
    <div className="articles">
      <h2>Makaleler</h2>
      {
        !articles.length
          ? 'Hiç makale yok'
          : articles.map(art => {
            return (
              <div className="article" key={art.id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Başlık: {art.topic}</p>
                </div>
                <div>
                  <button articleid = {art.id} onClick={editButtonHandler}>Düzenle</button>
                  <button articleid = {art.id} onClick={deleteButtonHandler}>Sil</button>
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
    id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // undefined ya da null olabilir
}
