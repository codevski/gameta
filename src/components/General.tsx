import {
  PanelSection,
  PanelSectionRow,
  TextField,
  ToggleField,
} from "@decky/ui";
import { FC } from "react";

export const GeneralSettings: FC<{
  steamGridApiKey: string;
  setSteamGridApiKey: (value: string) => void;
  autoUpdate: boolean;
  setAutoUpdate: (value: boolean) => void;
  artworkQuality: string;
  setArtworkQuality: (value: string) => void;
}> = ({
  steamGridApiKey,
  setSteamGridApiKey,
  autoUpdate,
  setAutoUpdate,
  artworkQuality,
  setArtworkQuality,
}) => (
  <div style={{ padding: "0 16px" }}>
    <PanelSection title="SteamGridDB Integration">
      <PanelSectionRow>
        <TextField
          label="API Key"
          value={steamGridApiKey}
          onChange={(e) => setSteamGridApiKey(e.target.value)}
        />
      </PanelSectionRow>
      <PanelSectionRow>
        <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "8px" }}>
          Get your free API key at{" "}
          <a
            href="https://www.steamgriddb.com/profile/preferences/api"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1e88e5" }}
          >
            steamgriddb.com
          </a>
        </div>
      </PanelSectionRow>
    </PanelSection>

    <PanelSection title="Library Management">
      <PanelSectionRow>
        <ToggleField
          label="Auto-update collections when new games are added"
          checked={autoUpdate}
          onChange={setAutoUpdate}
        />
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>
            Artwork Quality
          </label>
          <select
            value={artworkQuality}
            onChange={(e) => setArtworkQuality(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <option value="high">High (600x900)</option>
            <option value="medium">Medium (460x215)</option>
            <option value="low">Low (300x450)</option>
          </select>
        </div>
      </PanelSectionRow>
    </PanelSection>
  </div>
);
