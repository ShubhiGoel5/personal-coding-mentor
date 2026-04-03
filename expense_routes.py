from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Expense
from datetime import datetime

expense_bp = Blueprint('expenses', __name__, url_prefix='/api/expenses')

@expense_bp.route('/', methods=['GET'])
@jwt_required()
def get_expenses():
    try:
        user_id = get_jwt_identity()
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        expenses = Expense.query.filter_by(user_id=user_id).paginate(page=page, per_page=per_page)
        return jsonify({
            'expenses': [expense.to_dict() for expense in expenses.items],
            'total': expenses.total,
            'pages': expenses.pages,
            'current_page': page
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@expense_bp.route('/', methods=['POST'])
@jwt_required()
def create_expense():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        expense = Expense(
            user_id=user_id,
            name=data['name'],
            category=data['category'],
            amount=data['amount'],
            date=datetime.fromisoformat(data['date']) if isinstance(data['date'], str) else data['date'],
            description=data.get('description')
        )
        db.session.add(expense)
        db.session.commit()
        return jsonify({
            'message': 'Expense created successfully',
            'expense': expense.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@expense_bp.route('/<int:expense_id>', methods=['PUT'])
@jwt_required()
def update_expense(expense_id):
    try:
        user_id = get_jwt_identity()
        expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
        if not expense:
            return jsonify({'error': 'Expense not found'}), 404
        data = request.get_json()
        if 'name' in data:
            expense.name = data['name']
        if 'category' in data:
            expense.category = data['category']
        if 'amount' in data:
            expense.amount = data['amount']
        if 'description' in data:
            expense.description = data['description']
        db.session.commit()
        return jsonify({
            'message': 'Expense updated successfully',
            'expense': expense.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@expense_bp.route('/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    try:
        user_id = get_jwt_identity()
        expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
        if not expense:
            return jsonify({'error': 'Expense not found'}), 404
        db.session.delete(expense)
        db.session.commit()
        return jsonify({'message': 'Expense deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@expense_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_expense_stats():
    try:
        user_id = get_jwt_identity()
        expenses = Expense.query.filter_by(user_id=user_id).all()
        stats = {}
        total = 0
        for expense in expenses:
            if expense.category not in stats:
                stats[expense.category] = 0
            stats[expense.category] += expense.amount
            total += expense.amount
        return jsonify({'stats': stats, 'total': total}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
