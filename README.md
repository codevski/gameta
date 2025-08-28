# 📚 Gameta

> Organise your games, your way

**Gameta** automatically organizes your Steam games into smart collections and fetches beautiful artwork from SteamGridDB. Built as a Decky plugin for Steam Deck, with plans for broader Steam client support.

## ✨ Features

- **Smart Collections** - Automatically categorize games by genre (Horror, Adventure, RPG, etc.)
- **Beautiful Artwork** - Fetch high-quality covers from SteamGridDB
- **Steam Deck Native** - Seamless integration with Decky Loader
- **Zero Maintenance** - Set it up once, let it handle the rest

## 🚀 Quick Start

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) on your Steam Deck
2. Download Libmeta from the plugin store
3. Get your free [SteamGridDB API key](https://www.steamgriddb.com/profile/preferences/api)
4. Configure and scan your library

## 🎮 How It Works

```
Your Huge Library → Gameta → Organized Collections + Beautiful Art
```

Gameta scans your Steam library, identifies game genres, creates themed collections, and downloads matching artwork. All automatically.

## ⚙️ Configuration

- **API Key**: Add your SteamGridDB key in settings
- **Quality**: Choose artwork resolution (High/Medium/Low)
- **Auto-Update**: Keep collections fresh as you add games
- **Custom Genres**: Override automatic categorization

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/codevski/gameta.git
cd gameta

# Install dependencies
npm install

# Development mode
npm run dev

# Build for production
npm run build
```

## 📋 Requirements

- Steam Deck with Decky Loader installed
- SteamGridDB account (free)
- Internet connection for artwork downloads

## 🗂️ Supported Collection Types

- **Genre-Based**: Horror, Adventure, Action, RPG, Strategy, Simulation
- **Developer Collections**: Group games by studio
- **Year Collections**: Organize by release decade
- **Custom Tags**: Create your own categories

## 🎨 Artwork Sources

All artwork is sourced from [SteamGridDB](https://www.steamgriddb.com/), the community-driven database of high-quality Steam game artwork.

## 🤝 Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

- 🐛 Report bugs via [Issues](https://github.com/codevski/gameta/issues)
- 💡 Request features via [Discussions](https://github.com/codevski/gameta/discussions)
- 🔧 Submit PRs for improvements

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Credits

- Built for [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader)
- Artwork by [SteamGridDB](https://www.steamgriddb.com/)
- Inspired by [Kometa](https://github.com/Kometa-Team/Kometa)

---

**Made with ❤️ for Steam Deck users who love organization**
