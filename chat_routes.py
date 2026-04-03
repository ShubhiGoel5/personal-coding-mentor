from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, ChatMessage
from openai_service import OpenAIService

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')
openai_service = OpenAIService()

@chat_bp.route('/', methods=['POST'])
@jwt_required()
def chat():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        history = ChatMessage.query.filter_by(user_id=user_id, session_id=session_id).all()
        messages = [{'role': m.role, 'content': m.content} for m in history]
        
        response = openai_service.get_finance_advice(message, messages)
        
        user_msg = ChatMessage(user_id=user_id, session_id=session_id, role='user', content=message)
        db.session.add(user_msg)
        
        assistant_msg = ChatMessage(user_id=user_id, session_id=session_id, role='assistant', content=response)
        db.session.add(assistant_msg)
        
        db.session.commit()
        
        return jsonify({'message': response, 'session_id': session_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    try:
        user_id = get_jwt_identity()
        session_id = request.args.get('session_id', 'default')
        messages = ChatMessage.query.filter_by(user_id=user_id, session_id=session_id).all()
        return jsonify({
            'messages': [msg.to_dict() for msg in messages]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
