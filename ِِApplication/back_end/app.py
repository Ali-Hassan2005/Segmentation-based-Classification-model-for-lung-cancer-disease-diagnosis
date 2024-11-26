from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
import cv2   
import numpy as np
from keras.models import load_model 
import segmentation_models as sm
from seg_req import UsedLossFunction
from flask_cors import CORS
from keras import backend as K
import gc

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

resent_preprocessing = sm.get_preprocessing('resnet34')

K.clear_session()
gc.collect()

def seg_preprocess(image):
    image = cv2.resize(image, (256, 256))
    image = image / 255.0
    image = resent_preprocessing(image)
    image = np.array(image).astype("float32")
    return image

def GenerateMask(processed_img, model):
    batch_processed_img = np.expand_dims(processed_img, axis=0)
    batch_predicted_msk = model.predict(batch_processed_img)
    batch_predicted_msk = np.argmax(batch_predicted_msk, axis=-1)
    predicted_msk = np.squeeze(batch_predicted_msk, axis=0)
    msk = (predicted_msk * 255 / np.max(predicted_msk)).astype(np.uint8)
    return msk

def calc_black_pct(mask):
    return (np.sum(mask == 0) / (mask.shape[0] * mask.shape[1]) ) * 100

def Checker(mask):
    if calc_black_pct(mask) >= 70.0:
        return True
    return False

def combine_img_msk(img, msk):
    resized_image = cv2.resize(img, (256, 256))
    gray_image = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY).astype(np.uint8)
    masked_image = cv2.bitwise_and(gray_image, gray_image, mask=msk)
    return masked_image

def GetResult(Mimg, ClassifyModel):
    Mimg = np.expand_dims(Mimg, axis=0)
    diagnose = ["Positive", "Malignant", "Negative" ]
    idx = np.argmax(ClassifyModel.predict(Mimg)[0])
    return diagnose[idx]

def getModels(sm_pth, cm_pth):
    loss_func = UsedLossFunction()
    SM = load_model(sm_pth, custom_objects={'iou_score': sm.metrics.IOUScore(), 'f1-score': sm.metrics.FScore(),'loss': loss_func})
    CM = load_model(cm_pth)
    return SM, CM

def pipeline(img_path, segModel, ClassifyModel):
    img = cv2.imread(img_path)
    SPimg = seg_preprocess(img)
    mask = GenerateMask(SPimg, segModel)
    if Checker(mask):
        Mimg = combine_img_msk(img, mask)
        pred = GetResult(Mimg, ClassifyModel)
        return pred
    return "CT image probably doesn't contain the lung organ.check it again"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_ct(image_path):
    SM, CM = getModels('UNet.h5', 'CNN.h5')
    pred = pipeline(image_path, SM, CM)
    return pred

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'ct-image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['ct-image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        result = analyze_ct(filepath)
        
        return jsonify({"result": result}), 200
    
    return jsonify({"error": "File type not allowed"}), 400

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    app.run(port=3000, debug=True)
