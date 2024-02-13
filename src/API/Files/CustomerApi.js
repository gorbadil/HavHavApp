import axios from "axios";

export const getCustomers = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/customers"
  );
  return data;
};

export const deleteCustomer = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/customers/" + id
  );
  return data;
};

export const addCustomer = async (customer) => {
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/customers",
    customer
  );
  return data;
};

export const updateCustomer = async (customer) => {
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/customers/" + customer.id,
    customer
  );
  return data;
};
