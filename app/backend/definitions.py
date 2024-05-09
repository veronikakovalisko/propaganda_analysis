import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

SQLALCHEMY_DATABASE_URL = "sqlite:///" + ROOT_DIR + "/infrastructure/db/records.db"

