from app.core.cli import apply_migrations


async def migrate():
    apply_migrations()
