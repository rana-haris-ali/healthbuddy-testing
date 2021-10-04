from flask import Flask, jsonify,request
from flask_cors import CORS
import sys
import cv2
import numpy as np
import base64
from PIL import Image
from io import BytesIO
import re
from tensorflow.keras.models import load_model
from keras.models import Sequential, Model
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, Activation, MaxPooling2D
from keras.utils import normalize
from keras.layers import Concatenate
from keras import Input
import tensorflow as tf
import math
import json
import argparse



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

if __name__ == '__main__':
    app.run(debug=False, port=7000)