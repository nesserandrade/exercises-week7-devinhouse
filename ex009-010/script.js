

async function criarCategoria() {
    let resposta = await fetch(`https://api.chucknorris.io/jokes/categories`)
    let respostaJSON = await resposta.json()
    let seletor = document.querySelector("#seletor")
    for (let item of respostaJSON) {
        let opcao = document.createElement("option")
        let textoCategoria = document.createTextNode(item)
        opcao.appendChild(textoCategoria)
        opcao.setAttribute("value", item)
        seletor.appendChild(opcao)
    }
}

await criarCategoria()

document.querySelector("#botao").addEventListener("click", () => {
    let categoriaSelecionada = document.querySelector("#seletor").value
    criarPiada(categoriaSelecionada)
})

async function criarPiada (categoria) {
    let resposta = await fetch(`https://api.chucknorris.io/jokes/random?category=${categoria}`)
    let respostaJSON = await resposta.json()
    const { created_at: dataCriacao, id, url, icon_url: urlIcone, value: piada } = respostaJSON
    let novaPiada = new Piada(dataCriacao, id, urlIcone, url, piada)
    let campoPiada = document.querySelector("#piada")
    let novaLI = document.createElement("li")
    novaLI.setAttribute("data-category", categoria)
    let campoImagem = document.createElement("img")
    campoImagem.setAttribute("src", novaPiada.urlIcone)
    novaLI.appendChild(campoImagem)
    let texto = document.createTextNode(novaPiada.piada)
    let data = document.createTextNode(novaPiada.dataCriacao)
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