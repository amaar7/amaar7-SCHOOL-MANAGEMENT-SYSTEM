from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///school.db'  # Change to your preferred DB
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.from_pyfile('instance/config.py')

    db.init_app(app)

    # Import the routes
    from routes import main
    app.register_blueprint(main)

    return app
