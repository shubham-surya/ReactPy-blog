import flask_sqlalchemy
from dataclasses import dataclass

db = flask_sqlalchemy.SQLAlchemy()

@dataclass
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String())

    def __init__(self, username, password):
        self.username = username
        self.password = password

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