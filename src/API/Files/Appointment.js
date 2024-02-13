import axios from "axios";

export const getAppointments = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/appointments"
  );
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/appointments/" + id
  );
  return data;
};

export const addAppointment = async (customer) => {
  customer.date = new Date(customer.date).toISOString();
  console.log(customer);
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/appointments",
    customer
  );
  return data;
};

export const updateAppointment = async (customer) => {
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/appointments/" + customer.id,
    customer
  );
  return data;
};
