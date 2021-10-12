

async function criarCategoria() {
    resposta = await fetch(`https://api.chucknorris.io/jokes/categories`)
    respostaJSON = await resposta.json()
    seletor = document.querySelector("#seletor")
    for (item of respostaJSON) {
        let opcao = document.createElement("option")
        let textoCategoria = document.createTextNode(item)
        opcao.appendChild(textoCategoria)
        opcao.setAttribute("value", item)
        seletor.appendChild(opcao)
    }
}

criarCategoria()

let categoriaSelecionada = document.querySelector("#seletor")
let selecao = categoriaSelecionada.querySelector('[selected]').value
console.log(categoriaSelecionada)
document.querySelector("#botao").addEventListener("click", () => criarPiada(categoriaSelecionada))

async function criarPiada (categoria) {
    resposta = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
    respostaJSON = await resposta.json()
    const { created_at: dataCriacao, id, url, icon_url: urlIcone, value: piada } = respostaJSON
    novaPiada = new Piada(dataCriacao, id, urlIcone, url, piada)
    campoPiada = document.querySelector("#piada")
    novaLI = document.createElement("li")
    novaLI.setAttribute("data-category", categoria)
    campoImagem = document.createElement("img")
    campoImagem.setAttribute("src", novaPiada.urlIcone)
    novaLI.appendChild(campoImagem)
    texto = document.createTextNode(novaPiada.piada)
    data = document.createTextNode(novaPiada.dataCriacao)
    novaLI.appendChild(data)
    novaLI.appendChild(texto)
    campoPiada.appendChild(novaLI)
}

class Piada {
    constructor(dataCriacao, id, urlIcone, url, piada) {
        this.dataCriacao = dataCriacao
        this.id = id
        this.urlIcone = urlIcone
        this.url = url
        this.piada = piada
    }
}