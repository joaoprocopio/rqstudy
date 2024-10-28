dev:
	@make dev_server & make dev_client

dev_server:
	@if command -v air > /dev/null; then \
			air; \
		else \
			go install github.com/air-verse/air@latest; \
			air; \
		fi

dev_client:
	@if command -v pnpm > /dev/null; then \
			pnpm run dev; \
		else \
			npm i -g 'pnpm@9.12.2'; \
			pnpm run dev; \
		fi

.PHONY: dev dev_server dev_client