import { Box } from "@mui/material";

const UserImg = ({ image, size="60px" }) => { 
    // the size="60px" will be the default size of the image if we don't pass a size prop

    const src = 'https://thispersondoesnotexist.com/';

    return (
      <Box width={size} height={size}>
        <img
          src={src}
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