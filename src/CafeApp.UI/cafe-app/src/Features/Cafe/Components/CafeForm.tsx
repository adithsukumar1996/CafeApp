import React, { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import {
  EditCafeRequestWithFiles,
  isAddCafeRequest,
  isEditCafeRequest,
} from "../Models/EditCafeRequest";
import {
  AddCafeRequestWithFiles,
  defaultAddCafeRequest,
} from "../Models/AddCafeRequest";
import { addCafe, editCafe, getCafeById } from "../Services/CafeApiService";
import LogoBase64View from "../../Common/Components/LogoBase64View";
import UseBaseForm from "../../Common/Hooks/UseBaseform";
import SnackBar from "../../Common/Components/SnackBar";
import { GetCafeResponse } from "../Models/GetCafeResponse";

interface CafeFormProps {
  id?: string;
}

const CafeForm: React.FC<CafeFormProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    errors,
    isEditMode,
    navigate,
    onSubmit,
    setValue,
    snackBarProps,
    setSnackBarProps,
  } = UseBaseForm<
    AddCafeRequestWithFiles,
    EditCafeRequestWithFiles,
    GetCafeResponse
  >({
    add: addCafe,
    edit: editCafe,
    addTypeGuard: isAddCafeRequest,
    defaultValues: defaultAddCafeRequest,
    editTypeGuard: isEditCafeRequest,
    entityName: "cafe",
    getDataById: getCafeById,
    id: id,
    mapper: (data) => ({
      name: data.name,
      description: data.description,
      logoBase64: data.logo,
      location: data.location,
      id: data.id,
    }),
  });

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
        setSnackBarProps({
          ...snackBarProps,
          snackbarOpen: true,
          snackbarMessage: "File size cannot exceed 2 MB",
          snackbarSeverity: "error",
        });
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

  //   useNavigateAwayPrompt({
  //     onBlock: (navigation) =>
  //       window.confirm(
  //         "Are you sure you want to leave this page? Your changes will be lost."
  //       )
  //         ? navigation.confirm()
  //         : navigation.cancel(),
  //     enabled: isDirty,
  //   });

  return (
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
        </div>
        <div>
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
                multiline={true}
              />
            )}
          />
        </div>
        <div>
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
              <div className="flex">
                <TextField
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  error={!!errors.logoBase64}
                  helperText={errors.logoBase64?.message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.files);
                  }}
                  className="w-4/5"
                ></TextField>
                <div className="w-1/5 mx-5">
                  <LogoBase64View
                    height="40px"
                    width="40px"
                    base64String={logoBase64 || ""}
                  />
                </div>
              </div>
            )}
          />
        </div>
        <div></div>
        <div className="flex justify-center space-x-4 items-center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="h-10"
          >
            {isEditMode ? "Update Cafe" : "Add Cafe"}
          </Button>
          <Button
            onClick={() => navigate("/cafe")}
            variant="outlined"
            color="secondary"
            className="h-10"
          >
            Cancel
          </Button>
        </div>
      </div>
      <SnackBar {...snackBarProps} />
    </form>
  );
};

export default CafeForm;
