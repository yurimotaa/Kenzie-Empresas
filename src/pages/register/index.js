import { register, verifyAdmUser } from "../../scripts/requests.js"

function showMenuMobile(){
    const btn = document.querySelector('.button-menu')
    const menu = document.querySelector('.menu-hidden')
    btn.addEventListener('click', (event) =>{
        menu.classList.toggle('show-menu-mobile')
    })
}

showMenuMobile()


function registerForm(){
    const inputs = document.querySelectorAll('input')
    const btnRegister = document.querySelector('.form__button-register')
    const newUser = {}

    btnRegister.addEventListener('click', async (event) =>{
        event.preventDefault()

        inputs.forEach(input => {
            newUser[input.id] = input.value.toLowerCase()
            input.value = ''
        })
        const request = await register(newUser)
        localStorage.setItem('@kenzieEmpresas:user', JSON.stringify(request))
        
       
    })

    return newUser
}

function buttons(){
    const buttonHome = document.querySelector('.button-home')
    const buttonLogin = document.querySelector('.button-login')
    const buttonBack = document.querySelector('.form__button-back')

    buttonHome.addEventListener('click', ()=>{
        window.location.replace('/')
    })

    buttonLogin.addEventListener('click', ()=>{
        window.location.replace('/src/pages/login/index.html')
    })

    buttonBack.addEventListener('click', (event)=>{
        event.preventDefault()
        window.location.replace('/')
    })
}
buttons()

registerForm()


