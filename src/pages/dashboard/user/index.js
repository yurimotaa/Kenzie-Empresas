import { getUser, attUser, departmentsOfUser, allDepartments } from "../../../scripts/requests.js"

function logout(){
    const btnLogout = document.querySelector('.button-logout')
    
    btnLogout.addEventListener('click', (event) =>{
        localStorage.clear()
        window.location.replace('/')
    })

    
}

async function renderData(){
    
    const section = document.querySelector('.user')
    const user = await getUser()
    
    
    section.appendChild(createData(user))
    
    showModalCreatePost()
    
}

function createData(data){
    
    const section = document.createElement('section')
    const h2 = document.createElement('h2')
    const div = document.createElement('div')
    const pEmail = document.createElement('p')
    const pLevel = document.createElement('p')
    const pModality = document.createElement('p')
    const button = document.createElement('button')
    
    button.classList.add('button-edit-user')
    button.innerText = 'Editar Perfil'
    section.classList.add('user__container')
    
    h2.innerText = data.username.toUpperCase()
    pEmail.innerText = data.email
    pLevel.innerText = data.professional_level
    pModality.innerText = data.kind_of_work

    div.append(pModality, pEmail, pLevel, button)
    section.append(h2, div)
    return section
}

async function renderDepartmentDataOfUser(){
    const department = await departmentsOfUser()
    const main = document.querySelector('.department')
    
    department.forEach(dep => {
        main.appendChild(createDepartmentsUserData(dep))

    })
    
}

function createDepartmentsUserData(data){

    const div = document.createElement('div')
    
    const p = document.createElement('p')
    const span = document.createElement('span')

    div.classList.add('department-data')

    
    p.innerText = `Setor: ${data.name}`
    span.innerText = `Descrição: ${data.description}`

    div.append(p, span)
    

    return div
}

async function renderDepartmentsOfUsers(){
    const department = await departmentsOfUser()
    const div = document.querySelector('.department')
    const users = department[0].users
    

    users.forEach(user => {
        div.appendChild(createDepartmentsUser(user))
    })
}

function createDepartmentsUser(data){

    const ul = document.createElement('ul')
    const h2 = document.createElement('h2')
    const li = document.createElement('li')
    const username = document.createElement('p')
    const level = document.createElement('p')

    ul.classList.add('departments__users')

    h2.innerText = 'Funcionários'
    username.innerText = data.username.toUpperCase()
    level.innerText = data.professional_level.toUpperCase()


    li.append(username, level)
    
    ul.append(h2, li)

    return ul
}

function showModalCreatePost(){
    const modal = document.querySelector('.modal__container')
    const btn = document.querySelector('.button-edit-user')
    
    btn.addEventListener('click', (event) =>{
        modal.innerHTML = ''
        
        modal.appendChild(createModalCreatePost())
        modal.showModal()
        closeModal()
        updateUser()
    })

}



function updateUser(){
    const btn = document.querySelector('.button-edit')
    const inputs = document.querySelectorAll('.modal__edit > input')
    const newUser = {}
    
    btn.addEventListener('click', async (event) =>{
        inputs.forEach(input => {
            newUser[input.id] = input.value
            input.value = ''
        })
        const request = await attUser(newUser)
        window.location.reload()
        return newUser
    })
}


function createModalCreatePost(){
    
    const div = document.createElement('div')
    const top = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const btnEdit = document.createElement('button')
    const inputName = document.createElement('input')
    const inputEmail = document.createElement('input')
    const inputPass = document.createElement('input')
    div.classList.add('modal__edit')
    top.classList.add('modal__top')
    btn.classList.add('button-close')
    btnEdit.classList.add('button-edit')
    
    p.innerText = 'Editar Perfil'
    btn.innerText = 'X'
    btnEdit.innerText = 'Editar Perfil'
    
    inputName.type = 'text'
    inputName.placeholder = 'Seu nome'
    inputName.id = 'username'
    
    inputEmail.type = 'text'
    inputEmail.placeholder = 'Seu e-mail'
    inputEmail.id = 'email'
    
    inputPass.type = 'password'
    inputPass.placeholder = 'Sua senha'
    inputPass.id = 'password'
    
    top.append(p, btn)
    div.append(top, inputName, inputEmail, inputPass, btnEdit)    
    
    return div
}

function closeModal(){
    const modal = document.querySelector('.modal__container')
    const closeBtn = document.querySelector('.button-close')
    
    closeBtn.addEventListener('click', (event) =>{
        modal.close()
    })
}

async function verifyIfContracted(){
    const user = await getUser()

    if(!user.department_uuid){
        createdNoJobs()
    } else if(user.department_uuid){
        renderDepartmentDataOfUser()
        renderDepartmentsOfUsers()
    }
}

function createdNoJobs(){
    const section = document.querySelector('.department')
    const div = document.createElement('div')
    div.classList.add('empty-jobs')
    const p = document.createElement('p')
    p.innerText = 'Você ainda não foi contratado'

    div.appendChild(p)
    section.appendChild(div)
    
}

logout()
renderData()
/* renderDepartmentDataOfUser() */
/* renderDepartmentsOfUsers() */
verifyIfContracted()
