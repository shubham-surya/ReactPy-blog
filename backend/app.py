from flask import Flask, jsonify, request, Response
from dataclasses import dataclass
import json
from flask_sqlalchemy import SQLAlchemy, inspect
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


ENV = 'dev'

if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:bakayaro123@localhost/test'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def object_as_dict(obj):
    return {
        c.key: getattr(obj, c.key) 
        for c in inspect(obj).mapper.column_attrs
    }

@dataclass
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String())

    def __init__(self, username, password):
        self.username = username
        self.password = password


@app.route('/')
def index():
    return "hello"

@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
            return 'Bad Request', 400
        if db.session.query(User).filter(User.username == username).count() != 0:
            user = db.session.query(User).filter(User.username == username).first()
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
        if db.session.query(User).filter(User.username == username).count() == 0:
            data = User(username, generate_password_hash(password))
            db.session.add(data)
            db.session.commit()
            return 'Success', 200
        else :
            return "Username already exist", 400
        return '',204
    
@dataclass
class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", backref=db.backref("user_data", uselist=False))
    post_title = db.Column(db.String())
    post_content = db.Column(db.String())
    comment_count = db.Column(db.Integer)

    def __init__(self, user_id, post_title, post_content, comment_count):
        self.user_id = user_id
        self.post_title = post_title
        self.post_content = post_content
        self.comment_count = comment_count
        
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
            data = Post(user_id, post_title, post_content, comment_count)
            db.session.add(data)
            db.session.commit()
            return 'Success', 200

@app.route('/get_all_posts', methods=['GET'])
@cross_origin()
def get_all_posts():
    if request.method == 'GET':
        posts = db.session.query(Post).all()
        array = []
        for i in posts:
            user = db.session.query(User).filter(User.id == i.user_id).first()
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
        posts = db.session.query(Post).filter(Post.id == post_id).first()
        user = db.session.query(User).filter(User.id == posts.user_id).first()
        post_dict = object_as_dict(posts)
        post_dict.update({'username': user.username})
        array.append(post_dict)
        return jsonify(array), 200
    
@dataclass
class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User", backref=db.backref("comment_user_data", uselist=False))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post = db.relationship("Post", backref=db.backref("post_data", uselist=False))
    comment_content = db.Column(db.String())

    def __init__(self, user_id, post_id, comment_content):
        self.user_id = user_id
        self.post_id = post_id
        self.comment_content = comment_content
        
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

@app.route('/get_comments', methods=['POST'])
@cross_origin()
def get_comments():
    if request.method == 'POST':
        post_id = request.form['post_id']
        array = []
        comments = db.session.query(Comment).filter(Comment.post_id == post_id).all()
        for i in comments:
            user = db.session.query(User).filter(User.id == i.user_id).first()
            comm_dict = object_as_dict(i)
            comm_dict.update({'username': user.username})
            array.append(comm_dict)
        return jsonify(array), 200


if __name__ == '__main__':
    app.run(debug=True)
