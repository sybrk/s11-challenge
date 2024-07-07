import React, { useEffect, useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import { loginBusiness } from '../businesssLayer/loginBusiness'
import { articleBusiness } from '../businesssLayer/articleBusiness'
import { supaHelpers } from '../api/supabase'


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

  useEffect(() => {
    if (loginBusiness.checkLogin()) {
      navigate("/articles");
    } else {
      navigate("/")
    }
  }, [])

  const logout = () => {
    // ✨ ekleyin
    // Eğer token local storage da kayıtlıysa silinmelidir,
    // ve state'ine "Güle güle!" mesajı eklenmelidir.
    // Herhangi bir case'de, tarayıcıyı login ekranına yönlendirin
    const isLoggedOut = loginBusiness.logout();
    if (isLoggedOut) {
      setMessage("Güle güle!");
      navigate("/");
    }
  }

  const login = async ({ username, password }) => {

    // ✨ ekleyin
    // State'deki mesajı yok edin, spinner'ı açın
    // uygun uç noktasına istek gönderin.
    // Başarılı olması durumunda local storage'a `token` ı kaydedin
    // başarılı mesajını state'e atayın
    // ve makaleler sayfasına yönlendirin. Spinnerı kapatmayı unutmayın!
    setMessage("");
    setSpinnerOn(true);
    let loginMessage = await loginBusiness.login(username, password);
    setMessage(loginMessage);
    setSpinnerOn(false);
    if (loginBusiness.checkLogin()) {
      console.log("login token var")
      navigate("/articles")
    }
  }

  const getArticles = async () => {
    // ✨ ekleyin
    // Mesaj state'ini boşaltın, spinner'ı açın
    // uygun uç noktaya auth'lu isteği atın.
    // Başarılı olursa, articles'ı uygun state'e atayın ve 
    // başarılı mesajını uygun state'e atayın.
    // Eğer bir şeyler yanlış giderse, response'un durumunu inceleyin:
    // eğer 401'se token da bir sıkıntı olabilir ve tekrar login sayfasına yönlendirmeliyiz
    // Spinner'ı kapatmayı unutmayın!
    if (loginBusiness.checkLogin()) {
      setMessage("");
      setSpinnerOn(true)
      //let articleRequest = await articleBusiness.getArticles();
      setSpinnerOn(false);
      const supaArticles = await supaHelpers.getArticles();
      setMessage("supa article geldi");
      setArticles(supaArticles)
      /* if (articleRequest.status == 200) {
        setMessage(articleRequest.data.message);
        setArticles(articleRequest.data.articles);
      } else {
        setMessage(articleRequest.data.message)
        if (articleRequest.status.toString().startsWith("4")) {
          loginBusiness.logout()
          navigate("/")
        }
      } */
    } else {
      setMessage("Oturum açmanız gerekir")
      navigate("/")
    }


  }

  const postArticle = async (article) => {
    // ✨ ekleyin
    // Akış, "getArticles" işlevine çok benzer.
    // Ne yapacağınızı biliyorsunuz, log kullanabilirsiniz ya da breakpointler
    setSpinnerOn(true);
    //const postRequest = await articleBusiness.postArticle(article);
    const supaPost = await supaHelpers.postArticle(article)
    setSpinnerOn(false)
    //if(postRequest.status == 201) {
    if(supaPost.length) {
      await getArticles()
      
      setMessage("Eklendi")
      
    } else {
      setMessage("hata verdi")
    }
   
    
  }

  const updateArticle = async (article_id, article) => {
    // ✨ ekleyin
    // Bunu biliyorsunuz!
    setSpinnerOn(true);
    //const updateArticleRequest = await articleBusiness.updateArticle(article_id, article);
    const supaUpdate = await supaHelpers.updateArticle(article_id, article)
    setSpinnerOn(false);
    if (supaUpdate.length) {
     
      await getArticles()
 
      setMessage("güncellendi")
    } else {
      setMessage("güncelleme hatası")
    }
    
    
  }

  const deleteArticle = async (article_id) => {
    // ✨ ekleyin
    //const deleteArticleRequest = await  articleBusiness.deleteArticle(article_id);
    const supaDelete = await supaHelpers.deleteArticle(article_id);
    if(supaDelete) {
      await getArticles();
      setMessage("silindi")
    } else {
      setMessage("hata oldu")
    }
    
  }

  return (
    // ✨ JSX'i düzenleyin: `Spinner`, `Message`, `LoginForm`, `ArticleForm` ve `Articles` gerekli proplarla beraber ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      {loginBusiness.checkLogin() ? <><button id="logout" onClick={logout}>Oturumu kapat</button> </> : ""}

      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- bu satırı değiştirmeyin */}
        <h1>İleri Seviye Web Uygulaması</h1>
        <nav>
          {loginBusiness.checkLogin()
          ? <NavLink id="articlesScreen" to="/articles">Makaleler</NavLink>
          : <NavLink id="loginScreen" to="/">Oturum aç</NavLink>}

          
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticle={articles.find(art => art.id == currentArticleId)} currentArticleId = {currentArticleId} />
              <Articles getArticles={getArticles} articles={articles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId} />
            </>
          } />
        </Routes>
        <footer>WorkingÇift @2024</footer>
      </div>
    </>
  )
}
