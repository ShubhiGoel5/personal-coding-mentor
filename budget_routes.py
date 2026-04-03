from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Budget, Expense
from datetime import datetime

budget_bp = Blueprint('budgets', __name__, url_prefix='/api/budgets')

@budget_bp.route('/', methods=['GET'])
@jwt_required()
def get_budgets():
    try:
        user_id = get_jwt_identity()
        month = request.args.get('month', datetime.now().strftime('%Y-%m'))
        budgets = Budget.query.filter_by(user_id=user_id, month=month).all()
        result = []
        for budget in budgets:
            spent = db.session.query(db.func.sum(Expense.amount)).filter(
                Expense.user_id == user_id,
                Expense.category == budget.category
            ).scalar() or 0
            result.append(budget.to_dict(spent))
        return jsonify({'budgets': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@budget_bp.route('/', methods=['POST'])
@jwt_required()
def create_budget():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        budget = Budget(
            user_id=user_id,
            category=data['category'],
            limit_amount=data['limit_amount'],
            month=data['month']
        )
        db.session.add(budget)
        db.session.commit()
        return jsonify({
            'message': 'Budget created successfully',
            'budget': budget.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@budget_bp.route('/<int:budget_id>', methods=['PUT'])
@jwt_required()
def update_budget(budget_id):
    try:
        user_id = get_jwt_identity()
        budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
        if not budget:
            return jsonify({'error': 'Budget not found'}), 404
        data = request.get_json()
        if 'limit_amount' in data:
            budget.limit_amount = data['limit_amount']
        if 'category' in data:
            budget.category = data['category']
        db.session.commit()
        return jsonify({
            'message': 'Budget updated successfully',
            'budget': budget.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@budget_bp.route('/<int:budget_id>', methods=['DELETE'])
@jwt_required()
def delete_budget(budget_id):
    try:
        user_id = get_jwt_identity()
        budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
        if not budget:
            return jsonify({'error': 'Budget not found'}), 404
        db.session.delete(budget)
        db.session.commit()
        return jsonify({'message': 'Budget deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
