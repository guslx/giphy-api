
const form = document.querySelector('form')
const gifsContainer = document.querySelector('.out')
const gifsInfoContainerRef = document.querySelector('.gifs-info')

const APIKey = 'D1MGAeRMjJkqiiMS6M7A3Lvv3CWgw7kT'
const getGIPHYApiUrl = GIFName =>
 `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`

const generateGIFImg = (downsizedGIFUrl, gifTitle) => {
    const img = document.createElement('img')
    img.setAttribute('src', downsizedGIFUrl)
    img.setAttribute('alt', gifTitle)

    return img
}

const generateHTMLText = (img, GIFData, gifTitle) => {
  const gifsInfoContainer = document.createElement('div')
  const createGifsInfoContainer = gifsContainer.insertAdjacentElement('afterbegin', gifsInfoContainer)
  const gifDatetime = GIFData.data[0].import_datetime
  const gifSlug = GIFData.data[0].slug
  const gifLink = `http://giphy.com/gifs/${gifSlug}`

  createGifsInfoContainer.classList.add('gif-info')
  createGifsInfoContainer.insertAdjacentElement('afterbegin', img)

  const anchor = document.createElement('a')    
  anchor.setAttribute('href', gifLink)

  createGifsInfoContainer.innerHTML += `
    <h2>${gifTitle}</h2>
    <p class="greetings">Postado em: ${gifDatetime}</p>
    <p class="p-link">Para ver em GIPHY.com: <a class="anchor" href="${anchor}">Clique aqui!</a></p>
    `
}

const fetchGIF = async (inputValue) => {
  try {
    const GIPHYApiUrl = getGIPHYApiUrl(inputValue)
    const response = await fetch(GIPHYApiUrl)

    if(!response.ok) {
      throw new Error('Não foi possível obter os dados')
    } 
    return response.json()
  } catch (error) {
      alert(`Erro: ${error.message}`)
      console.log(error)
    }
}

const insertGIFIntoDOM = async inputValue => {
  
  const GIFData = await fetchGIF(inputValue)

  if(GIFData) {
    const downsizedGIFUrl = GIFData.data[0].images.downsized.url
  const gifTitle = GIFData.data[0].title
  const img = generateGIFImg(downsizedGIFUrl, gifTitle)
    
  generateHTMLText(img, GIFData, gifTitle)

  form.reset()
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value

  insertGIFIntoDOM(inputValue)
})