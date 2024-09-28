from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.from_pyfile('instance/config.py')

    db.init_app(app)

    # Initialized Flask-Migrate
    migrate = Migrate(app, db)

    # Imported the routes
    from routes import main
    app.register_blueprint(main)

    return app
