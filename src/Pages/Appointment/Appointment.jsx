import {
  getAppointments,
  deleteAppointment,
  addAppointment,
  updateAppointment,
} from "../../API/Appointment";
import { getDoctors } from "../../API/Doctor";
import { getAnimals } from "../../API/Animal";
import TableForm from "../../Components/TableForm/TableForm";
import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function Appointment() {
  const apiList = [
    {
      name: "get",
      apiFn: getAppointments,
      key: "get",
    },
    {
      name: "add",
      apiFn: addAppointment,
      key: "add",
    },
    {
      name: "update",
      apiFn: updateAppointment,
      key: "update",
    },
    {
      name: "delete",
      apiFn: deleteAppointment,
      key: "delete",
    },
    {
      name: "getDoctors",
      apiFn: getDoctors,
      key: "get",
    },
    {
      name: "getAnimals",
      apiFn: getAnimals,
      key: "get",
    },
  ];
  const headName = ["doctors"];
  const head = [
    {
      date: {
        dataBaseName: "date",
        siteName: "Tarih",
        field: "date",
      },
    },
    {
      doctor: {
        dataBaseName: "doctor.id",
        siteName: "Doktor",
        field: "select",
        options: "getDoctors",
      },
    },
    {
      animal: {
        dataBaseName: "animal.id",
        siteName: "Hayvan",
        field: "select",
        options: "getAnimals",
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
        Randevu Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Randevu Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Randevu Ekle
      </Typography>
      <AddNewForm head={head} headName={headName} apiList={apiList} />
    </Container>
  );
}
