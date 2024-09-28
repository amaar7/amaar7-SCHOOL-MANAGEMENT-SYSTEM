from flask import Blueprint, jsonify, request
from models import db, Student, Teacher  # Importing the models

main = Blueprint('main', __name__)

# Default route to handle the base URL
@main.route('/')
def index():
    return jsonify({'message': 'Welcome to the School Management System API'})

@main.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([{'id': s.id, 'name': s.name, 'grade': s.grade} for s in students])

@main.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    new_student = Student(name=data['name'], grade=data['grade'])
    db.session.add(new_student)
    db.session.commit()
    return jsonify({'message': 'Student added successfully'}), 201

@main.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    return jsonify([{'id': t.id, 'name': t.name, 'subject': t.subject} for t in teachers])

@main.route('/teachers', methods=['POST'])
def add_teacher():
    data = request.get_json()
    new_teacher = Teacher(name=data['name'], subject=data['subject'])
    db.session.add(new_teacher)
    db.session.commit()
    return jsonify({'message': 'Teacher added successfully'}), 201
