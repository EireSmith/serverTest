from flask import Flask, request, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS
import json
mysql = MySQL()
cur = mysql.connection.cursor() #create a connection to the SQL instance

app = Flask(__name__)
CORS(app)


# My SQL Instance configurations
# Change the HOST IP and Password to match your instance configurations
app.config['MYSQL_USER'] = 'web'
app.config['MYSQL_PASSWORD'] = 'webPass'
app.config['MYSQL_DB'] = 'student'
app.config['MYSQL_HOST'] = 'localhost' #for now
mysql.init_app(app)


@app.route("/login")
def login():
  usrename = request.form.get('username')
  email = request.form.get('email')
  name = request.form.get('name')
  password1 = request.form.get('password1')
  password2 = request.form.get('password2')

  render render_template('login.html')




@app.route("/add") #Add Student
def add():
  name = request.args.get('name')
  email = request.args.get('email')
  s='''INSERT INTO students(studentName, email) VALUES('{}','{}');'''.format(name,email)
  cur.execute(s)
  mysql.connection.commit()

  return '{"Result":"Success"}'

@app.route("/update")
def update():
   name = request.args.get('name')
   email = request.args.get('email')
   id = request.args.get('id')
   s = '''UPDATE students SET studentName = '{}', email = '{}' WHERE studentID = '{}';'''.format(name,email,id)
   cur.execute(s)
   mysql.connection.commit()
   return '{"Result":"Success"}'

@app.route("/delete")
def delete():
        id = request.args.get('id')
        s = '''DELETE FROM students WHERE studentID = '{}' ;'''.format(id)
        cur.execute(s)
        mysql.connection.commit()
        return '{"Result":"Success"}'

@app.route("/") #Default Show Data
def hello(): # Name of the method
  cur.execute('''SELECT * FROM students''') # execute an SQL statment
  rv = cur.fetchall() #Retreive all rows returend by the SQL statment
  Results=[]
  for row in rv: #Format te Output Results and add to return string
    Result={}
    Result['Name']=row[0].replace('\n',' ')
    Result['Email']=row[1]
    Result['ID']=row[2]
    Results.append(Result)
  response={'Results':Results, 'count':len(Results)}
  ret=app.response_class(
    response=json.dumps(response),
    status=200,
    mimetype='application/json'
  )
  return ret #Return the data in a string format
if __name__ == "__main__":
  app.run(host='0.0.0.0',port='8080', ssl_context=('/home/rob/cert.pem', '/home/rob/privkey.pem')) #Run the flask app at port 8080
