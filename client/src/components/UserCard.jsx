import {
  ManageAccountsOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImg from "./UserImg";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import toast from "react-hot-toast";

const UserCard = ({ userId, profilePicture }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          // In the backend in middleware/auth.js we set the token to start with 'Bearer '
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to get user data ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(`Failed to get user data`, error);
      toast.error("Failed to get user data please try again");
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, lastName, friends, location } = user;

  return (
    <WidgetWrapper sx={{ border: 1, borderColor: 'primary.main' }} >
      {/* 1 line for image name and last name and friends*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="0.5rem">
          <UserImg src={profilePicture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* 2 line for location*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* 3  for social media*/}
      <Box p="1tem 0" mt="0.5rem">
        <Typography fontSize="1rem" color={main} fontWeight="500">
          Social Media
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FaLinkedin />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <FaTwitterSquare />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserCard;
