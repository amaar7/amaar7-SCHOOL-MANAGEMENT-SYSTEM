from flask import Blueprint, jsonify, request
from models import db, Student, Teacher, Class, Attendance, Grade, ClassStudent  # Importing the models

main = Blueprint('main', __name__)

# Default route to handle the base URL
@main.route('/')
def index():
    return jsonify({'message': 'Welcome to the School Management System API'})

# Student Routes
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

# Teacher Routes
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

# Class Routes
@main.route('/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'teacher_id': c.teacher_id} for c in classes])

@main.route('/classes', methods=['POST'])
def add_class():
    data = request.get_json()
    new_class = Class(name=data['name'], teacher_id=data['teacher_id'])
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'message': 'Class added successfully'}), 201

# Attendance Routes
@main.route('/attendance', methods=['GET'])
def get_attendance():
    attendance_records = Attendance.query.all()
    return jsonify([{'id': a.id, 'date': a.date, 'student_id': a.student_id, 'status': a.status} for a in attendance_records])

@main.route('/attendance', methods=['POST'])
def add_attendance():
    data = request.get_json()
    new_attendance = Attendance(date=data['date'], student_id=data['student_id'], status=data['status'])
    db.session.add(new_attendance)
    db.session.commit()
    return jsonify({'message': 'Attendance recorded successfully'}), 201

# Grade Routes
@main.route('/grades', methods=['GET'])
def get_grades():
    grades = Grade.query.all()
    return jsonify([{'id': g.id, 'student_id': g.student_id, 'subject': g.subject, 'score': g.score} for g in grades])

@main.route('/grades', methods=['POST'])
def add_grade():
    data = request.get_json()
    new_grade = Grade(student_id=data['student_id'], subject=data['subject'], score=data['score'])
    db.session.add(new_grade)
    db.session.commit()
    return jsonify({'message': 'Grade added successfully'}), 201
