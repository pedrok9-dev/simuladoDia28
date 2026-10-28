const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/motorista/buscar/${nome}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
            'Authorization': token
        },
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ``
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset() 
    })
})