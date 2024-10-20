import axios from "axios";
import { addTokenToHeader } from "../helper";

export const getAllJobData = async (data) => {
  try {
    const headers = addTokenToHeader({headers:{}})
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/job/`, 
      {headers}
    );
    return res.data
  } catch (error) {
    if (error.response) {
      console.log("Error Response:", error.response.data);
    }
    return {
      status: error.status,
      message: error.response.data.message
    };
  }
};

export const getJobById = async (id) => {
    const headers = addTokenToHeader({headers:{}})
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/job/${id}`, 
      {headers}
    );
    return res.data
};

export const addJob = async (jobData) => {
  const headers = addTokenToHeader({headers:{}})
  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/job/create`,
    jobData, 
    {headers}
  );
  return res.data
};


export const editJob = async (id, data) => {
  const headers = addTokenToHeader({headers:{}})
  const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/job/${id}`, 
    data,
    {headers}
  );
  return res.data
};

export const getJobBySearch = async (data) => {
  const headers = addTokenToHeader({headers:{}})
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/job/search/${data}`, 
    {headers}
  );
  return res.data
};
  