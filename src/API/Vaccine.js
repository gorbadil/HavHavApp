import axios from "axios";

export const getVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/vaccines"
  );
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/vaccines/" + id
  );
  return data;
};

export const addVaccine = async (vaccine) => {
  vaccine.protectionStartDate = vaccine.protectionStartDate.substring(0, 10);
  vaccine.protectionFinishDate = vaccine.protectionFinishDate.substring(0, 10);
  vaccine = {
    name: vaccine.name,
    code: vaccine.code,
    protectionStartDate: vaccine.protectionStartDate,
    protectionFinishDate: vaccine.protectionFinishDate,
    animalWithoutCustomer: {
      id: vaccine.animal.id,
      name: vaccine.animal.name,
      species: vaccine.animal.species,
      breed: vaccine.animal.breed,
      gender: vaccine.animal.gender,
      dateOfBirth: vaccine.animal.dateOfBirth,
      colour: vaccine.animal.colour,
    },
    reportId: Math.floor(Math.random() * 1000),
  };
  console.log(vaccine);
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/vaccines",
    vaccine
  );
  return data;
};

export const updateVaccine = async (vaccine) => {
  console.log(vaccine);
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/vaccines/" + vaccine.id,
    vaccine
  );
  return data;
};
