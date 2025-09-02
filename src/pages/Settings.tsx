import { PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { useState } from "react";

export const Settings = () => {
  const [debugMode, setDebugMode] = useState(false);
  return (
    <PanelSection>
      <PanelSectionRow></PanelSectionRow>
    </PanelSection>
  );
};
