from typing import Dict
import decky
import os

class SteamManager:
    def __init__(self):
        pass

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

        pass

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
            # Parse packageinfo.vdf using VDF parsing library
            total_games = await self._parse_packageinfo(package_file)

            decky.logger.info(f"Found {total_games} potential games in packageinfo.vdf")

            if total_games > 0:
                return {
                    "success": True,
                    "total_games": total_games,
                    "error": None,
                    "method_used": "packageinfo_binary_parse"
                }
            else:
                return {"success": False, "error": "No games found in packageinfo"}

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

    async def _parse_packageinfo(self, package_file):
        with open(package_file, 'rb') as f:
            content = f.read()

        import re

        text_content = content.decode('utf-8', errors='ignore')

        app_ids = set()

        app_id_pattern = r'\b(\d{4,8})\b'
        potential_ids = re.findall(app_id_pattern, text_content)

        for app_id_str in potential_ids:
            app_id = int(app_id_str)
            if 10000 <= app_id <= 99999999:
                app_ids.add(app_id)

        return len(app_ids)

    async def get_game_details(self, app_ids):
        # Get game names, genres, etc prob via Steam API
        pass
