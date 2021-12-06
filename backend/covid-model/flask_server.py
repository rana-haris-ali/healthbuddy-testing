from flask import Flask, jsonify,request
from flask_cors import CORS
import sys
import cv2
import numpy as np
import base64
from PIL import Image
from io import BytesIO
from joblib import load
import re
from tensorflow.keras.models import load_model
from keras.models import Sequential, Model
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, Activation, MaxPooling2D
from keras.utils import normalize
from keras.layers import Concatenate
from keras import Input
import tensorflow as tf
import pandas
import math
import json
import argparse

# import all_symptoms saved in other file
from all_symptoms_list import all_symptoms_list



label_dict = {0:'Irregularity Positive', 1:'Irregularity Negative'}

model = load_model('M:/healthBuddy/backend/covid-model/h5_saved_model')

def preprocess(img):

	img = np.array(img)
	# print(img.shape)

	if(img.ndim==3):
		gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	else:
		gray = img

	gray = gray/255
	resized = cv2.resize(gray, (100, 100))
	reshaped = resized.reshape(1, 100, 100)
	# print(reshaped.shape)
	return reshaped





app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict', methods=['POST'])
def predict():
		# print(request)

		# return 'return here'
		path = request.json.get("imagePath")
		print(path)
		image = Image.open(path)
		preprocessed_image = preprocess(image)
		prediction = model.predict(preprocessed_image)
		result = np.argmax(prediction, axis=1)[0]
		accuracy=float(np.max(prediction, axis=1)[0])
		label = label_dict[result]
		return jsonify({"prediction": label, "probability": math.floor(accuracy*100)})


@app.route('/disease-prediction', methods=['POST'])
def disease_prediction():

		model_path='O:/healthBuddy-testing/backend/covid-model/saved_disease_models/'
		model_name='gradient_boost'

		try:
			patient_symptoms = request.json.get("patient_symptoms")

			symptoms_dict={}
			# iterate over all_symptoms list, if a symptom is present in patient_symptoms, assign 1 otherwise assign 0.
			for symptom in all_symptoms_list:
				if symptom in patient_symptoms:
					symptoms_dict[symptom] = 1
				else:
					symptoms_dict[symptom] = 0
				
			# create dataframe from dictionary
			patient_symptoms_df = pandas.DataFrame(symptoms_dict, index=[0])

			# Load Trained Model
			classifier = load(str(model_path + model_name + ".joblib"))

			# get prediction
			result = classifier.predict(patient_symptoms_df)
			return jsonify({"result": result.tolist()})

		except Exception as e:
			print(e)


if __name__ == '__main__':
    app.run(debug=False, port=7000)