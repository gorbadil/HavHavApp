import {
  getDoctors,
  addDoctor,
  deleteDoctor,
  updateDoctor,
} from "../../API/Doctor";
import { getDates, addDate, deleteDate } from "../../API/Avaliable";
import TableForm from "../../Components/TableForm/TableForm";
import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import Available from "../../Components/Available/Available";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function Doctor() {
  const apiList = [
    {
      name: "get",
      apiFn: getDoctors,
      key: "get",
    },
    {
      name: "add",
      apiFn: addDoctor,
      key: "add",
    },
    {
      name: "update",
      apiFn: updateDoctor,
      key: "update",
    },
    {
      name: "delete",
      apiFn: deleteDoctor,
      key: "delete",
    },
    {
      name: "getDates",
      apiFn: getDates,
      key: "getDates",
    },
    {
      name: "addDate",
      apiFn: addDate,
      key: "addDate",
    },
    {
      name: "deleteDate",
      apiFn: deleteDate,
      key: "deleteDate",
    },
  ];
  const headName = ["doctors"];
  const head = [
    {
      name: {
        dataBaseName: "name",
        siteName: "Doktor Adı",
        field: "text",
      },
    },
    {
      email: {
        dataBaseName: "email",
        siteName: "Doktor Email",
        field: "text",
      },
    },
    {
      address: {
        dataBaseName: "address",
        siteName: "Doktor Adres",
        field: "text",
      },
    },
    {
      city: {
        dataBaseName: "city",
        siteName: "Doktor Yaşadığı Şehir",
        field: "text",
      },
    },
    {
      phone: {
        dataBaseName: "phone",
        siteName: "Doktor Telefon",
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
        Doktor Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Doktor Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Doktor Ekle
      </Typography>
      <AddNewForm head={head} headName={headName} apiList={apiList} />
      <Available head={head} apiList={apiList} />
    </Container>
  );
}
