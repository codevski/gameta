import { SidebarNavigation } from "@decky/ui";
import { FC, useState } from "react";
import { BsArrowRepeat, BsController, BsHeart } from "react-icons/bs";
import { GeneralSettings } from "../components/General";
import { Changelog } from "../components/Changelog";
import { Donate } from "../components/Donate";

const GametaRouter: FC = () => {
  const [steamGridApiKey, setSteamGridApiKey] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [artworkQuality, setArtworkQuality] = useState("high");

  return (
    <SidebarNavigation
      title="Gameta Settings"
      pages={[
        {
          title: "General",
          icon: <BsController />,
          content: (
            <GeneralSettings
              steamGridApiKey={steamGridApiKey}
              setSteamGridApiKey={setSteamGridApiKey}
              autoUpdate={autoUpdate}
              setAutoUpdate={setAutoUpdate}
              artworkQuality={artworkQuality}
              setArtworkQuality={setArtworkQuality}
            />
          ),
          route: "/gameta/settings-general",
        },
        {
          title: "Changelog",
          icon: <BsArrowRepeat />,
          content: <Changelog />,
          route: "/gameta/settings-changelog",
        },
        {
          title: "Donate",
          icon: <BsHeart />,
          content: <Donate />,
          route: "/gameta/support-donate",
        },
      ]}
    />
  );
};

export const Settings: FC = () => <GametaRouter />;
