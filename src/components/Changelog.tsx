import { PanelSection, PanelSectionRow } from "@decky/ui";
import { FC } from "react";

interface VersionType {
  version: string;
  date: string;
  changes: string[];
  type: "release" | "upcoming";
}

export const Changelog: FC = () => {
  const versions: [VersionType] = [
    {
      version: "0.0.1",
      date: "August 2025",
      changes: [
        "Initial release of Gameta",
        "Steam library scanning functionality",
        "Basic plugin structure and UI",
        "Settings page with tabbed interface",
        "Preparation for SteamGridDB integration",
        "Genre collection framework",
      ],
      type: "release" as const,
    },
    // Future versions can be added here
    // {
    //   version: "1.1.0",
    //   date: "Coming Soon",
    //   changes: [
    //     "SteamGridDB artwork integration",
    //     "Automatic genre collection creation",
    //     "Custom artwork downloading"
    //   ],
    //   type: "upcoming" as const
    // }
  ];

  return (
    <div style={{ padding: "0 16px" }}>
      {versions.map((version) => (
        <PanelSection
          key={version.version}
          title={`v${version.version} - ${version.date}`}
        >
          <PanelSectionRow>
            <div
              style={{
                padding: "12px 0",
                borderLeft:
                  version.type === "upcoming"
                    ? "3px solid #ff9800"
                    : "3px solid #4caf50",
                paddingLeft: "12px",
              }}
            >
              {version.type === "upcoming" && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#ff9800",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  UPCOMING
                </div>
              )}

              <ul
                style={{
                  margin: "0",
                  paddingLeft: "20px",
                  listStyleType: "disc",
                }}
              >
                {version.changes.map((change, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "6px",
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </PanelSectionRow>
        </PanelSection>
      ))}

      {/* Plugin Info */}
      <PanelSection title="About">
        <PanelSectionRow>
          <div style={{ fontSize: "12px", opacity: 0.7, lineHeight: "1.5" }}>
            <strong>Gameta</strong> - Transform your Steam library into
            organized perfection
            <br />
            <br />
            Built for Steam Deck users who love organization. Automatically
            categorizes games by genre and fetches beautiful artwork from
            SteamGridDB.
            <br />
            <br />
            <a
              href="https://github.com/codevski/gameta"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1e88e5" }}
            >
              View on GitHub
            </a>
          </div>
        </PanelSectionRow>
      </PanelSection>
    </div>
  );
};
