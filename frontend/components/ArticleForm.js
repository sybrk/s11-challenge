import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import { useNavigate } from 'react-router-dom'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm({ postArticle, updateArticle, setCurrentArticleId, currentArticle, setMessage, setSpinnerOn }) {
  const [values, setValues] = useState(initialFormValues)

  const navigate = useNavigate()
  const redirectToArticles = () => { navigate('/articles') }


  useEffect(() => {
    // ✨ ekleyin
    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic
      })
    } else {
      setValues(initialFormValues)
    }
  }, [currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()
    // ✨ ekleyin
    if (currentArticle) {
      updateArticle({ article_id: currentArticle.article_id, article: values })
    } else {
      postArticle(values); 
    }
  }

  const isDisabled = () => {
    // ✨ ekleyin
    return values.title.trim().length < 1 || values.text.trim().length < 1 || !["React", "JavaScript", "Node"].includes(values.topic)
  }

  return (
    // ✨ JSX'i düzenleyin: başlığın "Düzenle" ya da "Oluştur" olarak görüntülenmesini sağlayın
    // ve Function.prototype'ı uygun fonksiyonla değiştirin
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticle ? "Düzenle" : "Yeni Makale Oluştur"}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Başlık girin"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Metin girin"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} type="submit" id="submitArticle">Gönder</button>
        <button onClick={() => setCurrentArticleId(null)}>Düzenlemeyi iptal et</button>
      </div>
    </form>
  )
}

// 🔥 Dokunmayın: LoginForm aşağıdaki propları birebir istiyor:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // null ya da undefined olabilir,"oluşturma" modu manasında ("güncelle" nin zıttı olarak)
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
