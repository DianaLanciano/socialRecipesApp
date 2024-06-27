import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as ypu from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

/* VALIDATION AND PATTERN FOR FORM FIELDS */
const registerSchema = ypu.object().shape({
  firstName: ypu
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: ypu
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  email: ypu.string().email("Invalid email").required("Email is required"),
  password: ypu
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  location: ypu
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Location is required"),
  picture: ypu.string().required("Profile picture is required"),
});

const loginSchema = ypu.object().shape({
  email: ypu.string().email("Invalid email").required("Email is required"),
  password: ypu
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values) => {};

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
        {/* In order to use this options in the form we destruct theme like so: */}
        {({
            values, // will be equal to the initial values on the first time. After that it will be equal to the values that we typed in the form
            errors, // will involve all the errors that we have in the form
            touched, // if we touched the field it will be true only when the user will click on the field and then click out of the field
            handleChange,   
            handleBlur, // will trigger when we click out of the field
            handleSubmit,
            isSubmitting, // we will use this to disable the button when the form is submitting
            setFieldValue, // we will use this to set the value of the picture field cause we need to set it manually
            resetForm, // we will use the resetForm to reset the form values after we submit it
        }) => (
            <form onSubmit={handleSubmit}>
                <Box
                 display="grid"
                 gap="30px"
                 gridTemplateColumns="repeat(4, minmax(0, 1fr))" // 4 columns if it will be very small it will be 0 and if it will be very big it will be 1fr
                 sx={{
                    "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4"}
                 }}
                >
                    {true && (
                        <>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName} 
                            sx={{ gridColumn: "span 2" }}
                        />
                         <TextField
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName} 
                            sx={{ gridColumn: "span 2" }}
                        />
                         <TextField
                            label="Location"
                            name="location"
                            value={values.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location} 
                            sx={{ gridColumn: "span 4" }}
                        />
                        <Box
                        gridColumn='span 4'
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem" // padding
                        >
                            <Dropzone
                              acceptedFiles=".jpg,.png.jpeg"
                              multiple={false}
                              onDrop={(acceptedFiles) => {
                                  setFieldValue("picture", acceptedFiles[0]);
                              }}                           
                              >
                                {/*  the callback function for drop picture*/ }
                                {({ getRootProps, getInputProps }) => ( 
                                    <Box
                                     {...getRootProps()} // we have to pass those props the dropzone is creating for us
                                      border={`2px dashed ${palette.primary.main}`}
                                      sx={{ "&:hover": { cursor: 'pointer' } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? 
                                        (<p>Add Picture Here</p>) : 
                                        (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <EditOutlined />
                                            </FlexBetween>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                         <TextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email} 
                            sx={{ gridColumn: "span 4" }}
                        />
                            
                        </>
                    )}
                </Box>
            </form>
        )}
    </Formik>
  );
};


export default Form;