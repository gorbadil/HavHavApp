import Table from "@mui/material/Table";
import { ClickAwayListener, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./TableForm.css";
import { useState } from "react";

export default function TableForm({ head, apiList }) {
  TableForm.propTypes = {
    head: PropTypes.array,
    headName: PropTypes.array,
    apiList: PropTypes.array,
  };
  const queryClient = useQueryClient();
  const [updateForm, setUpdateForm] = useState({});

  const queries = useQueries({
    queries: apiList.map((api) => {
      if (api.key === "get") {
        return {
          queryKey: [...api.name],
          queryFn: api.apiFn,
        };
      }
    }),
  });

  const apiData = {};
  apiList.forEach((api, index) => {
    apiData[api.key] = queries[index].data || api.apiFn;
  });

  const handleDelete = async (e) => {
    const id = e.target.id;
    try {
      await apiData.delete(id);
      queryClient.invalidateQueries(apiData.get);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    if (Object.keys(updateForm).length === 0) return;
    try {
      await apiData.update(updateForm);
      queryClient.invalidateQueries(apiData.get);
    } catch (error) {
      console.log(error);
    }
    setUpdateForm({});
  };

  if (!Array.isArray(apiData.get)) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleUpdate}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="table-head">
            <TableRow>
              {head.map((headItem, index) => {
                const key = Object.keys(headItem)[0];
                const value = Object.values(headItem)[0];
                return (
                  <TableCell key={`${key}${index}`}>{value.siteName}</TableCell>
                );
              })}
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.get.map((row) => (
              <TableRow
                key={row.id}
                className={
                  row.id === updateForm.id ? "selected" : "not-selected"
                }
                onFocus={() => {
                  setUpdateForm({ ...row });
                }}
              >
                {head.map((headItem, index) => {
                  const key = Object.keys(headItem)[0];
                  const value = Object.values(headItem)[0];
                  return (
                    <TableCell key={`${key}${index}`}>
                      {value.field === "text" ? (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          id={key}
                          defaultValue={
                            updateForm.id === row.id
                              ? updateForm[key]
                              : row[key]
                          }
                          onChange={(e) => {
                            setUpdateForm({
                              ...updateForm,
                              [key]: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        <Select
                          id={key}
                          value={row[key]}
                          onChange={(e) => {
                            setUpdateForm({
                              ...updateForm,
                              [key]: e.target.value,
                            });
                          }}
                        >
                          {value.options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell>
                  <DeleteOutlineIcon
                    id={row.id}
                    onClick={handleDelete}
                    className="delete-icon"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ClickAwayListener>
  );
}
