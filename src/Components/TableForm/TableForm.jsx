import Table from "@mui/material/Table";
import { ClickAwayListener, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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
import { useEffect, useState } from "react";

export default function TableForm({ head, apiList }) {
  const [ready, setReady] = useState(false);
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

  useEffect(() => {
    const checkArrayValues = () => {
      const allGetKeysWithArrayValues = apiList
        .filter((api) => api.key.startsWith("get"))
        .every((api) => Array.isArray(apiData[api.name]));
      if (allGetKeysWithArrayValues) {
        setReady(true);
      }
    };

    checkArrayValues();
  }, [apiData, apiList]);

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

  if (!ready) {
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
                  updateForm.id !== row.id ? setUpdateForm({ ...row }) : null;
                }}
              >
                {head.map((headItem, index) => {
                  const key = Object.keys(headItem)[0];
                  const headItemValue = Object.values(headItem)[0];
                  return (
                    <TableCell key={`${headItem[key]}${index}`}>
                      {headItemValue.field !== "select" ? (
                        <TextField
                          variant="standard"
                          autoComplete="off"
                          id={key}
                          key={`${key}${index}asd`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdate();
                            }
                          }}
                          defaultValue={
                            updateForm.id === row.id
                              ? updateForm[key]
                              : row[key]
                          }
                          type={
                            headItemValue.field === "date"
                              ? "datetime-local"
                              : null
                          }
                          onChange={(e) => {
                            setUpdateForm({
                              ...updateForm,
                              [key]:
                                // headItemValue.field === "date"
                                // ? e.target.value.toString()
                                e.target.value,
                            });
                          }}
                        />
                      ) : headItemValue.field === "select" ? (
                        <FormControl variant="standard">
                          <Select
                            id={key}
                            key={`${key}${index}asd`}
                            value={
                              updateForm.id === row.id && updateForm[key]
                                ? updateForm[key].id
                                : row[key].id
                            }
                            onChange={(e) => {
                              setUpdateForm((prev) => {
                                const updatedItem = apiData[
                                  headItemValue.options
                                ].find(
                                  (findItem) => findItem.id === e.target.value
                                );
                                const newState = {
                                  ...prev,
                                  [key]: { ...updatedItem },
                                };
                                return newState;
                              });
                            }}
                          >
                            {apiData[headItemValue.options].map(
                              (option, index) => {
                                return (
                                  <MenuItem key={index} value={option.id}>
                                    {headItemValue.dataBaseName ===
                                    "appointmentId"
                                      ? option.doctor.name +
                                        " - " +
                                        option.animal.name
                                      : option.name}
                                  </MenuItem>
                                );
                              }
                            )}
                          </Select>
                        </FormControl>
                      ) : null}
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
