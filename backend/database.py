from shared.db import db

def get_all(model):
    data = model.query.all()
    return data

def get_first(model, id):
    data = model.query.filter(id == id).first()
    return data

def get_all_comments(model, post_id):
    data = model.query.filter(post_id == post_id).all()
    return data

def get_user_count(model, username):
    data = model.query.filter(username == username).count()
    return data

def get_user_by_id(model, id):
    data = model.query.filter(id == id).first()
    return data

def get_user_posts(model, user_id):
    data = model.query.filter(user_id == user_id).all()
    return data

def get_comments(model, post_id):
    data = model.query.filter(post_id == post_id).all()
    return data

def add_instance(model, **kwargs):
    instance = model(**kwargs)
    db.session.add(instance)
    commit_changes()


def delete_instance(model, id):
    model.query.filter_by(id=id).delete()
    commit_changes()

def edit_instance(model, id, **kwargs):
    instance = model.query.filter_by(id=id).all()[0]
    for attr, new_value in kwargs.items():
        setattr(instance, attr, new_value)
    commit_changes()
    
def register_user(model, **kwargs):
    instance = model(**kwargs)
    db.session.add(instance)
    commit_changes()
    return True

def get_user(model, username):
    data = model.query.filter(username == username).first()
    return data


def commit_changes():
    db.session.commit()
