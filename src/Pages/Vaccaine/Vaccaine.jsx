import {
  getVaccines,
  addVaccine,
  deleteVaccine,
  updateVaccine,
} from "../../API/Vaccine";
import { getAnimals } from "../../API/Animal";
import TableForm from "../../Components/TableForm/TableForm";
import AddNewForm from "../../Components/AddNewForm/AddNewForm";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

export default function Vaccaince() {
  const alertStr = "Rapor Bulunamadı!";
  const apiList = [
    {
      name: "get",
      apiFn: getVaccines,
      key: "get",
    },
    {
      name: "add",
      apiFn: addVaccine,
      key: "add",
    },
    {
      name: "update",
      apiFn: updateVaccine,
      key: "update",
    },
    {
      name: "delete",
      apiFn: deleteVaccine,
      key: "delete",
    },
    {
      name: "getAnimals",
      apiFn: getAnimals,
      key: "get",
    },
  ];
  const headName = ["Vaccaine"];
  const head = [
    {
      name: {
        dataBaseName: "name",
        siteName: "Aşı Adı",
        field: "text",
      },
    },
    {
      code: {
        dataBaseName: "code",
        siteName: "Aşı Kodu",
        field: "text",
      },
    },
    {
      protectionStartDate: {
        dataBaseName: "protectionStartDate",
        siteName: "Koruma Başlangıç Tarihi",
        field: "date",
      },
    },
    {
      protectionFinishDate: {
        dataBaseName: "protectionFinishDate",
        siteName: "Koruma Bitiş Tarihi",
        field: "date",
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
        Aşı Yönetimi
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Aşı Listesi
      </Typography>
      <TableForm headName={headName} head={head} apiList={apiList} />
      <Typography variant="h4" component="h2" gutterBottom mt={5}>
        Aşı Ekle
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
