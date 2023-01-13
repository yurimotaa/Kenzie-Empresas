export async function requestAllCompanies(){
    const allCompanies = await fetch('http://localhost:6278/companies', {
        method: 'GET',
        headers: {
            Authorization: `Bearer null`
        }
    })

    const allCompaniesJson = await allCompanies.json()

    return allCompaniesJson
}




export async function companiesBySector(sector){
    const companies = await fetch(`http://localhost:6278/companies/${sector}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer null`
        }
    })

    const companiesJson = await companies.json()

    return companiesJson
}

export async function register(data){
    const dialog = document.querySelector('.toast')
    const newUser = await fetch(`http://localhost:6278/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const newUserJson = await newUser.json()

    if(!newUser.ok){
        handleToast(newUserJson.error.toUpperCase(), '#CE4646')
        setTimeout(() => {
            dialog.close()
        }, 3000)
    } else{
        handleToast('Cadastrado com sucesso', '#4BA036')
        setTimeout(() => {
            dialog.close()
            window.location.replace('/src/pages/login/index.html')
        }, 3000)
    }

    return newUserJson
}

export async function login(data){
    const dialog = document.querySelector('.toast')
    const loginUser = await fetch(`http://localhost:6278/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const loginUserJson = await loginUser.json()

    if(!loginUser.ok){
        handleToast(loginUserJson.error.toUpperCase(), '#CE4646')
        setTimeout(() => {
            dialog.close()
        }, 3000)
        
    } else{
        handleToast('Login efetuado'.toUpperCase(), '#4BA036')
        setTimeout(() => {
            dialog.close()
        }, 3000)
        localStorage.setItem('@kenzieEmpresas:token', JSON.stringify(loginUserJson))
        const verify = await verifyAdmUser()
        if(verify.is_admin){
            window.location.replace('/src/pages/dashboard/adm/index.html')
        } else if (!verify.is_admin) {
            window.location.replace('/src/pages/dashboard/user/index.html')
        }
    }
    
    return loginUserJson
    
}

export async function verifyAdmUser(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token
    const isAdm = await fetch(`http://localhost:6278/auth/validate_user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const isAdmJson = await isAdm.json()

    return isAdmJson
}

export async function getUser(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const userGet = await fetch(`http://localhost:6278/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const userGetJson = await userGet.json()

    return userGetJson

}


export async function attUser(data){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const userAtt = await fetch (`http://localhost:6278/users`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const userAttJson = await userAtt.json()

    return userAttJson
}


export async function allDepartments(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const departments = await fetch(`http://localhost:6278/departments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const departmentsJson = await departments.json()

    return departmentsJson
    
}

export async function allUsers(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const users = await fetch(`http://localhost:6278/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const usersJson = await users.json()

    return usersJson
    
}

export async function createDepartment(data){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const department = await fetch (`http://localhost:6278/departments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const departmentJson = await department.json() || {}

    
    return departmentJson
}

export async function deleteDepartment(id){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const department = await fetch(`http://localhost:6278/departments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

}


export async function deleteUser(id){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const del = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
}

export async function departmentsById(id){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const departments = await fetch(`http://localhost:6278/departments/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const departmentsJson = await departments.json()

    return departmentsJson
}


export async function updateProfile(data, id){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const profile = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })

    const profileJson = await profile.json()
    const dialog = document.querySelector('.toast')
    if(!profile.ok){
        window.scrollTo(0, 0)
        handleToast(profileJson.error.toUpperCase(), '#CE4646')
                setTimeout(() => {
                dialog.close()
            }, 3000)
    } else if (profile.ok){
        window.scrollTo(0, 0)
        handleToast('Atualizado com sucesso', '#4BA036')
                    setTimeout(() => {
                    dialog.close()
                    window.location.reload()
                }, 3000)

    }

    return profileJson
}

export async function departmentsOfUser(){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const departments = await fetch(`http://localhost:6278/users/departments/coworkers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const departmentsJson = await departments.json()
    
    return departmentsJson
}


export async function editDepartment(data, uuid){
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const department = await fetch(`http://localhost:6278/departments/${uuid}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const departmentJson = await department.json()
    
    return departmentJson
}

export async function hireUser(data){
    const dialog = document.querySelector('.toast')
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const userToHire = await fetch(`http://localhost:6278/departments/hire/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const userToHireJson = await userToHire.json()
    
    if(!userToHire.ok){
        window.scrollTo(0, 0)
        handleToast(userToHireJson.error.toUpperCase(), '#CE4646')
                setTimeout(() => {
                dialog.close()
            }, 3000)
    } else {
        window.scrollTo(0, 0)
        handleToast('Usuário contratado com sucesso', '#4BA036')
                setTimeout(() => {
                dialog.close()
                window.location.reload()
            }, 3000)
    }

    return userToHireJson
}

export async function dismissUser(id){
    const dialog = document.querySelector('.toast')
    const user = JSON.parse(localStorage.getItem('@kenzieEmpresas:token')) || {}
    const token = user.token

    const userToDismiss = await fetch(`http://localhost:6278/departments/dismiss/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    const userToDismissJson = await userToDismiss.json()
    
    if(!userToDismiss.ok){
        window.scrollTo(0, 0)
        handleToast(userToDismissJson.error.toUpperCase(), '#CE4646')
                setTimeout(() => {
                dialog.close()
            }, 3000)
    } else {
        window.scrollTo(0, 0)
        handleToast('Usuário demitido com sucesso', '#4BA036')
                setTimeout(() => {
                dialog.close()
                window.location.reload()
            }, 3000)
    }

    return userToDismissJson
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