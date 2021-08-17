from fastapi import APIRouter

from .views import ping, run_command

dev_router = APIRouter(
    prefix="/api/v1/dev",
    tags=["dev"],
    responses={404: {"description": "Not found"}},
)


dev_router.add_api_route("/run-command/", run_command, methods=["POST"])
dev_router.add_api_route("/ping", ping, methods=["GET"])
