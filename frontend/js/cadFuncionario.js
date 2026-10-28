const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    fetch(`http://localhost:3000/funcionario`,{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ``
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset() 
    })
})