import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddEmployeeRequest,
  defaultAddEmployeeRequest,
} from "../Models/AddEmployeeRequest";
import {
  addEmployee,
  editEmployee,
  getEmployeeById,
} from "../Services/EmployeeApiService";
import { EditEmployeeRequest } from "../Models/EditEmployeeRequest";
import { getCafeListResponse } from "../../Cafe/Services/CafeApiService";
import { GetCafeResponse } from "../../Cafe/Models/GetCafeResponse";

interface EmployeeFormProps {
  id?: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditEmployeeRequest | AddEmployeeRequest>({
    defaultValues: defaultAddEmployeeRequest,
  });
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [cafes, setCafes] = useState<Array<GetCafeResponse>>([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      getEmployeeById(id).then((data) => {
        const editEmployeeRequest: EditEmployeeRequest = {
          id: data.id,
          name: data.name,
          email: data.emailAddress,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          assignedCafe: data.cafe,
        };
        reset(editEmployeeRequest);
      });
    } else {
      setIsEditMode(false);
      reset(defaultAddEmployeeRequest);
    }
    getCafeListResponse().then((data) => {
      setCafes(data);
    });
  }, [id, reset]);

  const onSubmit = (data: EditEmployeeRequest | AddEmployeeRequest) => {
    if (isEditMode) {
      editEmployee(data as EditEmployeeRequest)
        .then(() => {
          setSnackbarMessage("Employee updated successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to update employee.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    } else {
      addEmployee(data as AddEmployeeRequest)
        .then(() => {
          setSnackbarMessage("Employee added successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to add employee.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {isEditMode ? "Edit Employee" : "Add Employee"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 6,
                message: "Name must be at least 6 characters",
              },
              maxLength: {
                value: 10,
                message: "Name cannot exceed 10 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[89]\d{7}$/,
                message:
                  "Invalid phone number (should start with 8 or 9 and contain 8 digits)",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <FormControl component="fieldset" error={!!errors.gender}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="O"
                    control={<Radio />}
                    label="Others"
                  />
                </RadioGroup>
                {errors.gender && (
                  <Typography color="error">{errors.gender.message}</Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="assignedCafe"
            control={control}
            rules={{ required: "Assigned Cafe is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.assignedCafe}>
                <FormLabel>Assigned Cafe</FormLabel>
                <Select {...field} label="Assigned Cafe">
                  {cafes.map((cafe) => (
                    <MenuItem key={cafe.id} value={cafe.id}>
                      {cafe.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.assignedCafe && (
                  <Typography color="error">
                    {errors.assignedCafe.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? "Update Employee" : "Add Employee"}
          </Button>
          <Button
            onClick={() => navigate("/employees")}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EmployeeForm;
