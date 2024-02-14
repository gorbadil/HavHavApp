import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import "./AddNewForm.css";

export default function AddNewForm({ head, apiList }) {
  AddNewForm.propTypes = {
    headName: PropTypes.array,
    head: PropTypes.array,
    apiList: PropTypes.array,
  };
  const queryClient = useQueryClient();
  const [addForm, setAddForm] = useState({});
  const [alert, setAlert] = useState(false);

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

  const handleAdd = async () => {
    try {
      await apiData.add(addForm);
      queryClient.invalidateQueries(apiData.get);
      setAddForm({});
    } catch (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      console.log(error);
    }
  };

  if (!Array.isArray(apiData.get)) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <div>
      <div className="forms-area">
        {head.map((headItem, index) => {
          const key = Object.keys(headItem)[0];
          const headItemValue = Object.values(headItem)[0];
          return (
            <>
              {headItemValue.field === "select" ? (
                <FormControl key={`keya${index}`} variant="outlined" fullWidth>
                  <InputLabel id={key}>{headItemValue.siteName}</InputLabel>
                  <Select
                    labelId={key}
                    id={key}
                    value={addForm[key] ? addForm[key].id : ""}
                    label={headItemValue.siteName}
                    onChange={(e) => {
                      setAddForm((prev) => {
                        const updatedItem = apiData[headItemValue.options].find(
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
                    {apiData[headItemValue.options].map((item, index) => {
                      return (
                        <MenuItem
                          key={`asd${item.id} ${index}`}
                          value={item.id}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  key={`key${index}`}
                  id={key}
                  label={
                    headItemValue.field !== "date"
                      ? headItemValue.siteName
                      : null
                  }
                  value={addForm[key] || ""}
                  type={
                    headItemValue.field === "date" ? "datetime-local" : null
                  }
                  variant="outlined"
                  onChange={(e) => {
                    setAddForm({ ...addForm, [key]: e.target.value });
                  }}
                  fullWidth
                />
              )}
            </>
          );
        })}
        {alert && (
          <Alert severity="error">
            Doktora Bir Bak Çalışıyor Mu? Yok! Anca Tıkla
          </Alert>
        )}
        <Button
          variant="contained"
          className="add-btn"
          endIcon={<SendIcon />}
          onClick={handleAdd}
        >
          Ekle
        </Button>
      </div>
    </div>
  );
}
