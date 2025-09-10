import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  ToggleField,
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  callable,
  definePlugin,
  toaster,
  routerHook,
} from "@decky/api";
import { TitleView } from "./components/titleview";
import { useState } from "react";
import { FaShip } from "react-icons/fa";
import { Settings } from "./pages/Settings";

// Python function calls
// const add = callable<[first: number, second: number], number>("add");
const games = callable("scan_library");

function Content() {
  const [result, setResult] = useState<number | undefined>();
  const [isScanning, setIsScanning] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(false);

  const scanLibrary = async () => {
    setIsScanning(true);
    // Simulate scanning process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toaster.toast({
      title: "Function Called",
      body: `raw data: ${JSON.stringify(await games())}`,
    });
    setResult(Math.floor(Math.random() * 100) + 50); // Mock scanned games count
    setIsScanning(false);

    toaster.toast({
      title: "Library Scan Complete",
      body: `Found ${result || 0} games in your Steam library`,
    });
  };

  return (
    <>
      <PanelSection title="Library Management">
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={scanLibrary}
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan Steam Library"}
          </ButtonItem>
        </PanelSectionRow>

        {result && (
          <PanelSectionRow>
            <div style={{ fontSize: "14px", opacity: 0.7 }}>
              Found {result} games
            </div>
          </PanelSectionRow>
        )}
      </PanelSection>

      {/* Collections Section - Coming Soon */}
      <PanelSection title="Collections">
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() => {
              toaster.toast({
                title: "Coming Soon!",
                body: "Collection creation will be available in v1.1.0",
              });
            }}
            disabled={!result} // Only enable after scanning
          >
            Create Genre Collections
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <ToggleField
            label="Auto-update collections"
            checked={autoUpdate}
            onChange={setAutoUpdate}
            disabled={!result} // Only enable after scanning
          />
        </PanelSectionRow>
      </PanelSection>

      {/* Quick Status */}
      <PanelSection title="Status">
        <PanelSectionRow>
          <div
            style={{
              padding: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          >
            <div>
              <strong>Version:</strong> 1.0.0
            </div>
            <div>
              <strong>Games Scanned:</strong> {result || "None"}
            </div>
            <div>
              <strong>Collections:</strong> Coming Soon
            </div>
          </div>
        </PanelSectionRow>
      </PanelSection>
    </>
  );
}

export default definePlugin(() => {
  console.log("Gameta plugin initializing...");

  routerHook.addRoute("/gameta", Settings, {
    exact: false,
  });

  // Add event listener for timer events
  const listener = addEventListener<
    [test1: string, test2: boolean, test3: number]
  >("timer_event", (test1, test2, test3) => {
    console.log("Gameta got timer_event with:", test1, test2, test3);
    toaster.toast({
      title: "Gameta Event",
      body: `${test1}, ${test2}, ${test3}`,
    });
  });

  return {
    name: "Gameta",
    titleView: <TitleView />,
    content: <Content />,
    icon: <FaShip />,
    onDismount() {
      console.log("Gameta unloading...");
      removeEventListener("timer_event", listener);
      routerHook.removeRoute("/gameta");
    },
  };
});
