const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = Number(document.getElementById('id').value)

    fetch(`http://localhost:3000/motorista/${id}`,{
        method: 'DELETE',
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