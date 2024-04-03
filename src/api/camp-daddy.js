import { apiClient } from "./client";



export const signUp = async (data) => {
    return apiClient.post("/signup", {
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        provider: data.provider,
        providerId: data.providerId
    })
}

export const memberInfo = async (id) => {
    return apiClient.get(`/members/${id}`)
}

export const memberInfoUpdate = async (id, data) => {
    return apiClient.put(`/members/${id}`, {
        nickname: data.nickname
    })
}

export const deleteMember = async (id) => {
    return apiClient.delete(`/members/${id}`)
}

export const checkNickname = async (nickname) => {
    return apiClient.get(`/check_nickname?nickname=${nickname}`)
}

export const getAllProducts = async () => {
    try {
        return (await apiClient.get(`/products/list`)).data.content
    } catch (e) {
        console.log(e)
    }
}

export const getProduct = async (id) => {
    try {
        return (await apiClient.get(`/products/${id}`)).data
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
        images: data.images,
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
    return (await apiClient.get(`/products/members/${id}`)).data
}

export const getCategory = async () => {
    return (await apiClient.get(`/products/categories`)).data
}


export const getMyReservationList = async () => {
    return (await apiClient.get(`/reservations/me`))
}


export const getProductReservationList = async (productId) => {
    return (await apiClient.get(`/reservations/products/${productId}`))
}

export const getReview = async (id) => {
    return (await apiClient.get(`/reviews/products/${id}`)).data
}

export const patchReservationStatus = async (id, status) => {
    return apiClient.patch(`/reservations/${id}?reservationStatus=${status}`)
}

export const createReservation = async (data) => {
    return apiClient.post(`/reservations`,data)
}