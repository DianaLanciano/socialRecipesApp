import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
        Top recipes
        </Typography>
        <Typography color={medium}>Best Hamburger</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/images/info2.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        crossOrigin="anonymous"
      />
      <FlexBetween>
        <Typography color={main}>Mika's Hamburger</Typography>
        <Typography color={medium}>Most popular</Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AdvertWidget;