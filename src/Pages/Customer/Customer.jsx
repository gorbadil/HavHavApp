import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "../../API/Customer";
import Container from "@mui/material/Container";
import TableForm from "../../Components/TableForm/TableForm";
import { Typography } from "@mui/material";

function Customer() {
  const apiList = [
    {
      name: "getCustomers",
      apiFn: getCustomers,
      key: "get",
    },
    {
      name: "addCustomer",
      apiFn: addCustomer,
      key: "add",
    },
    {
      name: "updateCustomer",
      apiFn: updateCustomer,
      key: "update",
    },
    {
      name: "deleteCustomer",
      apiFn: deleteCustomer,
      key: "delete",
    },
  ];
  const headName = ["customer"];
  const head = [
    {
      name: {
        dataBaseName: "name",
        siteName: "Müşteri Adı",
        field: "text",
      },
    },
    {
      mail: {
        dataBaseName: "mail",
        siteName: "Müşteri Email",
        field: "text",
      },
    },
    {
      address: {
        dataBaseName: "address",
        siteName: "Müşteri Adres",
        field: "text",
      },
    },
    {
      city: {
        dataBaseName: "city",
        siteName: "Müşteri Yaşadığı Şehir",
        field: "text",
      },
    },
    {
      phone: {
        dataBaseName: "phone",
        siteName: "Müşteri Telefon",
        field: "text",
      },
    },
  ];

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        mb={5}
        textAlign={"center"}
      >
        Müşteri Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Müşteri Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Müşteri Ekle
      </Typography>
      <AddNewForm head={head} headName={headName} apiList={apiList} />
    </Container>
  );
}

export default Customer;
