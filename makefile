# Gameta Decky Plugin Makefile

PLUGIN_NAME = gameta
VERSION = 1.0.0
DIST_DIR = dist
OUT_DIR = out
ZIP_NAME = $(PLUGIN_NAME)-v$(VERSION).zip

# Required files for distribution
REQUIRED_FILES = package.json plugin.json main.py README.md LICENSE

# Default target
all: clean build package

# Install dependencies
install:
	pnpm install

# Build the frontend
build:
	pnpm run build
	@echo "✅ Frontend built successfully"

# Create distribution package
package: build
	@echo "📦 Creating distribution package..."
	@rm -rf $(OUT_DIR)
	@mkdir -p $(OUT_DIR)/$(PLUGIN_NAME)

	# Copy dist folder
	@cp -r $(DIST_DIR) $(OUT_DIR)/$(PLUGIN_NAME)/

	# Copy required files
	@for file in $(REQUIRED_FILES); do \
		if [ -f $$file ]; then \
			cp $$file $(OUT_DIR)/$(PLUGIN_NAME)/; \
			echo "✅ Copied $$file"; \
		else \
			echo "⚠️  Warning: $$file not found"; \
		fi \
	done

	# Create zip
	@cd $(OUT_DIR) && zip -r ../$(ZIP_NAME) $(PLUGIN_NAME)/
	@echo "🎉 Package created: $(ZIP_NAME)"
	@ls -la $(ZIP_NAME)

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	@rm -rf $(DIST_DIR) $(OUT_DIR) *.zip
	@echo "✅ Clean complete"

# Development build (no packaging)
dev: build
	@echo "🔧 Development build complete"

# Quick package without full rebuild
quick-package:
	@echo "📦 Quick packaging (no rebuild)..."
	@rm -rf $(OUT_DIR) *.zip
	@mkdir -p $(OUT_DIR)/$(PLUGIN_NAME)

	# Copy dist folder
	@if [ -d "$(DIST_DIR)" ]; then \
		cp -r $(DIST_DIR) $(OUT_DIR)/$(PLUGIN_NAME)/; \
	else \
		echo "❌ Error: $(DIST_DIR) not found. Run 'make build' first."; \
		exit 1; \
	fi

	# Copy required files
	@for file in $(REQUIRED_FILES); do \
		if [ -f $$file ]; then \
			cp $$file $(OUT_DIR)/$(PLUGIN_NAME)/; \
		fi \
	done

	# Create zip
	@cd $(OUT_DIR) && zip -r ../$(ZIP_NAME) $(PLUGIN_NAME)/
	@echo "🎉 Quick package created: $(ZIP_NAME)"

# Check if all required files exist
check:
	@echo "🔍 Checking required files..."
	@for file in $(REQUIRED_FILES); do \
		if [ -f $$file ]; then \
			echo "✅ $$file"; \
		else \
			echo "❌ $$file (missing)"; \
		fi \
	done
	@if [ -d "$(DIST_DIR)" ]; then \
		echo "✅ $(DIST_DIR)/"; \
	else \
		echo "❌ $(DIST_DIR)/ (run 'make build')"; \
	fi

# Install to Steam Deck (if connected via SSH)


deploy: package
	@echo "🚀 Deploying to Steam Deck..."
	@if [ -z "$(DECK_IP)" ]; then \
		echo "❌ Set DECK_IP environment variable (e.g., export DECK_IP=192.168.1.100)"; \
		exit 1; \
	fi
	@echo "📂 Creating plugins directory on Steam Deck..."
	@ssh deck@$(DECK_IP) "mkdir -p ~/Downloads/SteamDeck/homebrew/plugins/"
	@scp $(ZIP_NAME) deck@$(DECK_IP):~/Downloads/SteamDeck/homebrew/plugins/
#	@echo "📦 Extracting plugin on Steam Deck..."
#	@ssh deck@$(DECK_IP) "cd ~/Downloads/SteamDeck/homebrew/plugins/ && unzip -o $(ZIP_NAME) && rm $(ZIP_NAME)"
	@echo "✅ Deployed $(PLUGIN_NAME) to Steam Deck"

# Show help
help:
	@echo "Gameta Plugin Build System"
	@echo ""
	@echo "Targets:"
	@echo "  install       - Install pnpm dependencies"
	@echo "  build         - Build frontend code"
	@echo "  package       - Build and create distribution zip"
	@echo "  clean         - Remove build artifacts"
	@echo "  dev           - Development build only"
	@echo "  quick-package - Package without rebuilding"
	@echo "  check         - Verify all required files exist"
	@echo "  deploy        - Deploy to Steam Deck (set DECK_IP first)"
	@echo "  help          - Show this help"
	@echo ""
	@echo "Examples:"
	@echo "  make install     # First time setup"
	@echo "  make package     # Build and package for distribution"
	@echo "  DECK_IP=192.168.1.100 make deploy  # Deploy to Steam Deck"

.PHONY: all install build package clean dev quick-package check deploy help
