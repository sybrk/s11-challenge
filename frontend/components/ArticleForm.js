import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import { topicOptions } from '../constants/topicOptions'


const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ proplarım nerede? burada... 
  const {postArticle, updateArticle, setCurrentArticleId, currentArticle, currentArticleId} = props

  useEffect(() => {
    // ✨ ekleyin
    // `currentArticle` prop'u her değiştiğinde, doğruluğunu kontrol etmeliyiz:
    // eğer doğruysa title, text ve konusunu ilgili formda ayarlamalıyız
	// eğer değilse, formu başlangıç değerlerine sıfırlamalıyız
    if(currentArticleId) {
      setValues({
        ...initialFormValues,
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic
      })
    }
	}, currentArticleId)

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = async(evt) => {
    evt.preventDefault()
    
    // ✨ ekleyin
    // `currentArticle` prop'unun doğruluğuna göre yeni bir post göndermeliyiz ya da var olanı güncellemeliyiz,
    if(currentArticleId) {
      await (updateArticle(currentArticleId, values))
    } else {
      await postArticle(values)
    }
    setValues(initialFormValues)
    setCurrentArticleId(null)
  }

  const isDisabled = () => {
    // ✨ ekleyin
    // inputların bazı değerleri olup olmadığına dikkat edin
    
    if ((!values.text.length >=1) ||
        (!values.title.length >=1) ||
        !topicOptions.includes(values.topic)) {
          return true
    } else {
      return false
    }
  }

  const cancelEditing = (evt)=> {
    evt.preventDefault()
    setValues(initialFormValues)
    setCurrentArticleId(null)
  }

  return (
    // ✨ JSX'i düzenleyin: başlığın "Düzenle" ya da "Oluştur" olarak görüntülenmesini sağlayın
    // ve Function.prototype'ı uygun fonksiyonla değiştirin
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId ? "Güncelle" :  "Yeni Makale Oluştur"}</h2>
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
        {topicOptions.map((topic, index) => {
          return(
            <option value={topic} key={"topic_"+index}>{topic}</option>
          )
        })}
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Gönder</button>
        <button onClick={cancelEditing}>Düzenlemeyi iptal et</button>
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
