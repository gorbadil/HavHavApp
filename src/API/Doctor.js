import axios from "axios";

export const getDoctors = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/doctors"
  );
  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/doctors/" + id
  );
  return data;
};

export const addDoctor = async (doctor) => {
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/doctors",
    doctor
  );
  return data;
};

export const updateDoctor = async (doctor) => {
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/doctors/" + doctor.id,
    doctor
  );
  return data;
};
