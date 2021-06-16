from time import time

import jwt
from starlette.config import Config

config = Config(".env")
secret = config("SECRET_KEY")


def check_access_token(access_token):
    if not access_token:
        return False

    try:
        account = jwt.decode(access_token, secret, algorithms=["HS256"])
        return account
    except jwt.ExpiredSignature:
        return False


def generate_jwt(account):
    token = jwt.encode(
        {"exp": time() + 604800, **account}, secret, algorithm="HS256"
    )
    return token
