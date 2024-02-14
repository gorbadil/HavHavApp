import axios from "axios";

export const getReports = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_API_URL + "/api/v1/reports"
  );
  return data;
};

export const deleteReport = async (id) => {
  const { data } = await axios.delete(
    import.meta.env.VITE_API_URL + "/api/v1/reports/" + id
  );
  return data;
};

export const addReport = async (report) => {
  const newReport = {
    diagnosis: report.diagnosis,
    price: Number(report.price),
    appointmentId: Number(report.appointmentId.id),
  };
  const { data } = await axios.post(
    import.meta.env.VITE_API_URL + "/api/v1/reports",
    newReport
  );
  return data;
};

export const updateReport = async (report) => {
  console.log(report);
  const newReport = {
    diagnosis: report.diagnosis,
    price: Number(report.price),
    appointmentId: Number(report.appointmentForReportResponseDto.id),
  };
  console.log(newReport);
  const { data } = await axios.put(
    import.meta.env.VITE_API_URL + "/api/v1/reports/" + report.id,
    newReport
  );
  return data;
};
