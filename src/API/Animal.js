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

export const addAnimal = async (animal) => {
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/animals",
    animal
  );
  return data;
};

export const updateAnimal = async (animal) => {
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/animals/" + animal.id,
    animal
  );
  return data;
};
