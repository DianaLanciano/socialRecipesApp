import { Box } from "@mui/material";

const UserImg = ({ image, size="60px" }) => { 
    // the size="60px" will be the default size of the image if we don't pass a size prop

    return (
      <Box width={size} height={size}>
        <img
          src={`http://localhost:3001/images/${image}`}
          crossOrigin="anonymous"
          alt="user"
          width={size}
          height={size}
          style={{
            objectFit: "cover", //  covering the containing element
            borderRadius: "50%", // circle
          }}
        />
      </Box>
    );
};

export default UserImg;