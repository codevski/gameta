import { DialogButton, Focusable, Navigation, staticClasses } from "@decky/ui";
import { FC } from "react";
import { BsGearFill } from "react-icons/bs";

export const TitleView: FC = () => {
  const onSettingsClick = (): void => {
    Navigation.CloseSideMenus();
    Navigation.Navigate("/gameta");
  };

  return (
    <Focusable
      style={{
        display: "flex",
        padding: "0",
        width: "100%",
        boxShadow: "none",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className={staticClasses.Title}
    >
      <div>Gameta</div>
      <DialogButton
        style={{
          height: "28px",
          width: "40px",
          minWidth: 0,
          padding: "10px 12px",
        }}
        onClick={onSettingsClick}
      >
        <BsGearFill style={{ marginTop: "-4px", display: "block" }} />
      </DialogButton>
    </Focusable>
  );
};
