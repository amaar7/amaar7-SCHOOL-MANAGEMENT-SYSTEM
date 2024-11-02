from flask import Blueprint, request, jsonify, redirect, url_for
from models import db, User
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user, login_required, current_user

bcrypt = Bcrypt()
auth = Blueprint('auth', __name__)

# Registration route
@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password, role=data['role'])
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login route
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({"message": "Logged in successfully", "role": user.role}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Logout route
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200
