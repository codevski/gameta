import os
from typing import Dict

# The decky plugin module is located at decky-loader/plugin
from this import d
# For easy intellisense checkout the decky-loader code repo
# and add the `decky-loader/plugin/imports` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky
import asyncio

class Plugin:
    # A normal method. It can be called from the TypeScript side using @decky/api.
    async def add(self, left: int, right: int) -> int:
        return left + right

    async def scan_library(self) -> Dict:
        """
        Scan the user's complete Steam library and return total owned games count

        Returns:
            Dict containing:
            - total_games: int
            - success: bool
            - error: str
            - method_used: str
        """
        try:
            decky.logger.info("Starting complete Steam library scan...")
            result = await self._get_owned_games()

            if result["success"]:
                decky.logger.info(f"Library scan complete. Total games: {result['total_games']}")
                return result
            else:
                decky.logger.error(f"Library scan failed: {result['error']}")
                return result

        except Exception as e:
            decky.logger.error(f"Library scan failed: {str(e)}")

            return {
                    "success": False,
                    "error": str(e),
                    "total_games": 0,
                    "method_used": "none"
            }

    async def _get_owned_games(self):
        """
        Try to parse packageinfo.vdf - contains ALL owned packages/games
        This is the most complete local method
        """
        # packageinfo.vdf contains all owned packages
        try:
            steam_path = self._find_steam_path()

            if not steam_path:
                return {"success": False, "error": "Steam not found"}

             # Use the found steam path
            package_file = os.path.join(steam_path, "steam","appcache", "packageinfo.vdf")

            if not os.path.exists(package_file):
                decky.logger.info(f"packageinfo.vdf not found at: {package_file}")
                return {"success": False, "error": "packageinfo.vdf not found"}

            decky.logger.info(f"Parsing packageinfo.vdf at: {package_file}")

        except Exception as e:
            decky.logger.error(f"Failed to find packageinfo.vdf: {str(e)}")
        return {
            "success": False,
            "error": "No Steam user directories found",
            "total_games": 10,
            "method_used": "local_data"
        }

    def _find_steam_path(self):
        """Find Steam installation directory"""
        possible_paths = [
            "/home/deck/.steam",
            "/home/deck/.local/share/Steam",
            os.path.expanduser("~/.steam"),
            os.path.expanduser("~/.local/share/Steam")
        ]

        for path in possible_paths:
            if os.path.exists(path):
                decky.logger.info(f"Found Steam at: {path}")
                return path

        decky.logger.warning("Steam installation not found")
        return None

    async def long_running(self):
        await asyncio.sleep(15)
        # Passing through a bunch of random data, just as an example
        await decky.emit("timer_event", "Hello from the backend!", True, 2)

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        self.loop = asyncio.get_event_loop()
        decky.logger.info("Hello World!")

    # Function called first during the unload process, utilize this to handle your plugin being stopped, but not
    # completely removed
    async def _unload(self):
        decky.logger.info("Goodnight World!")
        pass

    # Function called after `_unload` during uninstall, utilize this to clean up processes and other remnants of your
    # plugin that may remain on the system
    async def _uninstall(self):
        decky.logger.info("Goodbye World!")
        pass

    async def start_timer(self):
        self.loop.create_task(self.long_running())

    # Migrations that should be performed before entering `_main()`.
    async def _migration(self):
        decky.logger.info("Migrating")
        # Here's a migration example for logs:
        # - `~/.config/decky-template/template.log` will be migrated to `decky.decky_LOG_DIR/template.log`
        decky.migrate_logs(os.path.join(decky.DECKY_USER_HOME,
                                               ".config", "decky-template", "template.log"))
        # Here's a migration example for settings:
        # - `~/homebrew/settings/template.json` is migrated to `decky.decky_SETTINGS_DIR/template.json`
        # - `~/.config/decky-template/` all files and directories under this root are migrated to `decky.decky_SETTINGS_DIR/`
        decky.migrate_settings(
            os.path.join(decky.DECKY_HOME, "settings", "template.json"),
            os.path.join(decky.DECKY_USER_HOME, ".config", "decky-template"))
        # Here's a migration example for runtime data:
        # - `~/homebrew/template/` all files and directories under this root are migrated to `decky.decky_RUNTIME_DIR/`
        # - `~/.local/share/decky-template/` all files and directories under this root are migrated to `decky.decky_RUNTIME_DIR/`
        decky.migrate_runtime(
            os.path.join(decky.DECKY_HOME, "template"),
            os.path.join(decky.DECKY_USER_HOME, ".local", "share", "decky-template"))
