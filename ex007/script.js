document.querySelector("#botao").addEventListener("click", async () => {
    resposta = await fetch(`https://api.chucknorris.io/jokes/random`)
    respostaJSON = await resposta.json()
    const { created_at: dataCriacao, id, url, icon_url: urlIcone, value: piada } = respostaJSON
    novaPiada = new Piada(dataCriacao, id, urlIcone, url, piada)
    campoPiada = document.querySelector("#piada")
    campoPiada.innerHTML = ""
    campoImagem = document.createElement("img")
    campoImagem.setAttribute("src", novaPiada.urlIcone)
    campoPiada.appendChild(campoImagem)
    texto = document.createTextNode(novaPiada.piada)
    data = document.createTextNode(novaPiada.dataCriacao)
    campoPiada.appendChild(data)
    campoPiada.appendChild(texto)
})




class Piada {
    constructor(dataCriacao, id, urlIcone, url, piada) {
        this.dataCriacao = dataCriacao
        this.id = id
        this.urlIcone = urlIcone
        this.url = url
        this.piada = piada
    }
}