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

export const addAppointment = async (appointments) => {
  const dateObject = new Date(appointments.date);
  const formattedDateTimeString = new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
  ).toISOString();
  appointments.date = formattedDateTimeString;
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/appointments",
    appointments
  );
  return data;
};

export const updateAppointment = async (appointments) => {
  const dateObject = new Date(appointments.date);
  const formattedDateTimeString = new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
  ).toISOString();
  appointments.date = formattedDateTimeString;
  console.log(appointments);
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/appointments/" + appointments.id,
    appointments
  );
  return data;
};
