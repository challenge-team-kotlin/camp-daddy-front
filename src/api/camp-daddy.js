import { apiClient } from "./client";



export const signUp = async (data) => {
    return apiClient.post("/members/signup", {
        name: data.name,
        email: data.email,
        nickName: data.nickName,
        phoneNumber: data.phoneNumber
    })
}

export const login = async (data) => {
    return apiClient.post("/members/login", {
        email: data.email,
        password: data.password
    })
}

export const memberInfo = async (id) => {
    return apiClient.get(`/members/${id}`)
}

export const memberInfoUpdate = async (id, data) => {
    return apiClient.put(`/members/${id}`, {
        nickName: data.name,
        phoneNumber: data.phoneNumber
    })
}

export const deleteMember = async (id) => {
    return apiClient.delete(`/members/${id}`)
}

export const getAllProducts = async () => {
    try {
        return (await apiClient.get(`/products/list`)).data.content
    } catch (e) {
        console.log(e)
    }
}

export const getProducts = async (query) => {
    return apiClient.get(`/products?startDate=${query.starDate}&endDate=${query.endDate}&category=${query.category}&filterReservation=${query.filterReservation}&search=${query.search}&page=${query.page}`);
}

export const postProduct = async (data) => {
    return apiClient.post(`/products`, {
        title: data.title,
        content: data.content,
        pricePerDay: data.price,
        images: data.img,
        category: data.category
    })
}

export const updateProduct = async (id, data) => {
    return apiClient.put(`/products/${id}`, {
        title: data.title,
        content: data.content,
        imageUrls: data.imageUrls,
        price: data.price,
        category: data.category
    })
}

export const deleteProduct = async (id) => {
    return apiClient.delete(`/products/${id}`)
}

export const getMemberProduct = async (id) => {
    return apiClient.get(`/products/members/${id}`)
}

export const getCategory = async () => {
    return (await apiClient.get(`/products/categories`)).data
}


export const getMyReservationList = async () => {
    return (await apiClient.get(`/reservations/me`))
}