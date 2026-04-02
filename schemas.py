from marshmallow import Schema, fields, validate, ValidationError

class UserSchema(Schema):
    username = fields.String(required=True, validate=validate.Length(min=3, max=30), error_messages={'required': 'Username is required.', 'null': 'Username cannot be null.', 'validator_failed': 'Username must be between 3 and 30 characters long.'})
    email = fields.Email(required=True, error_messages={'required': 'Email is required.', 'null': 'Email cannot be null.'})
    password = fields.String(required=True, validate=validate.Length(min=6), error_messages={'required': 'Password is required.', 'null': 'Password cannot be null.', 'validator_failed': 'Password must be at least 6 characters long.'})

class ExpenseSchema(Schema):
    amount = fields.Float(required=True, error_messages={'required': 'Amount is required.', 'null': 'Amount cannot be null.'})
    description = fields.String(required=True, validate=validate.Length(max=100), error_messages={'required': 'Description is required.', 'null': 'Description cannot be null.', 'validator_failed': 'Description cannot exceed 100 characters.'})
    date = fields.DateTime(required=True, error_messages={'required': 'Date is required.', 'null': 'Date cannot be null.'})

class BudgetSchema(Schema):
    total_amount = fields.Float(required=True, error_messages={'required': 'Total amount is required.', 'null': 'Total amount cannot be null.'})
    month = fields.String(required=True, validate=validate.Length(min=1, max=20), error_messages={'required': 'Month is required.', 'null': 'Month cannot be null.', 'validator_failed': 'Month must be between 1 and 20 characters long.'})

class ChatMessageSchema(Schema):
    message = fields.String(required=True, validate=validate.Length(min=1, max=200), error_messages={'required': 'Message content is required.', 'null': 'Message cannot be null.', 'validator_failed': 'Message content must be between 1 and 200 characters long.'})