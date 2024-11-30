import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  EditCafeRequest,
  EditCafeRequestWithFiles,
  isEditCafeRequest,
} from "../Models/EditCafeRequest";
import {
  AddCafeRequest,
  AddCafeRequestWithFiles,
  defaultAddCafeRequest,
} from "../Models/AddCafeRequest";
import { addCafe, editCafe, getCafeById } from "../Services/CafeApiService";
import LogoBase64View from "../../Common/Components/LogoBase64View";

interface CafeFormProps {
  id?: string;
}

const CafeForm: React.FC<CafeFormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<EditCafeRequestWithFiles | AddCafeRequestWithFiles>({
    defaultValues: defaultAddCafeRequest,
  });
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      getCafeById(id).then((data) => {
        const editCafeRequest: EditCafeRequest = {
          name: data.name,
          description: data.description,
          logoBase64: data.logo,
          location: data.location,
          id: data.id,
        };
        reset(editCafeRequest);
      });
    } else {
      setIsEditMode(false);
      reset(defaultAddCafeRequest);
    }
  }, [id, reset]);

  const logoFiles = useWatch({
    control,
    name: "logoFiles",
  });

  const logoBase64 = useWatch({
    control,
    name: "logoBase64",
  });

  useEffect(() => {
    if (logoFiles && logoFiles.length > 0) {
      const file = logoFiles[0];
      if (file.size > 2 * 1024 * 1024) {
        setSnackbarMessage("File size cannot exceed 2 MB.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("logoBase64", base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [logoFiles, setValue]);

  const onSubmit = (data: EditCafeRequest | AddCafeRequest) => {
    if (isEditMode && isEditCafeRequest(data)) {
      editCafe(data)
        .then(() => {
          setSnackbarMessage("Cafe updated successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to update cafe.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    } else {
      addCafe(data)
        .then(() => {
          setSnackbarMessage("Cafe added successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage("Failed to add cafe.");
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
            {isEditMode ? "Edit Cafe" : "Add Cafe"}
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
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              maxLength: {
                value: 256,
                message: "Description cannot exceed 256 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="location"
            control={control}
            rules={{
              required: "Location is required",
              maxLength: {
                value: 512,
                message: "Description cannot exceed 512 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                error={!!errors.location}
                helperText={errors.location?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="logoFiles"
            control={control}
            rules={{
              validate: {
                fileSize: (value) => {
                  if (!value) return true;
                  const file = value[0];
                  return (
                    file.size <= 2 * 1024 * 1024 ||
                    "File size cannot exceed 2 MB"
                  );
                },
                fileType: (value) => {
                  if (!value) return true;
                  const file = value[0];
                  return (
                    file.type.startsWith("image/") ||
                    "Only image files are allowed"
                  );
                },
              },
            }}
            render={({ field }) => (
              <>
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  error={!!errors.logoBase64}
                  helperText={errors.logoBase64?.message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.files);
                  }}
                  fullWidth
                />
                <LogoBase64View base64String={logoBase64 || ""} />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? "Update Cafe" : "Add Cafe"}
          </Button>
          <Button
            onClick={() => navigate("/cafes")}
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

export default CafeForm;
