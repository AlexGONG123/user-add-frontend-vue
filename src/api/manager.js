import axios from "~/axios"

export function login(username,password){
    return axios.post("/admin/login",{
        username,
        password
    })
}

export function getAdmin(){
    return axios.get("/admin/getAdmin")
}

export function getCurrentAdmin(){
    return axios.get("/admin/getCurrentAdmin");
}

export function logout(){
    return axios.get("/logout");
}