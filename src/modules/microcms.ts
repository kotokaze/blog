import axios, { AxiosRequestConfig } from 'axios'
import aspida from '@aspida/axios'
import api from "@/api/$api"

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.MICROCMS_API_HOST!,
  headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
}

const microcmsClient = api(aspida(axios, axiosConfig))

export default microcmsClient
