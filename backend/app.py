from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from bson.objectid import ObjectId
from bson.json_util import dumps, loads
import os
import certifi
import logging
import json

# Configure logging
logging.basicConfig(level=logging.DEBUG)


app = Flask(__name__)
JWT = JWTManager(app)
CORS(app)

app.config['MONGO_URI'] = 'mongodb+srv://fardosaadow:1czZbqstjoeBJIp3@cluster0.cjsvyhv.mongodb.net/ecommerce_website?retryWrites=true&w=majority&tlsCAFile=' + certifi.where()
mongo = PyMongo(app)

app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = 'this-is-the-secret-key'


@app.route("/")
def hello_world():
    return "Hello World!"

@app.route("/adminRegister", methods=['POST', 'GET'])
def adminRegister():
    allUsers = mongo.db.admins
    if request.method == 'POST':
        user = allUsers.find_one({'email': request.json['email']})
        companyName = allUsers.find_one({'companyName': request.json['companyName']})
        phone = allUsers.find_one({'phone': request.json['phone']})

        if user:
            return jsonify(message='Email already exists'), 401
        if companyName:
            return jsonify(message='Company Name already exists'), 401
        if phone:
            return jsonify(message='Phone Number already exists'), 401

        if request.json['password'] != request.json['cpassword']:
            return jsonify(message='Passwords do not match!'), 401

        hashpw = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
        hashCpw = bcrypt.hashpw(request.json['cpassword'].encode('utf-8'), bcrypt.gensalt())

        access_token = create_access_token(identity=request.json['email'])

        allUsers.insert_one({
            'email': request.json['email'],
            'companyName': request.json['companyName'],
            'phone': request.json['phone'],
            'password': hashpw,
            'cpassword': hashCpw,
            'tokens': [{'token': str(access_token)}]
        })

        return jsonify(token=str(access_token)), 201


@app.route('/addProduct', methods=['POST'])
def addProduct():
    try:
        data = request.get_json()
        adminId = data.get('adminId')
        adminName = data.get('adminName')
        productUrl = data.get('productUrl')
        productName = data.get('productName')
        productCategory = data.get('productCategory')
        productPrice = data.get('productPrice')

        AllProducts = mongo.db.products
        existing_product = AllProducts.find_one({
            'productName': productName,
            'productPrice': productPrice,
            'adminId': adminId
        })
        if existing_product:
            return jsonify({'error': 'Product already added!'}), 409

        # Insert new product
        AllProducts.insert_one({
            'adminId': adminId,
            'adminName': adminName,
            'productUrl': productUrl,
            'productName': productName,
            'productCategory': productCategory,
            'productPrice': productPrice
        })
        
        return jsonify({'message': 'Product added successfully!'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
@app.route("/getAllProducts", methods=['GET'])
def getAllProducts():
    allProducts = mongo.db.products
    prod = dumps(
        list(allProducts.find({})), indent=2)

    prod = json.loads(prod)
    return jsonify(prod), 201


@app.route("/editProduct", methods=['PUT'])
def editProduct():
    try:
        data = request.json
        id = data['uid']
        productName = data['productName']
        productPrice = data['productPrice']
        productUrl = data['productUrl']

        # Update the product
        AllProducts = mongo.db.products.update_one(
            {'_id': ObjectId(id)},
            {'$set': {
                'productName': productName,
                'productPrice': productPrice,
                'productUrl': productUrl
            }}
        )

        if AllProducts.matched_count > 0:
            return jsonify(message='Product Updated Successfully'), 201
        else:
            return jsonify(message='Product not found'), 404
    except Exception as e:
        app.logger.error(f"Error updating product: {e}")
        return jsonify(message='Something went wrong'), 500


@app.route("/deleteProduct", methods=['PUT'])
def deleteProduct():

    id = request.json['uid']
    AllProducts = mongo.db.products
    prod = AllProducts.find_one({'_id': ObjectId(id)})

    if prod:
        AllProducts.delete_one(prod)
        return jsonify(message='Product Deleted Successfully'), 201
    return jsonify(message='Something went wrong'), 401


@app.route("/adminLogin", methods=['POST'])
def adminLogin():
    allUsers = mongo.db.admins
    user = allUsers.find_one({'email': request.json['email']})

    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user['password']):
        access_token = create_access_token(identity=request.json['email'])
        allUsers.update_one(
            {'email': request.json['email']},
            {'$push': {'tokens': {'token': str(access_token)}}}
        )
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid Username/Password'), 401

@app.route("/getAdminData", methods=['POST'])
def getAdminData():

    allUsers = mongo.db.admins
    # user = allUsers.find_one({'tokens.token': request.json['auth']})
    user = dumps(
        list(allUsers.find({'tokens.token': request.json['auth']})), indent=2)

    if user:
        user = json.loads(user)
        return jsonify(user), 201

    return jsonify(message='Something went wrong'), 401


@app.route("/adminOrders", methods=['PUT'])
def adminOrders():
    uid = request.json['uid']
    oid = request.json['oid']
    allUsers = mongo.db.users
    user = allUsers.find_one({'_id': uid, "orders": {'_id': ObjectId(oid)}})
    if user:
        print(user)
        return 201
    return 401


@app.route("/logoutAdmin", methods=['POST'])
def logoutAdmin():
    allUsers = mongo.db.admins
    token = request.json.get('auth')
    user = allUsers.find_one({'tokens.token': token})

    if user:
        allUsers.update_one(
            {'_id': ObjectId(user['_id'])},
            {'$pull': {'tokens': {'token': token}}}
        )
        return jsonify(message='Logout Successfully!'), 201
    return jsonify(message='Invalid token'), 401


# user api

@app.route("/userRegister", methods=['POST', 'GET'])
def userRegister():
    if request.method == 'POST':
        allUsers = mongo.db.users
        user = allUsers.find_one({'email': request.json['email']})
        username = allUsers.find_one({'username': request.json['username']})
        phone = allUsers.find_one({'phone': request.json['phone']})

        if user:
            return jsonify(message='Email already exists'), 401
        if username:
            return jsonify(message='Username already exists'), 401
        if phone:
            return jsonify(message='Phone Number already exists'), 401

        if request.json['password'] != request.json['cpassword']:
            return jsonify(message='Password Not Matching!'), 401

        hashpw = bcrypt.hashpw(
            request.json['password'].encode('utf-8'), bcrypt.gensalt())

        hashCpw = bcrypt.hashpw(
            request.json['cpassword'].encode('utf-8'), bcrypt.gensalt())

        access_token = create_access_token(identity=request.json['email'])

        allUsers.insert_one({
            'email': request.json['email'],
            'password': hashpw,
            'cpassword': hashCpw,
            "username": request.json['username'],
            "phone": request.json['phone'],
            'tokens': [
                {
                    'token': str(access_token)
                }
            ]
        })

        session['email'] = request.json['email']
        return jsonify(token=str(access_token)), 201


@app.route("/userLogin", methods=['POST'])
def userLogin():
    allUsers = mongo.db.users
    user = allUsers.find_one({'email': request.json['email']})

    if user and bcrypt.checkpw(request.json['password'].encode('utf-8'), user['password']):
        access_token = create_access_token(identity=request.json['email'])
        allUsers.update_one(
            {'email': request.json['email']},
            {'$push': {'tokens': {'token': str(access_token)}}}
        )
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid Username/Password'), 401

@app.route("/getUserData", methods=['POST'])
def getUserData():

    allUsers = mongo.db.users
    user = dumps(
        list(allUsers.find({'tokens.token': request.json['auth']})), indent=2)

    if user:
        user = json.loads(user)
        return jsonify(user), 201

    return jsonify(message='Something went wrong'), 401


if __name__ == '__main__':
    app.run(debug=True)
