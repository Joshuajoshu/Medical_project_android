from flask import Flask, request, jsonify
from flask_cors import CORS
import gemini_util as genAi
from PIL import Image
from flask_ngrok import run_with_ngrok
from pymongo import MongoClient
from io import BytesIO
import base64
app=Flask(__name__)
CORS(app)
@app.route("/api/analyze",methods=['POST'])
def analyze():
    prompt = """ I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. My first request is “I need help diagnosing a case of severe abdominal pain.”

Act as a Dietitian
As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?

Act as a Doctor
I want you to act as a doctor and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patient’s age, lifestyle and medical history when providing your recommendations. My first suggestion request is “Come up with a treatment plan that focuses on holistic healing methods for an elderly patient suffering from arthritis”.

Act as a Virtual Doctor
I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is “I have been experiencing a headache and dizziness for the last few days.”

    """
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['chat_history']
    try:
        uploaded_file = request.files['image']
        if uploaded_file is not None:
            image=Image.open(uploaded_file)
            buffered = BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        if not prompt or not image:
            return jsonify({'error': 'Prompt and image are required.'}), 400
        
        # Call the function to interact with the OpenAI API
        response = genAi.get_gemimi_image(prompt, image)
        entry = {
            'image': img_str,
            'response': response
        }
        collection.insert_one(entry)
        return response
    except Exception as e:
        return e

@app.route("/api/text",methods=['POST'])
def text():
    prompt = """
    I want you to act as an AI assisted doctor. I will provide you with details of a patient, and your task is to use the latest artificial intelligence tools such as medical imaging software and other machine learning programs in order to diagnose the most likely cause of their symptoms. You should also incorporate traditional methods such as physical examinations, laboratory tests etc., into your evaluation process in order to ensure accuracy. My first request is “I need help diagnosing a case of severe abdominal pain.”

Act as a Dietitian
As a dietitian, I would like to design a vegetarian recipe for 2 people that has approximate 500 calories per serving and has a low glycemic index. Can you please provide a suggestion?

Act as a Doctor
I want you to act as a doctor and come up with creative treatments for illnesses or diseases. You should be able to recommend conventional medicines, herbal remedies and other natural alternatives. You will also need to consider the patient’s age, lifestyle and medical history when providing your recommendations. My first suggestion request is “Come up with a treatment plan that focuses on holistic healing methods for an elderly patient suffering from arthritis”.

Act as a Virtual Doctor
I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is “I have been experiencing a headache and dizziness for the last few days.”

if given prompt does not belong to any category above then reply user with "Please provide valid prompt"
    """
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['chat_history']
    try:
        data = request.json
        text=data.get('text')
        prompt1=prompt+text
        
        # Call the function to interact with the OpenAI API
        response = genAi.get_gemimi_pro(prompt1)
        entry = {
            'text': text,
            'response': response
        }
        collection.insert_one(entry)
    except Exception as e:
        print(e)
    return response   

@app.route("/api/get_chat_history", methods=['GET'])
def get_chat_history():
    # Retrieve chat history from MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['chat_history']
    chat_history = list(collection.find({}, {'_id': 0}))
    return jsonify(chat_history)


@app.route("/api/register",methods=['POST'])
def register():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['users']
    data = request.json
    name=data.get('name')
    username=data.get('username')
   
    password=data.get('password')
    user_data={
        'name':name,
        'email':username,
        
        'password':password
    }
    valid1 = collection.find_one({'email': username})
    print(name,username,password)
    
    if (valid1 ):
        
        return jsonify("inalid")
    else:
        collection.insert_one(user_data)
        return jsonify("Success")


    
@app.route('/api/users', methods=['GET'])
def get_users():
    users = [{'name': 'John Doe', 'age': 30}, {'name': 'Jane Doe', 'age': 25}]
    return jsonify(users)
    
@app.route("/api/login", methods=['POST'])
def login():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['medical']
    collection = db['users']
    data = request.json
    email=data.get('username')
    password=data.get('password')
    user_data={
        'email':email,
        'password':password
    }
    user = collection.find_one(user_data)
    print(email,password)
    if user:
        return jsonify("Success")
    else:
        return "Invalid Credentials"



if __name__=="__main__":
    app.run(debug=True,host="0.0.0.0")