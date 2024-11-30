import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
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
import {
  EditEmployeeRequest,
  isAddEmployeeRequest,
  isEditEmployeeRequest,
} from "../Models/EditEmployeeRequest";
import { getCafeListResponse } from "../../Cafe/Services/CafeApiService";
import { GetCafeResponse } from "../../Cafe/Models/GetCafeResponse";
import UseBaseForm from "../../Common/Hooks/UseBaseform";
import SnackBar from "../../Common/Components/SnackBar";
import { GetEmployeeResponse } from "../Models/GetEmployeeResponse";

interface EmployeeFormProps {
  id?: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ id }) => {
  const [cafes, setCafes] = useState<GetCafeResponse[]>([]);
  const {
    handleSubmit,
    onSubmit,
    control,
    errors,
    isEditMode,
    navigate,
    snackBarProps,
  } = UseBaseForm<AddEmployeeRequest, EditEmployeeRequest, GetEmployeeResponse>(
    {
      id,
      defaultValues: defaultAddEmployeeRequest,
      getDataById: getEmployeeById,
      mapper: (data) => ({
        assignedCafe: data.cafeId,
        email: data.emailAddress,
        gender: data.gender,
        name: data.name,
        phoneNumber: data.phoneNumber,
        id: data.id,
      }),
      editTypeGuard: isEditEmployeeRequest,
      addTypeGuard: isAddEmployeeRequest,
      edit: editEmployee,
      add: addEmployee,
      entityName: "employee",
    }
  );

  useEffect(() => {
    getCafeListResponse().then((data) => {
      setCafes(data);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
                    <Typography color="error">
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </div>
          <div>
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
          </div>
          <div className="flex justify-center space-x-4 items-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="h-10"
            >
              {isEditMode ? "Update Employee" : "Add Employee"}
            </Button>
            <Button
              onClick={() => navigate("/employee")}
              variant="outlined"
              color="secondary"
              className="h-10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      <SnackBar {...snackBarProps} />
    </>
  );
};

export default EmployeeForm;
