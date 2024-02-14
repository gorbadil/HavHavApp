import { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { useQueryClient } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineTwoToneIcon from "@mui/icons-material/RemoveCircleOutlineTwoTone";
import "./Available.css";

export default function Avaliable({ apiList }) {
  const [today, setToday] = useState(dayjs());
  Avaliable.propTypes = {
    head: PropTypes.array,
    apiList: PropTypes.array,
  };
  const [fullDate, setFullDate] = useState(today.format("YYYY-MM-DD"));

  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: apiList.map((api) => {
      if (api.key === "get" || api.key === "getDates") {
        return {
          queryKey: [...`${api.apiFn}`],
          queryFn: api.apiFn,
        };
      }
    }),
  });

  let apiData = {};

  apiList.forEach((api, index) => {
    apiData[api.name] = queries[index].data || api.apiFn;
  });

  const handleDateChange = (date) => {
    const day = date.date() < 10 ? "0" + date.date() : date.date();
    const month =
      date.month() + 1 < 10 ? "0" + (date.month() + 1) : date.month() + 1;
    setFullDate(date.year() + "-" + month + "-" + day);
    setToday(date);
  };

  const handleAddDate = async (event, doc, fullDate) => {
    await apiData.addDate(doc, fullDate);
    queryClient.invalidateQueries("get");
  };

  const handleDeleteDate = async (event) => {
    const id = event.target.id;
    await apiData.deleteDate(id);
    queryClient.invalidateQueries("get");
  };

  const todayData =
    Array.isArray(apiData.getDates) &&
    apiData.getDates.filter((item) => item.availableDate === fullDate);

  if (!Array.isArray(apiData.get)) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <DateCalendar value={today} disablePast onChange={handleDateChange} />
        </Grid>
        <Grid item>
          <div className="doctor-area">
            <p className="fullDate">{fullDate}</p>
            {apiData.get.map((doc) => (
              <div key={`doctor${doc.id}`} className="ava-date">
                <span key={doc.name}>{doc.name}</span>
                {Array.isArray(todayData) &&
                todayData.filter((item) => {
                  return item.doctor.name === doc.name;
                }).length > 0 ? (
                  <RemoveCircleOutlineTwoToneIcon
                    onClick={(event) => handleDeleteDate(event, doc, fullDate)}
                    style={{ color: "red", cursor: "pointer" }}
                    key={`${doc.name}remove`}
                    id={
                      Array.isArray(todayData) &&
                      todayData.filter(
                        (item) => item.doctor.name === doc.name
                      )[0].id
                    }
                  />
                ) : (
                  <AddCircleOutlineIcon
                    onClick={(event) => handleAddDate(event, doc, fullDate)}
                    style={{ color: "limegreen", cursor: "pointer" }}
                    key={`${doc.name}add`}
                  />
                )}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
