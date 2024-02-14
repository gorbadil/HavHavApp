import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import Container from "@mui/material/Container";
import TableForm from "../../Components/TableForm/TableForm";
import { Typography } from "@mui/material";
import {
  getAnimals,
  addAnimal,
  deleteAnimal,
  updateAnimal,
} from "../../API/Animal";
import { getCustomers } from "../../API/Customer";

function Animal() {
  const apiList = [
    {
      name: "get",
      apiFn: getAnimals,
      key: "get",
    },
    {
      name: "getCustomers",
      apiFn: getCustomers,
      key: "get",
    },
    {
      name: "add",
      apiFn: addAnimal,
      key: "add",
    },
    {
      name: "update",
      apiFn: updateAnimal,
      key: "update",
    },
    {
      name: "delete",
      apiFn: deleteAnimal,
      key: "delete",
    },
  ];
  const headName = ["animal"];
  const head = [
    {
      name: {
        dataBaseName: "name",
        siteName: "Hayvan Adı",
        field: "text",
      },
    },
    {
      species: {
        dataBaseName: "species",
        siteName: "Hayvan Türü",
        field: "text",
      },
    },
    {
      breed: {
        dataBaseName: "breed",
        siteName: "Hayvan Irkı",
        field: "text",
      },
    },
    {
      gender: {
        dataBaseName: "gender",
        siteName: "Hayvan Cinsiyeti",
        field: "text",
      },
    },
    {
      dateOfBirth: {
        dataBaseName: "dateOfBirth",
        siteName: "Hayvan Doğum Tarihi",
        field: "text",
      },
    },
    {
      colour: {
        dataBaseName: "colour",
        siteName: "Hayvan Rengi",
        field: "text",
      },
    },
    {
      customer: {
        dataBaseName: "customer.id",
        siteName: "Müşteri",
        field: "select",
        options: "getCustomers",
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
        Hayvan Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Hayvan Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Hayvan Ekle
      </Typography>
      <AddNewForm head={head} headName={headName} apiList={apiList} />
    </Container>
  );
}

export default Animal;
