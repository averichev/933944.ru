SHELL := /bin/sh
.DEFAULT_GOAL := dev

SITE_DIR := $(CURDIR)
CODEX_NODE_BIN ?= $(HOME)/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin

ifneq ($(wildcard $(CODEX_NODE_BIN)/node),)
NODE := $(CODEX_NODE_BIN)/node
WITH_NODE := PATH="$(CODEX_NODE_BIN):$(PATH)"
else
NODE := node
WITH_NODE :=
endif

NPM = $(WITH_NODE) npm --prefix "$(SITE_DIR)"

.PHONY: dev install check build preview seo audit audit-desktop release check-node

check-node:
	@"$(NODE)" -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major < 22 || (major === 22 && minor < 19)) { console.error("Нужен Node.js 22.19.0 или новее. Сейчас используется " + process.version); process.exit(1); }'

dev: check-node
	@if [ ! -d "$(SITE_DIR)/node_modules" ]; then $(NPM) ci --include=dev; fi
	@$(NPM) run dev

install: check-node
	@$(NPM) ci --include=dev

check: check-node
	@$(NPM) run check

build: check-node
	@$(NPM) run build

preview: check-node
	@$(NPM) run preview

seo: build
	@$(NPM) run check:seo

audit: check-node
	@$(NPM) run audit

audit-desktop: check-node
	@$(NPM) run audit -- desktop

release: install
	@$(NPM) run check
	@$(NPM) run build
	@$(NPM) run check:seo
