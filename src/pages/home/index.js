import { requestAllCompanies, verifyAdmUser, companiesBySector } from "../../scripts/requests.js"

function showMenuMobile(){
    const btn = document.querySelector('.button-menu')
    const menu = document.querySelector('.menu-hidden')
    btn.addEventListener('click', (event) =>{
        menu.classList.toggle('show-menu-mobile')
    })
}

showMenuMobile()


async function renderCards(){
    const allCompanies = await requestAllCompanies()
    const container = document.querySelector('.cards__container')
    
    allCompanies.forEach(companie => {
        const card = createCard(companie)

        container.appendChild(card)
    })

}

async function renderCompaniesBySector(){
    const select = document.querySelector('#sectors')
    /* const valueSelect = select.options[select.selectedIndex].value */
    const container = document.querySelector('.cards__container')
    


    select.addEventListener('change', async function(){
        
        if(select.value == 'escolher setor'){
            container.innerHTML = ''
            renderCards()
        } else{
            container.innerHTML = ''
            const request = await companiesBySector(select.value)
            request.forEach(companie => {
                const card = createCard(companie)
    
                container.appendChild(card)
            })
        }
    })

}

function buttons(){
    const buttonLogin = document.querySelector('.button-login')
    const buttonRegister = document.querySelector('.button-register')

    buttonLogin.addEventListener('click', ()=>{
        window.location.replace('/src/pages/login/index.html')
    })

    buttonRegister.addEventListener('click', ()=>{
        window.location.replace('/src/pages/register/index.html')
    })
}


function createCard(data){
    
    const li = document.createElement('li')
    const title = document.createElement('p')
    const hour = document.createElement('p')
    const sector = document.createElement('p')
    
    li.classList.add('card')
    title.classList.add('card__title')
    hour.classList.add('card__hour')
    sector.classList.add('card__sector')
    
    title.innerText = data.name
    hour.innerText = data.opening_hours
    sector.innerText = data.sectors.description
    
    li.append(title, hour, sector)
    
    return li
}



buttons()
renderCards()
renderCompaniesBySector()

/* renderLogin() */