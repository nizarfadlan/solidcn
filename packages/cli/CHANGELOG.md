# Changelog

## 0.1.0 - 2026-05-01

### Added
- Add project preflight checks in `add` to auto-detect missing setup and offer auto-fix (`f5e7cfe385c6198f752ddfa6d433e1d374009f8e`).
- Add Tailwind setup pipeline for `init`/`add` with CSS token injection and plugin checks (`f5e7cfe385c6198f752ddfa6d433e1d374009f8e`).
- Add offline-safe built-in baseline item support in registry fetch flow (`f5e7cfe385c6198f752ddfa6d433e1d374009f8e`).
- Add framework-aware Tailwind baseline dependency handling (`1804b1b68d79716a13cc783e830e7b81ce22db5a`).
- Add `tailwind-base` registry generation support in registry builder (`5ef8133f383a941eba80136eb3df3891a4b8e303`).

### Changed
- Improve registry/config/schema handling as part of component export/import restructuring and registry updates (`8166ed9c93df6cd139ae9085a4e027c5907e6cc0`).
- Refactor command setup internals and remove unused variable paths (`5fdae7d6312daa42c80c7e3c72248990cc0eb508`).

### Notes
- This release is feature-heavy for CLI behavior and setup flow parity; version bumped to `0.1.0`.
