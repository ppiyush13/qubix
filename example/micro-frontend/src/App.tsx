import React from "react";
import { Box, FlexBox } from "react-styled-flex";
import { version as reactScriptsVersion } from "react-scripts/package.json";

export default function App() {
  return (
    <Box border={"1px dashed blue"} padding={"1rem"}>
      <FlexBox justifyContent={"space-between"} alignItems={"center"}>
        <h1>Micro-frontend App</h1>
        <span>react-scripts: {reactScriptsVersion}</span>
      </FlexBox>
      <FlexBox gap={"1rem"} column>
        <Box border={"1px dashed blue"} padding={"0.5rem"}>
          Child 1
        </Box>
        <Box border={"1px dashed blue"} padding={"0.5rem"}>
          Child 2
        </Box>
        <Box border={"1px dashed blue"} padding={"0.5rem"}>
          Child 3
        </Box>
      </FlexBox>
    </Box>
  );
}
