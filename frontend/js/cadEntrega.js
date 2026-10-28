const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        cidade: document.getElementById('cidade').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: Number(document.getElementById('idCarga').value)
    }

    fetch(`http://localhost:3000/entrega`,{
        method: 'POST',
        headers: {'content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ``
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset() 
    })
})