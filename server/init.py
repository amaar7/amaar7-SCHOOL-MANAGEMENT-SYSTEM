import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from models import db, User

def create_app():
    app = Flask(__name__)

    # Ensured the 'instance' directory exists
    instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
    os.makedirs(instance_path, exist_ok=True)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(instance_path, "school.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'thisisthesecretkey'

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Initialize LoginManager
    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Register blueprints
    from routes import main as main_blueprint
    from auth_routes import auth as auth_blueprint
    app.register_blueprint(main_blueprint)
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app
