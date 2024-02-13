import axios from "axios";

export const getAnimals = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/animals"
  );
  return data;
};

export const deleteAnimal = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/animals/" + id
  );
  return data;
};

export const addAnimal = async (customer) => {
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/animals",
    customer
  );
  return data;
};

export const updateAnimal = async (customer) => {
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/animals/" + customer.id,
    customer
  );
  return data;
};
