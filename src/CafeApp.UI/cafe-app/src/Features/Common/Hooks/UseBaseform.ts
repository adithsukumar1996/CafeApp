import { useEffect, useState } from "react";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseCommandResponse } from "../Models/BaseCommandResponse";
import { SnackBarProps } from "../Components/SnackBar";

interface UseBaseFormProps<
  Tadd extends FieldValues,
  Tedit extends FieldValues,
  T2
> {
  id?: string;
  defaultValues: DefaultValues<Tadd>;
  getDataById: (id: string) => Promise<T2>;
  mapper: (data: T2) => Tedit;
  editTypeGuard: (data: Tadd | Tedit) => data is Tedit;
  addTypeGuard: (data: Tadd | Tedit) => data is Tadd;
  edit: (data: Tedit) => Promise<BaseCommandResponse>;
  add: (data: Tadd) => Promise<BaseCommandResponse>;
  entityName: string;
}

function UseBaseForm<Tadd extends FieldValues, Tedit extends FieldValues, T2>(
  props: UseBaseFormProps<Tadd, Tedit, T2>
) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Tadd | Tedit>({
    defaultValues: props.defaultValues,
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
    if (props.id) {
      setIsEditMode(true);
      props.getDataById(props.id).then((data) => {
        const formState: Tedit = props.mapper(data);
        reset(formState);
      });
    } else {
      setIsEditMode(false);
      reset(props.defaultValues);
    }
  }, [props.id, reset]);

  const onSubmit = (data: Tadd | Tedit) => {
    if (isEditMode && props.editTypeGuard(data)) {
      props
        .edit(data)
        .then(() => {
          setSnackbarMessage(`${props.entityName} updated successfully!`);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage(`Failed to update ${props.entityName}`);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
    } else {
      props.addTypeGuard(data) &&
        props
          .add(data)
          .then(() => {
            setSnackbarMessage(`${props.entityName} added successfully!`);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
          })
          .catch(() => {
            setSnackbarMessage(`Failed to add ${props.entityName}.`);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          });
    }
  };

  const snackBarProps: SnackBarProps = {
    snackbarOpen,
    snackbarSeverity,
    snackbarMessage,
    handleSnackbarClose,
  };
  const setSnackBarProps = (props: SnackBarProps) => {
    setSnackbarOpen(props.snackbarOpen);
    setSnackbarSeverity(props.snackbarSeverity);
    setSnackbarMessage(props.snackbarMessage);
  };
  return {
    control,
    handleSubmit,
    errors,
    navigate,
    isEditMode,
    onSubmit,
    setValue,
    snackBarProps,
    setSnackBarProps,
  };
}

export default UseBaseForm;
