from flask import Flask, jsonify, request
import urllib.request, json, os
from flask_sqlalchemy import inspect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin

from models import User, Post, Comment
from shared.db import db
import database

app = Flask(__name__)
CORS(app, support_credentials=True)
    
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)  

@app.route('/')
def index():
    return "hello"

# Authentication APIS
@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
            return 'Bad Request', 400
        if database.get_user_count(User, username = username) != 0:
            user = database.get_user(User, username = username)
            if check_password_hash(user.password, password) :
                user_details = object_as_dict(user)
                return json.dumps({"username" : user_details["username"], "id": user_details["id"]} ), 200
            else :
                return "Invalid username or password", 404
        else :
            return "Noo user Found", 400

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
            return 'Please fill all he fields', 400
        if database.get_user_count(User, username = username) == 0:
            if database.register_user(User, username = username, password = generate_password_hash(password)):
                return 'Success', 200
        else :
            return "Username already exist", 400
        
# Post APIS
@app.route('/create_post', methods=['POST'])
@cross_origin()
def create_post():
    if request.method == 'POST':
        user_id = request.form['id']
        post_title = request.form['title']
        post_content = request.form['content']
        comment_count = 0
        if post_title == '' or post_content == '':
            return 'Please fill all he fields', 400
        else :
            database.add_instance(Post, user_id = user_id, post_title = post_title, post_content = post_content, comment_count = comment_count)
            return 'Success', 200

@app.route('/get_all_posts', methods=['GET'])
@cross_origin()
def get_all_posts():
    if request.method == 'GET':
        posts = database.get_all(Post)
        array = []
        for i in posts:
            user = database.get_user_by_id(User, id = i.user_id)
            post_dict = object_as_dict(i)
            post_dict.update({'username': user.username})
            array.append(post_dict)
        return jsonify(array), 200
    
@app.route('/get_user_posts', methods=['POST'])
@cross_origin()
def get_user_posts():
    if request.method == 'POST':
        user_id = request.form['id']
        posts = database.get_user_posts(Post, user_id = user_id)
        array = []
        for i in posts:
            user = database.get_user_by_id(User, id = i.user_id)
            post_dict = object_as_dict(i)
            post_dict.update({'username': user.username})
            array.append(post_dict)
        return jsonify(array), 200

@app.route('/get_post', methods=['POST'])
@cross_origin()
def get_post():
    if request.method == 'POST':
        post_id = request.form['post_id']
        array = []
        posts = database.get_first(Post, id = post_id)
        user = database.get_user_by_id(User, id = posts.user_id)
        post_dict = object_as_dict(posts)
        post_dict.update({'username': user.username})
        comments = database.get_all_comments(Comment, post_id = post_id)
        comments_array = []
        for i in comments:
            user = database.get_user_by_id(User, id = i.user_id)
            comm_dict = object_as_dict(i)
            comm_dict.update({'username': user.username})
            comments_array.append(comm_dict)
        post_dict.update({'comments': comments_array})
        array.append(post_dict)
        return jsonify(array), 200
        
# Comment APIS
@app.route('/create_comment', methods=['POST'])
@cross_origin()
def create_comment():
    if request.method == 'POST':
        user_id = request.form['user_id']
        post_id = request.form['post_id']
        comment_content = request.form['content']
        if comment_content == '':
            return 'Please fill all he fields', 400
        else :
            data = Comment(user_id, post_id, comment_content)
            db.session.add(data)
            db.session.query(Post).filter(Post.id == post_id).update({'comment_count': Post.comment_count + 1})
            db.session.commit()
            

            return 'Success', 200

# @app.route('/search', methods=['POST'])
# @cross_origin()
# def search():
#     if request.method == 'POST':
#         search = request.form['search']
#         with urllib.request.urlopen("http://localhost:8983/solr/postgre/select?indent=true&q.op=OR&q=*/*") as url:
#             data = json.loads(url.read().decode())
#             print(data)
#             return 'Success', 200
        
#For returning db op obj as dict   
def object_as_dict(obj):
    return {
        c.key: getattr(obj, c.key) 
        for c in inspect(obj).mapper.column_attrs
    }

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
