import {axiosAuth} from './axios'

export const getDoctorAppointment = (id) => {
    return axiosAuth.get(`/doctor/${id}/appointment`);
}

export const getAppointmentById = (id) => {
    return axiosAuth.get(`/appointment/${id}`)
}

export const getAvailableSlots = (data) => {
    return axiosAuth.get(`/appointment/slots/${data.doctorID}&${data.day}&${data.date}`)
}

export const updateAppointment = (data) => {
    const id = data._id
    delete data._id
    // console.log(data);
    return axiosAuth.patch(`/appointment/${id}`, {data:data})
}

export const createAppointment = (data) => {
    return axiosAuth.post('/appointment', data)
}