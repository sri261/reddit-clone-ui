import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  //   baseURL: process.env.REACT_APP_REDDIT_API_URL,
  baseURL: "http://localhost:4000",
  headers: {
    ["Content-Type"]: "application/json",
  },
});

export const extractStandardResponseData = (res: AxiosResponse) => res.data;
