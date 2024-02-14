import {
  getReports,
  addReport,
  deleteReport,
  updateReport,
} from "../../API/Report";
import { getAppointments } from "../../API/Appointment";
import { getAnimals } from "../../API/Animal";
import TableForm from "../../Components/TableForm/TableForm";
import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function Report() {
  const alertStr = "Randevu Bulunamadı!";
  const apiList = [
    {
      name: "get",
      apiFn: getReports,
      key: "get",
    },
    {
      name: "add",
      apiFn: addReport,
      key: "add",
    },
    {
      name: "update",
      apiFn: updateReport,
      key: "update",
    },
    {
      name: "delete",
      apiFn: deleteReport,
      key: "delete",
    },
    {
      name: "getAppointments",
      apiFn: getAppointments,
      key: "get",
    },
    {
      name: "getAnimals",
      apiFn: getAnimals,
      key: "get",
    },
  ];
  const headName = ["Report"];
  const head = [
    {
      diagnosis: {
        dataBaseName: "diagnosis",
        siteName: "Rapor İçeriği",
        field: "text",
      },
    },
    {
      price: {
        dataBaseName: "price",
        siteName: "Tutar",
        field: "text",
      },
    },
    {
      appointmentForReportResponseDto: {
        dataBaseName: "appointmentId",
        siteName: "Randevu",
        field: "select",
        options: "getAppointments",
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
        Rapor Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Rapor Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Rapor Ekle
      </Typography>
      <AddNewForm
        alertStr={alertStr}
        head={head}
        headName={headName}
        apiList={apiList}
      />
    </Container>
  );
}
