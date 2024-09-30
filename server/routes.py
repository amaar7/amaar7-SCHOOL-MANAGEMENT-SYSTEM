from flask import Blueprint, request, jsonify
from models import db, Student, Teacher, Class, Grade, Attendance

main = Blueprint('main', __name__)

# Routes for Students
@main.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    result = [{"id": student.id, "name": student.name, "grade": student.grade} for student in students]
    return jsonify(result), 200

@main.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name')
    grade = data.get('grade')

    if not name or not grade:
        return jsonify({"error": "Student name and grade are required"}), 400

    new_student = Student(name=name, grade=grade)
    db.session.add(new_student)

    try:
        db.session.commit()
        return jsonify({"message": "Student added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Routes for Teachers
@main.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    result = [{"id": teacher.id, "name": teacher.name, "subject": teacher.subject} for teacher in teachers]
    return jsonify(result), 200

@main.route('/teachers', methods=['POST'])
def add_teacher():
    data = request.get_json()
    name = data.get('name')
    subject = data.get('subject')

    if not name or not subject:
        return jsonify({"error": "Teacher name and subject are required"}), 400

    new_teacher = Teacher(name=name, subject=subject)
    db.session.add(new_teacher)

    try:
        db.session.commit()
        return jsonify({"message": "Teacher added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Routes for Classes
@main.route('/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    result = [{"id": cls.id, "name": cls.name, "teacher_id": cls.teacher_id} for cls in classes]
    return jsonify(result), 200

@main.route('/classes', methods=['POST'])
def add_class():
    data = request.get_json()
    name = data.get('name')
    teacher_id = data.get('teacher_id')

    if not name or not teacher_id:
        return jsonify({"error": "Class name and teacher ID are required"}), 400

    new_class = Class(name=name, teacher_id=teacher_id)
    db.session.add(new_class)

    try:
        db.session.commit()
        return jsonify({"message": "Class added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Routes for Attendance
@main.route('/attendance', methods=['GET'])
def get_attendance():
    attendance_records = Attendance.query.all()
    result = [
        {
            "id": record.id,
            "student_id": record.student_id,
            "status": record.status,
            "date": str(record.date)
        }
        for record in attendance_records
    ]
    return jsonify(result), 200

@main.route('/attendance', methods=['POST'])
def add_attendance():
    data = request.get_json()
    student_id = data.get('student_id')
    status = data.get('status')
    date = data.get('date')

    if not student_id or not status or not date:
        return jsonify({"error": "Student ID, status, and date are required"}), 400

    new_record = Attendance(student_id=student_id, status=status, date=date)
    db.session.add(new_record)

    try:
        db.session.commit()
        return jsonify({"message": "Attendance record added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Routes for Grades
@main.route('/grades', methods=['GET'])
def get_grades():
    grades = Grade.query.all()
    result = [
        {"id": grade.id, "student_id": grade.student_id, "subject": grade.subject, "score": grade.score}
        for grade in grades
    ]
    return jsonify(result), 200

@main.route('/grades', methods=['POST'])
def add_grade():
    data = request.get_json()
    student_id = data.get('student_id')
    subject = data.get('subject')
    score = data.get('score')

    if not student_id or not subject or not score:
        return jsonify({"error": "All fields are required"}), 400

    new_grade = Grade(student_id=student_id, subject=subject, score=score)
    db.session.add(new_grade)

    try:
        db.session.commit()
        return jsonify({"message": "Grade added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
