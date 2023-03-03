import React from 'react'
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { setupServer, getHandlers } from './backend/mock-server'
import { st } from './backend/helpers'
import App from './frontend/components/App'

jest.setTimeout(750) // 5000 çok büyük
const waitForOptions = { timeout: 150 }
const queryOptions = { exact: false }

const renderApp = ui => {
	window.localStorage.clear()
	window.history.pushState({}, 'Test sayfası', '/')
	return render(ui)
}
let server
beforeAll(() => {
	server = setupServer(...getHandlers())
	server.listen()
})
afterAll(() => {
	server.close()
})
beforeEach(() => {
	renderApp(<BrowserRouter><App /></BrowserRouter>)
})
afterEach(() => {
	server.resetHandlers(...getHandlers())
})

const token = () => window.localStorage.getItem('token')
const logoutBtn = () => screen.queryByText('Oturumu kapat')
// login ekranı
const usernameInput = () => screen.queryByPlaceholderText('Kullanıcı adınızı girin')
const passwordInput = () => screen.queryByPlaceholderText('Şifrenizi girin')
const loginBtn = () => screen.queryByText('Oturum aç')
// makaleler ekranı
const articlesLink = () => screen.queryByRole('link', { name: 'Articles' })
const titleInput = () => screen.queryByPlaceholderText('Başlık girin')
const textInput = () => screen.queryByPlaceholderText('Metin girin')
const topicSelect = () => screen.queryByRole('combobox')
const submitArticleBtn = () => screen.queryByText('Gönder')

const loginFlow = async () => {
	fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
	fireEvent.change(passwordInput(), { target: { value: '12345678' } })
	fireEvent.click(loginBtn())
	await screen.findByText(st.closuresTitle, queryOptions, waitForOptions)
	await screen.findByText('Makalelerin burada, Foo!', queryOptions, waitForOptions)
}

describe('Advanced Applications', () => {
	describe('Oturum Açma', () => {
		test(`[1] Oturum aç butonu kriterleri yüzünden disabled durumda 
			- username (trimli) en az 3 karakter AND
			- password (trimli) en az 8 karakter`, () => {
				expect(loginBtn()).toBeDisabled()
				fireEvent.change(usernameInput(), { target: { value: ' 12 ' } })
				fireEvent.change(passwordInput(), { target: { value: ' 1234567 ' } })
				expect(loginBtn()).toBeDisabled()
				fireEvent.change(usernameInput(), { target: { value: ' 123 ' } })
				fireEvent.change(passwordInput(), { target: { value: ' 12345678 ' } })
				expect(loginBtn()).toBeEnabled()
			})
			test(`[2] Makaleler'e navigasyon
				- oturum açma ekranı render ediliyor
				- makale formu `, () => {
					fireEvent.click(articlesLink())
					expect(titleInput()).not.toBeInTheDocument()
					expect(usernameInput()).toBeInTheDocument()
				})
				test(`[3] oturum açma formunu doldurma ve gönderme
					- makale için başlık, açıklama ve konu görüntüleniyor
					- başarılı mesajı görüntüleniyor`, async () => {
						// oturum açma akışı
						fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
						fireEvent.change(passwordInput(), { target: { value: '12345678' } })
						fireEvent.click(loginBtn())
						// başlıklar henüz girilmemiş
						expect(screen.queryByText(st.closuresTitle, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(st.hooksTitle, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(st.expressTitle, queryOptions)).not.toBeInTheDocument()
						// açıklamalar henüz girilmemiş
						expect(screen.queryByText(st.closuresText, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(st.hooksText, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(st.expressText, queryOptions)).not.toBeInTheDocument()
						// konular henüz girilmemiş
						expect(screen.queryByText(`Konu: ${st.closuresTopic}`, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(`Konu: ${st.hooksTopic}`, queryOptions)).not.toBeInTheDocument()
						expect(screen.queryByText(`Konu: ${st.expressTopic}`, queryOptions)).not.toBeInTheDocument()
						// başarılı mesajı henüz girilmemiş
						expect(screen.queryByText('Makalelerin burada, Foo!', queryOptions)).not.toBeInTheDocument()
						// başlıklar geldi sonunda
						await screen.findByText(st.closuresTitle, queryOptions, waitForOptions)
						screen.getByText(st.hooksTitle, queryOptions)
						screen.getByText(st.expressTitle, queryOptions)
						// açıklamalar geldi sonunda
						screen.getByText(st.closuresText, queryOptions)
						screen.getByText(st.hooksText, queryOptions)
						screen.getByText(st.expressText, queryOptions)
						// konular geldi sonunda
						screen.getByText(`Konu: ${st.closuresTopic}`, queryOptions)
						screen.getByText(`Konu: ${st.hooksTopic}`, queryOptions)
						screen.getByText(`Konu: ${st.expressTopic}`, queryOptions)
						// başarılı mesajı geldi sonunda
						await screen.findByText('Makalelerin burada, Foo!', queryOptions, waitForOptions)
					})
	})
	describe('Oturum Kapat', () => {
		test(`[4] oturum kapat butonuna tıklayınca
			- otorum açma ekranına yönlendirme
			-  "token" local storagedan siliniyor
			- başarılı mesajı gösteriliyor`, async () => {
				await loginFlow()
				// token ver ve geçerli kontrolü
				expect(token()).toBeTruthy()
				// oturum kapatma akışı
				fireEvent.click(logoutBtn())
				// Güle güle mesajı render edildi
				await screen.findByText('Güle güle!', queryOptions, waitForOptions)
				// oturum açma formu görünür
				await screen.findByPlaceholderText('Kullanıcı adınızı girin', queryOptions, waitForOptions)
				await screen.findByPlaceholderText('Şifrenizi girin', queryOptions, waitForOptions)
				// token set edilmemiş
				expect(token()).toBeFalsy()
			})
	})
	describe('Yeni makale ekleme', () => {
		test(`[5] Gönder butonu sayfa yüklenirken disabled`, async () => {
			await loginFlow()
			expect(submitArticleBtn()).toBeDisabled()
		})
		test(`[6] yeni makale formunu doldurma ve gönderme
			- formu resetliyor
			- sayfaya yeni makale ekleniyor
			- sayfada başarılı mesajı görüntüleniyor`, async () => {
				await loginFlow()
				// form doldurma akışı
				fireEvent.change(titleInput(), { target: { value: 'Test için bir başlık' } })
				fireEvent.change(textInput(), { target: { value: 'Test için bir açıklama' } })
				fireEvent.change(topicSelect(), { target: { value: 'React' } })
				expect(titleInput()).toHaveValue('Test için bir başlık')
				expect(textInput()).toHaveValue('Test için bir açıklama')
				expect(topicSelect()).toHaveValue('React')
				// yeni makale gösteriliyor
				fireEvent.click(submitArticleBtn())
				await screen.findByText('Test için bir başlık', queryOptions, waitForOptions)
				screen.getByText('Test için bir açıklama', queryOptions)
				expect(screen.getAllByText('Başlık: React', queryOptions)).toHaveLength(2)
				// input alanları sıfırlanıyor
				expect(titleInput()).toHaveValue('')
				expect(textInput()).toHaveValue('')
				expect(topicSelect()).toHaveValue('')
				// server'dan başarılı mesajı geliyor
				await screen.findByText('Well done, Foo. Great article!', queryOptions, waitForOptions)
			})
	})
	describe('Bir Makalenin Güncellenmesi', () => {
		test('[7] Düzenle butonuna tıklanınca formda makale bilgilerini oluşturuluyor', async () => {
			await loginFlow()
			// düzenleme moduna geçiş
			fireEvent.click(screen.getAllByText('Düzenle')[0])
			expect(titleInput()).toHaveValue(st.closuresTitle)
			expect(textInput()).toHaveValue(st.closuresText)
			expect(topicSelect()).toHaveValue(st.closuresTopic)
		})
		test(`[8] formu güncelleme ve gönderme
			- güncellenmiş makale sayfada görüntüleniyor
			- form resetleniyor
			- başarılı mesajı görüntüleniyor`, async () => {
				await loginFlow()
				// düzenleme moduna geçiş
				fireEvent.click(screen.getAllByText('Düzenle')[0])
				// düzenleniyor
				fireEvent.change(titleInput(), { target: { value: 'Test için bir başlık' } })
				fireEvent.change(textInput(), { target: { value: 'Test için bir açıklama' } })
				fireEvent.change(topicSelect(), { target: { value: 'React' } })
				// form dolduruldu
				expect(titleInput()).toHaveValue('Test için bir başlık')
				expect(textInput()).toHaveValue('Test için bir açıklama')
				expect(topicSelect()).toHaveValue('React')
				// güncellemeler gönderiliyor
				fireEvent.click(submitArticleBtn())
				// güncellemeler sayfada gösteriliyor
				await screen.findByText('Test için bir başlık', queryOptions, waitForOptions)
				screen.getByText('Test için bir açıklama', queryOptions)
				expect(screen.getAllByText('Başlık: React', queryOptions)).toHaveLength(2)
				// başarılı mesajı
				await screen.findByText('Güncelleme başarılı, Foo!', queryOptions, waitForOptions)
			})
	})
	describe('Makale Silme', () => {
		test(`[9] makale için silme tuşuna tıklanınca
			- sayfadan siliniyor
			- başarılı mesajı sayfada görüntüleniyor
			`, async () => {
				await loginFlow()
				// sil tuşuna basınca
				fireEvent.click(screen.getAllByText('Sil')[0])
				// makale sayfadan kaldırılıyor
				await waitForElementToBeRemoved(() => screen.queryByText(st.closuresTitle, queryOptions))
				expect(screen.queryByText(st.closuresText, queryOptions)).not.toBeInTheDocument()
				expect(screen.queryByText(`Başlık: ${st.closuresTopic}`, queryOptions)).not.toBeInTheDocument()
				// success message arrives eventually
				await screen.findByText('Makale 1 silindi, Foo!', queryOptions, waitForOptions)
			})
	})
})
