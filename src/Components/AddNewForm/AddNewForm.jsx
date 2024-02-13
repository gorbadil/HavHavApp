import { TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
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

export default function AddNewForm({ headName, head, apiList }) {
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

  return (
    <div>
      <div className="forms-area">
        {head.map((headItem, index) => {
          const key = Object.keys(headItem)[0];
          const value = Object.values(headItem)[0];
          return (
            <TextField
              key={`key${index}`}
              id={key}
              label={value.siteName}
              value={addForm[key] || ""}
              variant="outlined"
              onChange={(e) => {
                setAddForm({ ...addForm, [key]: e.target.value });
              }}
              fullWidth
            />
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
