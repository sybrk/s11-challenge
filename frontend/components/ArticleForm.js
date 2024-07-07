import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ proplarım nerede? burada... 
  const { currentArticle, postArticle, updateArticle, setCurrentArticleId } = props

  useEffect(() => {
    // ✨ ekleyin
    // `currentArticle` prop'u her değiştiğinde, doğruluğunu kontrol etmeliyiz:
    // eğer doğruysa title, text ve konusunu ilgili formda ayarlamalıyız
    // eğer değilse, formu başlangıç değerlerine sıfırlamalıyız
    if (currentArticle) {
      setValues(currentArticle)
    } else {
      setValues(initialFormValues)
    }
  }, [currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ ekleyin
    // `currentArticle` prop'unun doğruluğuna göre yeni bir post göndermeliyiz ya da var olanı güncellemeliyiz,
    if (currentArticle) {
      updateArticle({ article_id: currentArticle.id, article: values })
    }
    else {
      postArticle(values)
    }
    setValues(initialFormValues)
    setCurrentArticleId(null)
  }

  const isDisabled = () => {
    // ✨ ekleyin
    // inputların bazı değerleri olup olmadığına dikkat edin
    return !values.title.trim() || values.text.trim() || values.topic
  }

  return (
    // ✨ JSX'i düzenleyin: başlığın "Düzenle" ya da "Oluştur" olarak görüntülenmesini sağlayın
    // ve Function.prototype'ı uygun fonksiyonla değiştirin
    <form id="form" onSubmit={onSubmit}>
      <h2> {currentArticle ? 'Makale Düzenle' : 'Yeni Makale Oluştur'}</h2>
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
        <button disabled={isDisabled()} id="submitArticle">Gönder</button>
        <button onClick={() => {
          setValues(initialFormValues)
          setCurrentArticleId(null)
        }}>Düzenlemeyi iptal et</button>
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
