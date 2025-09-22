#!/usr/bin/env bash
set -Eeuo pipefail
trap 'error_handler "${LINENO}" "${BASH_COMMAND}"' ERR

###############################################################################
# on_start.sh - Script to initialize and start the development environment
###############################################################################

log()   { echo -e "$(date '+%F %T') | ${*}" >&2; }
fail()  { log "ERROR: ${*}"; exit 1; }
error_handler() { log "ERROR at line ${1}: ${2}"; exit 1; }

script_dir() { cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P; }

detect_root() {
  local sd; sd="$(script_dir)"
  if [[ -d "${sd}/.." && -d "${sd}/../client" ]]; then
    realpath "${sd}/.."; return
  fi
  if command -v git >/dev/null 2>&1 && git rev-parse --show-toplevel >/dev/null 2>&1; then
    git rev-parse --show-toplevel; return
  fi
  if [[ -d "${PWD}/client" || -d "${PWD}/server" ]]; then
    echo "${PWD}"; return
  fi
  fail "Cannot locate project root. Run inside the repo or keep script in scripts/."
}

ROOT="$(detect_root)"
ENV_TEMPLATE="${ROOT}/.env.template"
ENV_FILE="${ROOT}/.env"

echo ""
log "Starting development environment setup at ROOT=${ROOT}"
echo ""

command -v bun >/dev/null 2>&1    || fail "bun is required"
command -v docker >/dev/null 2>&1 || fail "docker is required"
docker compose version >/dev/null 2>&1 || fail "Docker Compose plugin is required (e.g., 'docker compose')."

log "Ensuring .env is present..."
cd "${ROOT}"
if [[ -f "${ENV_FILE}" ]]; then
  log "${ENV_FILE} already exists -> skipping."
elif [[ -f "${ENV_TEMPLATE}" ]]; then
  cp -n -- "${ENV_TEMPLATE}" "${ENV_FILE}"
  log "Created ${ENV_FILE} from ${ENV_TEMPLATE}"
else
  log "No ${ENV_FILE} or ${ENV_TEMPLATE} found -> skipping."
fi
echo ""

log "Shutting down existing containers..."
cd "${ROOT}"
docker compose down || log "docker compose down failed or no containers to stop; continuing."
echo ""

log "Installing bun dependencies..."
if [[ -d "${ROOT}" ]]; then
  cd "${ROOT}"
  bun install
else
  log "Server dir not found at ${ROOT} -> skipping."
fi
echo ""

log "Building and starting new containers..."
cd "${ROOT}"
docker compose up --build -d
echo ""

log "Setup complete. Development environment is running."
echo ""