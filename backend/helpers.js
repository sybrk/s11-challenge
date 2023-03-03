const yup = require('yup')
const jwt = require('jsonwebtoken')

const thisShouldBeSecret = 'shh'
const topics = ['JavaScript', 'React', 'Node']

let id, articles, getId

const st = {
  closuresTitle: 'The Truth about Closures',
  closuresText: 'Closures exist in some languages',
  closuresTopic: topics[0],

  hooksTitle: 'Mastering Hooks',
  hooksText: 'Prepare to read the docs',
  hooksTopic: topics[1],

  expressTitle: 'The Express Library',
  expressText: 'Express is the Sinatra',
  expressTopic: topics[2],
}

const reset = () => {
  id = 0
  getId = () => ++id
  articles = [
    {
      article_id: getId(),
      title: st.closuresTitle,
      text: st.closuresText,
      topic: st.closuresTopic,
    },
    {
      article_id: getId(),
      title: st.hooksTitle,
      text: st.hooksText,
      topic: st.hooksTopic,
    },
    {
      article_id: getId(),
      title: st.expressTitle,
      text: st.expressText,
      topic: st.expressTopic,
    },
  ]
}
reset()

const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('kullanıcı adı gerekli')
    .min(3, 'kullanıcı adı en az 3 karakter olmalı')
    .max(20, 'kullanıcı adı en fazla 20 karakter olmalı'),
  password: yup
    .string()
    .required('şifre gerekli')
    .min(8, 'şifre en az 8 karakter olmalı')
    .max(20, 'şifre en fazla 20 karakter olmalı'),
})
const articleSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('başlık gereklik')
    .min(1, 'başlık en az 1 karakter olmalı')
    .max(50, 'başlık en fazla 50 karakter olmalı'),
  text: yup
    .string()
    .trim()
    .required('açıklama gerekli')
    .min(1, 'açıklama en az 1 karakter olmalı')
    .max(200, 'açıklama en fazla 1 karakter olmalı'),
  topic: yup
    .string()
    .required('konu gerekli')
    .oneOf(topics)
})

async function login(user) {
  try {
    const { username } = await userSchema.validate(user)
    const claims = {
      username,
      role: 'Learner',
      school: 'TechinTech',
    }
    const token = jwt.sign(claims, thisShouldBeSecret, { expiresIn: '1h' })
    const payload = { message: `Tekrar merhaba, ${username}!`, token }
    return [200, payload]
  } catch (err) {
    return [422, { message: `Tövbe: ${err.message}` }]
  }
}

async function checkToken(token) {
  return jwt.verify(token, thisShouldBeSecret)
}

async function getArticles(token) {
  try {
    const decodedToken = await checkToken(token)
    const payload = {
      message: `Makalelerin burada, ${decodedToken.username}!`,
      articles,
    }
    return [200, payload]
  } catch (err) {
    return [401, { message: `Tövbe: ${err.message}` }]
  }
}

async function postArticle(token, article) {
  let decodedToken, validatedArticle, newArticle
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Tövbe: ${err.message}` }]
  }
  try {
    validatedArticle = await articleSchema.validate(article, { stripUnknown: true })
    newArticle = { article_id: getId(), ...validatedArticle }
    articles.push(newArticle)
  } catch (err) {
    return [422, { message: `Tövbe: ${err.message}` }]
  }
  const payload = {
    message: `Güzel iş, ${decodedToken.username}. Harika bir makale!`,
    article: newArticle,
  }
  return [201, payload]
}

async function updateArticle(token, article, article_id) {
  let decodedToken, validatedArticle
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Tövbe: ${err.message}` }]
  }
  if (!articles.find(art => art.article_id == article_id)) {
    return [404, { message: `Tövbe: article_id'si ${article_id} olan makale yok gibi duruyor!` }]
  }
  try {
    validatedArticle = await articleSchema.validate(article, { stripUnknown: true })
  } catch (err) {
    return [422, { message: `Tövbe: ${err.message}` }]
  }
  articles = articles.map(art => {
    return art.article_id == article_id ? { ...art, ...validatedArticle } : art
  })
  const payload = {
    message: `Güncelleme başarılı, ${decodedToken.username}!`,
    article: articles.find(art => art.article_id == article_id),
  }
  return [200, payload]
}

async function deleteArticle(token, article_id) {
  let decodedToken
  try {
    decodedToken = await checkToken(token)
  } catch (err) {
    return [401, { message: `Tövbe: ${err.message}` }]
  }
  if (!articles.find(art => art.article_id == article_id)) {
    return [404, { message: `Tövbe: article_id'si ${article_id} olan makale yok gibi duruyor!` }]
  }
  articles = articles.filter(art => {
    return art.article_id != article_id
  })
  const payload = {
    message: `Makale ${article_id} silindi, ${decodedToken.username}!`,
  }
  return [200, payload]
}

module.exports = {
  login,
  postArticle,
  getArticles,
  updateArticle,
  deleteArticle,
  reset,
  st,
}
