import {
  PanelSection,
  PanelSectionRow,
  ButtonItem,
  Focusable,
} from "@decky/ui";
import { FC } from "react";
import { toaster } from "@decky/api";

export const Donate: FC = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toaster.toast({
          title: "Copied!",
          body: `${label} address copied to clipboard`,
        });
      })
      .catch(() => {
        toaster.toast({
          title: "Copy Failed",
          body: "Please copy the address manually",
        });
      });
  };

  const openLink = (url: string, name: string) => {
    window.open(url, "_blank");
    toaster.toast({
      title: "Link Opened",
      body: `Opening ${name} in browser`,
    });
  };

  return (
    <div style={{ padding: "0 16px" }}>
      {/* Support Message */}
      <PanelSection title="Support Gameta Development">
        <PanelSectionRow>
          <Focusable style={{ padding: "12px 0" }}>
            <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
              <p style={{ margin: "0 0 12px 0" }}>
                Gameta is completely <strong>free and open source</strong>! If
                you find it useful and want to support continued development,
                here are some ways to help:
              </p>
            </div>
          </Focusable>
        </PanelSectionRow>
      </PanelSection>

      {/* Free Ways to Support */}
      <PanelSection title="🆓 Free Ways to Support">
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() =>
              openLink(
                "https://github.com/codevski/gameta",
                "GitHub Repository",
              )
            }
          >
            ⭐ Star on GitHub
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() =>
              openLink(
                "https://github.com/codevski/gameta/issues",
                "Issues Page",
              )
            }
          >
            🐛 Report Bugs & Suggest Features
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <Focusable style={{ padding: "12px 0" }}>
            <div style={{ fontSize: "13px", lineHeight: "1.4" }}>
              <strong>📢 Share with Friends</strong>
              <br />
              <span style={{ opacity: 0.8 }}>
                Tell other Steam Deck users about Gameta
              </span>
            </div>
          </Focusable>
        </PanelSectionRow>

        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() =>
              openLink(
                "https://github.com/codevski/gameta/pulls",
                "Pull Requests",
              )
            }
          >
            💻 Contribute Code
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>

      {/* Monetary Support */}
      <PanelSection title="💝 Buy Me a Coffee">
        <PanelSectionRow>
          <Focusable style={{ padding: "8px 0" }}>
            <div style={{ fontSize: "13px", opacity: 0.9, lineHeight: "1.4" }}>
              If Gameta saved you time organizing your library and you'd like to
              fuel future development with caffeine:
            </div>
          </Focusable>
        </PanelSectionRow>

        {/* PayPal */}
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() =>
              openLink("https://buymeacoffee.com/codevski", "PayPal")
            }
            style={{
              backgroundColor: "rgba(0, 123, 191, 0.2)",
              border: "1px solid rgba(0, 123, 191, 0.4)",
            }}
          >
            ☕️ Donate via buymecoffee
          </ButtonItem>
        </PanelSectionRow>

        {/* Ko-fi */}
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() => openLink("https://ko-fi.com/codevski", "Ko-fi")}
            style={{
              backgroundColor: "rgba(255, 93, 77, 0.2)",
              border: "1px solid rgba(255, 93, 77, 0.4)",
            }}
          >
            ☕ Buy me a Ko-fi
          </ButtonItem>
        </PanelSectionRow>

        {/* Bitcoin */}
        <PanelSectionRow>
          <ButtonItem
            layout="below"
            onClick={() => copyToClipboard("codevski@getalby.com", "Lighting")}
            style={{
              flex: 1,
              backgroundColor: "rgba(247, 147, 26, 0.2)",
              border: "1px solid rgba(247, 147, 26, 0.4)",
            }}
          >
            ⚡️ Address codevski@getalby.com
          </ButtonItem>
        </PanelSectionRow>

        <PanelSectionRow>
          <Focusable style={{ padding: "4px 0" }}>
            <div
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                wordBreak: "break-all",
                opacity: 0.6,
                textAlign: "center",
              }}
            >
              codevski@getalby.com
            </div>
          </Focusable>
        </PanelSectionRow>
      </PanelSection>

      {/* Thank You */}
      <PanelSection title="🙏 Thank You!">
        <PanelSectionRow>
          <Focusable style={{ padding: "12px 0" }}>
            <div
              style={{
                fontSize: "13px",
                lineHeight: "1.5",
                textAlign: "center",
                padding: "16px",
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(76, 175, 80, 0.3)",
              }}
            >
              Whether you donate, contribute code, report bugs, or simply use
              Gameta -
              <strong> thank you for being part of the community!</strong>
              <br />
              <br />
              Every bit of support helps keep this project alive and growing.
              Your organized Steam library is the best reward! 🎮✨
            </div>
          </Focusable>
        </PanelSectionRow>
      </PanelSection>

      {/* Transparency */}
      <PanelSection title="💡 Where Donations Go">
        <PanelSectionRow>
          <Focusable style={{ padding: "8px 0" }}>
            <div style={{ fontSize: "12px", opacity: 0.8, lineHeight: "1.4" }}>
              <div style={{ marginBottom: "8px" }}>
                • ☕ Coffee & energy drinks for late-night coding sessions
              </div>
              <div style={{ marginBottom: "8px" }}>
                • 🧪 Testing hardware (Steam Decks, accessories)
              </div>
              <div style={{ marginBottom: "8px" }}>
                • 🌐 Server costs for development tools & APIs
              </div>
              <div style={{ marginBottom: "8px" }}>
                • 📚 Learning resources & documentation
              </div>
              <div>• 🎯 Motivation to keep building awesome tools!</div>
            </div>
          </Focusable>
        </PanelSectionRow>
      </PanelSection>
    </div>
  );
};
