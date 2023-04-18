import { login, verifyAdmUser } from "../../scripts/requests.js"

function showMenuMobile(){
    const btn = document.querySelector('.button-menu')
    const menu = document.querySelector('.menu-hidden')
    btn.addEventListener('click', (event) =>{
        menu.classList.toggle('show-menu-mobile')
    })
}

showMenuMobile()

function loginForm(){
    const inputs = document.querySelectorAll('input')
    const btnLogin = document.querySelector('.form__button-login')
    const newUser = {}
    
    btnLogin.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            newUser[input.id] = input.value
            input.value = ''
        })


        const request = await login(newUser)
        
        
        localStorage.setItem('@kenzieEmpresas:token', JSON.stringify(request))
        

    })

    return newUser
}

function buttons(){
    const buttonHome = document.querySelector('.button-home')
    const buttonRegister = document.querySelector('.button-register')
    const buttonBack = document.querySelector('.form__button-back')


    buttonHome.addEventListener('click', ()=>{
        window.location.replace('/')
    })

    buttonRegister.addEventListener('click', ()=>{
        window.location.replace('/src/pages/register/index.html')
    })

    buttonBack.addEventListener('click', (event)=>{
        event.preventDefault()
        window.location.replace('/')
    })
}

async function redirect(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const verify = await verifyAdmUser(user)
 
   if(user){
    if(verify.is_admin == true){
        window.location.replace('/src/pages/dashboard/adm/index.html')
    } else if(verify.is_admin == false){
        window.location.replace('/src/pages/dashboard/user/index.html')
    }
   }
}



buttons()
redirect()
loginForm()






