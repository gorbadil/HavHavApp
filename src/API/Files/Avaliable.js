import axios from "axios";

export const getDates = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/available-dates"
  );
  return data;
};

export const deleteDate = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/available-dates/" + id
  );
  return data;
};

export const addDate = async (doc, fullDate) => {
  const obj = {
    availableDate: fullDate,
    doctor: {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      address: doc.address,
      city: doc.city,
      phone: doc.phone,
    },
  };
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/available-dates",
    obj
  );
  return data;
};
