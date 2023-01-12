import { allDepartments, createDepartment, deleteDepartment, allUsers, deleteUser, updateProfile, editDepartment, hireUser, dismissUser } from "../../../scripts/requests.js"

function logout(){
    const btnLogout = document.querySelector('.button-logout')
    
    btnLogout.addEventListener('click', (event) =>{
        localStorage.clear()
        window.location.replace('/')
    })

    
}


async function renderAllDepartments(){
    const ul = document.querySelector('.departments__container')
    const departments = await allDepartments()

    departments.forEach(department => { 
        
        const card = createAllDepartments(department)

        ul.appendChild(card)

    })
    
    renderDeleteDepartment()
}


function createAllDepartments(data){
    const li = document.createElement('li')
    const name = document.createElement('p')
    const description = document.createElement('p')
    const company = document.createElement('p')
    const div = document.createElement('div')
    const btnView = document.createElement('button')
    const btnEdit = document.createElement('button')
    const btnDelete = document.createElement('button')

    name.classList.add('department-name')
    description.classList.add('department-description')
    company.classList.add('company-name')
    btnView.classList.add('view-button')
    btnEdit.classList.add('edit-button')
    btnDelete.classList.add('delete-department')

    btnView.id = data.uuid

    btnView.addEventListener('click', async(event)=>{
        
        const id = event.target.id
        const users = await allUsers()
        
        const newUsers = users.filter(user => {
            if(user.department_uuid == id){
                
                return user
            }
        })

        
        const dialog = document.querySelector('.toast')
        const modal = document.querySelector('.modal__container--view')
        modal.innerHTML = ''
        modal.showModal()
        modal.appendChild(createViewModalTop(data))
        closeModal()
        
        if(newUsers.length <= 0){
            window.scrollTo(0, 0)
            handleToast('Nenhum usuário contratado', '#CE4646')
                setTimeout(() => {
                dialog.close()
            }, 3000)
        } else {
            newUsers.forEach(user => {
                const container = document.querySelector('.view-modal > ul')
                
                container.appendChild(createViewModalBotton(user))
                
            })
        }

    })

    btnDelete.id = data.uuid

    btnEdit.addEventListener('click', (event) => {
        const modal = document.querySelector('.modal__container')
        modal.innerHTML = ''
            
        modal.appendChild(createModalEditDepart(data))
        modal.showModal()
        
        closeModal()
        
        renderUpdateDep()
        
    })

    name.innerText = data.name
    description.innerText = data.description
    company.innerText = data.companies.name

    btnView.innerText = 'Vizualizar'
    btnEdit.innerText = 'Editar'
    btnDelete.innerText = 'Excluir'

    div.append(btnView, btnEdit, btnDelete)
    li.append(name, description, company, div)

    return li
}

function renderUpdateDep(){
    const input = document.querySelector('.modal__edit > input')
    const btnEdit = document.querySelector('.button-edit-depart')
    const newUser = {}
    
    btnEdit.addEventListener('click', async (event) =>{
        newUser[input.id] = input.value

        const id = event.target.id

        await editDepartment(newUser, id)

        window.location.reload()
        
    })

    return newUser
}


async function renderAllUsers(){
    const ul = document.querySelector('.users__container')
    const users = await allUsers()

    users.forEach(user => { 
        const card = createAllUsers(user)

        ul.appendChild(card)

    })
    
    renderDeleteUser()
}

function createAllUsers(data){
    const li = document.createElement('li')
    const username = document.createElement('p')
    const level = document.createElement('p')
    const company = document.createElement('p')
    const div = document.createElement('div')
    const btnEdit = document.createElement('button')
    const btnDelete = document.createElement('button')

    username.classList.add('username')
    level.classList.add('level')
    company.classList.add('company-name')
    
    btnEdit.classList.add('edit-button')
    btnDelete.classList.add('delete-user-button')

    btnDelete.id = data.uuid
    btnEdit.id = data.uuid

    const modal = document.querySelector('.modal__container')
   
        btnEdit.addEventListener('click', (event) =>{
            
            modal.innerHTML = ''
            
            modal.appendChild(createModalUpdateProfile(data))
            modal.showModal()
            
            closeModal()
            
            renderUpdateProfile()
        })

    username.innerText = data.username.toUpperCase()
    level.innerText = data.professional_level
    company.innerText = data.kind_of_work

    btnEdit.innerText = 'Editar'
    btnDelete.innerText = 'Excluir'

    div.append(btnEdit, btnDelete)
    li.append(username, level, company, div)

    return li
}

function renderDeleteUser(){
    const btns = document.querySelectorAll('.delete-user-button')
    const dialog = document.querySelector('.toast')
    const modal = document.querySelector('.modal__confirm')
    

    btns.forEach(btn => {
        btn.addEventListener('click', async (event) =>{
            modal.innerHTML = ''

            const uuid = event.target.id
            
            modal.appendChild(createModalConfirm())
            modal.showModal()
            closeModal()
            
            const btnConfirm = document.querySelector('.button-confirm')
            btnConfirm.addEventListener('click', async ()=>{
                await deleteUser(uuid)
    
                window.scrollTo(0, 0)
                handleToast('Deletado com sucesso', '#CE4646')
                    setTimeout(() => {
                    dialog.close()
                    window.location.reload()
                }, 3000)
                })

            })
    })

}

async function findUuid(data){
    const allDeps = await allDepartments()

    const findCompanie = allDeps.find(element => {
    if(element.companies.name == data){
        return element
    }
    })
    return findCompanie.companies.uuid
}



function renderCreateDepartment(){
    const btn = document.querySelector('.button-create')
    const inputs = document.querySelectorAll('.modal__edit > input')
    const dialog = document.querySelector('.toast')
    
    const newUser = {}
    
    btn.addEventListener('click', async (event) =>{
        const input = document.querySelector('#company_uuid')
        const value = input.value
        const uuid = await findUuid(value)
        input.value = uuid
        

        inputs.forEach(input => {
            newUser[input.id] = input.value
        })

        const request = await createDepartment(newUser)
        
        handleToast('Criado com sucesso', '#4BA036')
                setTimeout(() => {
                dialog.close()
                window.location.reload()
            }, 3000)

       
    })
    return newUser
}


function renderDeleteDepartment(){
    const btns = document.querySelectorAll('.delete-department')
    const dialog = document.querySelector('.toast')
    const modal = document.querySelector('.modal__confirm')
    
    btns.forEach(btn => {
        btn.addEventListener('click', async (event) =>{
            modal.innerHTML = ''
            
            modal.appendChild(createModalConfirm())
            modal.showModal()
            closeModal()

            const btnConfirm = document.querySelector('.button-confirm')
            const uuid = event.target.id
            
            btnConfirm.addEventListener('click', async (event) => {
                await deleteDepartment(uuid)
    
                handleToast('Deletado com sucesso', '#CE4646')
                    setTimeout(() => {
                    dialog.close()
                    window.location.reload()
                }, 3000)
                })

            })
    })

}

function createModalConfirm(){
    
    const div = document.createElement('div')
    const p = document.createElement('p')
    const button = document.createElement('button')
    const btnClose = document.createElement('button')

    p.innerText = 'Realmente deseja excluir?'
    button.innerText = 'Confirmar'
    button.classList.add('button-confirm')
    btnClose.classList.add('button-close')
    btnClose.addEventListener('click', () =>{})
    btnClose.innerText = 'X'
    p.appendChild(btnClose)
    div.append(p, button)

    return div 
}

function renderUpdateProfile(){
    const btnCreate = document.querySelector('.button-create')
    
    const inputs = document.querySelectorAll('.modal__edit > input')
    
    
    const newUser = {}

    
    btnCreate.addEventListener('click', async (event) =>{
       
        inputs.forEach(input => {
            newUser[input.id] = input.value.toLowerCase()
        })

        const request = await updateProfile(newUser, event.target.id)
       
    })

    return newUser
}



const allUser = await allUsers()
const usersNames = allUser.map(user => {
    return user.username
})

function createViewModalTop(data){
    
    const p = document.createElement('p')
    p.innerText = `Usuários cadastrados para contratar: ${usersNames.join(', ')}`

    const ul = document.createElement('ul')
    const container = document.createElement('div')
    const h1 = document.createElement('h1')
    const div = document.createElement('div')
    const top = document.createElement('div')
    const departDesc = document.createElement('p')
    const btnClose = document.createElement('button')
    const input = document.createElement('input')
    const btnToHire = document.createElement('button')
    

    container.classList.add('view-modal')

    top.classList.add('modal__top')

    btnClose.innerText = 'X'
    btnClose.classList.add('button-close')
    h1.innerText = data.name
    departDesc.innerText = data.description
    input.placeholder = 'Digite o nome do usuário'
    input.classList.add('input-hire')
    btnToHire.innerText = 'Contratar'
    btnToHire.classList.add('btn-hire')
    btnToHire.id = data.uuid
    
    btnToHire.addEventListener('click', (event) => {
        toHire()
    })
    
    top.append(h1, btnClose)
    div.append(departDesc, input, btnToHire)
    container.append(top, p, div, ul)

    return container
}

function createViewModalBotton(data){
    const li = document.createElement('li')
    const username = document.createElement('p')
    const level = document.createElement('p')
    const btnDismiss = document.createElement('button')

    btnDismiss.innerText = 'Desligar'
    btnDismiss.id = data.uuid
    btnDismiss.classList.add('button-dismiss')

    btnDismiss.addEventListener('click', (async event => {
        const userId = event.target.id
        await dismissUser(userId)
    }))

    username.innerText = data.username.toUpperCase()
    level.innerText = `Nível: ${data.professional_level}`

    li.append(username, level, btnDismiss)

    return li
}

const handleToast = (message, color) => {
    const container = document.querySelector('.toast')
    const p = document.createElement('p')
    
    container.innerHTML = ''
    p.innerText = message
    container.style.backgroundColor = color
    
    container.appendChild(p)
    
    container.show()
}


function createModalUpdateProfile(data){
    
    const div = document.createElement('div')
    const top = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const btnCreate = document.createElement('button')
    const inputName = document.createElement('input')
    const inputDesc = document.createElement('input')
    const label1 = document.createElement('label')
    label1.innerText = 'Modalidades: home office, presencial ou hibrido'
    const label = document.createElement('label')
    label.innerText = 'Níveis: estágio, júnior, pleno ou sênior'
    
    div.classList.add('modal__edit')
    top.classList.add('modal__top')
    btn.classList.add('button-close')
    btnCreate.classList.add('button-create')
    btnCreate.id = data.uuid
    
    
    p.innerText = 'Editar Usuário'
    btn.innerText = 'X'
    btnCreate.innerText = 'Editar'
    
    inputName.type = 'text'
    inputName.placeholder = 'Selecionar modalidade de trabalho '
    inputName.id = 'kind_of_work'
    
    inputDesc.type = 'text'
    inputDesc.placeholder = 'Selecionar nível profissional'
    inputDesc.id = 'professional_level'
    
    top.append(p, btn)
    div.append(top, inputName, label1, inputDesc, label, btnCreate)    
    
    return div
}

function createModalEditDepart(data){
    
    const div = document.createElement('div')
    const top = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const btnEdit = document.createElement('button')
    const inputDisc = document.createElement('input')
    inputDisc.id = 'description'
    
    div.classList.add('modal__edit')
    top.classList.add('modal__top')
    btn.classList.add('button-close')
    btnEdit.classList.add('button-edit-depart')
    btnEdit.id = data.uuid
    
    p.innerText = 'Editar Departamento'
    btn.innerText = 'X'
    btnEdit.innerText = 'Salvar alterações'
    
    inputDisc.placeholder = 'Digite a nova descrição'
    
    top.append(p, btn)
    div.append(top, inputDisc, btnEdit)    
    
    return div
}

function showModal(){
    const modal = document.querySelector('.modal__container')
    const btn = document.querySelector('.departments__section > div > button')
    btn.addEventListener('click', (event) =>{
        modal.innerHTML = ''
        
        modal.appendChild(createModal())
        modal.showModal()
        closeModal()
        renderCreateDepartment()
        
    })
    
}

function createModal(){
    
    const div = document.createElement('div')
    const top = document.createElement('div')
    const p = document.createElement('p')
    const btn = document.createElement('button')
    const btnCreate = document.createElement('button')
    const inputName = document.createElement('input')
    const inputDesc = document.createElement('input')
    const inputCompanie = document.createElement('input')
    
    div.classList.add('modal__edit')
    top.classList.add('modal__top')
    btn.classList.add('button-close')
    btnCreate.classList.add('button-create')
    
    p.innerText = 'Criar Departamento'
    btn.innerText = 'X'
    btnCreate.innerText = 'Criar Departamento'
    
    inputName.type = 'text'
    inputName.placeholder = 'Nome do departamento'
    inputName.id = 'name'
    
    inputDesc.type = 'text'
    inputDesc.placeholder = 'Descrição'
    inputDesc.id = 'description'
    
    inputCompanie.type = 'text'
    inputCompanie.placeholder = 'Selecionar empresa'
    inputCompanie.id = 'company_uuid'
    
    top.append(p, btn)
    div.append(top, inputName, inputDesc, inputCompanie, btnCreate)    
    
    return div
}

function closeModal(){
    const modal = document.querySelector('.modal__container')
    const modalView = document.querySelector('.modal__container--view')
    const modalConfirm = document.querySelector('.modal__confirm')
    const closeBtn = document.querySelectorAll('.button-close')
    
    closeBtn.forEach(btn => {
        btn.addEventListener('click', (event) =>{
            modal.close()
            modalView.close()
            modalConfirm.close()
        })
    })
    
}

async function toHire(){
    
    const btnToHire = document.querySelector('.btn-hire')
    const input = document.querySelector('.input-hire')
    const value = input.value

    const filterUser = allUser.filter(user => {
        if(user.username.toLowerCase() == value.toLowerCase()){
            return user
        }
    })
    
    const depUuid = btnToHire.id
    const userUuid = filterUser.map(user => {
       return user.uuid
    })

    const data = {
        "user_uuid": userUuid.toString(),
        "department_uuid": depUuid
    }

    await hireUser(data)
}


logout()
renderAllDepartments()
renderAllUsers()
showModal()