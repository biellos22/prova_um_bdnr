from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cadastro.db'

db = SQLAlchemy(app)

class Cadastro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150))
    telefone = db.Column(db.Integer)
    password = db.Column(db.Integer)

    def __init__(self, email, telefone, password):
        self.email = email
        self.telefone = telefone
        self.password = password

@app.route('/')
def index():
    cadastro = Cadastro.query.all()
    return render_template('index.html', cadastro=cadastro)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        email = request.form['email']
        telefone = int(request.form['telefone'])
        password = int(request.form['password'])
        cadastro = Cadastro(email=email, telefone=telefone, password=password)
        db.session.add(cadastro)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add.html')

@app.route('/delete/<int:id>')
def delete(id):
    cadastro = Cadastro.query.get(id)
    db.session.delete(cadastro)
    db.session.commit()
    return  redirect(url_for('index'))

@app.route('/edit/<int:id>')
def edit(id):
    cadastro = Cadastro.query.get(id)
    if request.method == 'POST':
        return redirect(url_for('index'))
    return render_template('edit.html', cadastro=cadastro)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
