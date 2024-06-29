import { TextField } from "@mui/material";

const FormField = ({ label, name, spanSize, handleBlur, handleChange, values, touched,errors }) => {
    return (
        <TextField
        label={label}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={name}
        error={
          Boolean(touched.name) && Boolean(errors.name)
        }
        helperText={touched.name && errors.name}
        sx={{ gridColumn: `span ${spanSize}` }}
      />
    );
};

export default FormField;
