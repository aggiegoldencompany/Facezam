from starlette.applications import Starlette
from starlette.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware
import uvicorn, aiohttp, asyncio
from io import BytesIO
from keras.preprocessing import image
import matplotlib
import matplotlib.pyplot as plt
#import cv2
from keras.models import model_from_json

classes = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_headers=['X-Requested-With', 'Content-Type'])
app.mount('/static', StaticFiles(directory='app/static'))

#async def setup_learner():
#    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
#    model = model_from_json(open("facial_expression_model_structure.json", "r").read())
#    model.load_weights('facial_expression_model_weights.h5')  # load weights



loop = asyncio.get_event_loop()
#tasks = [asyncio.ensure_future(setup_learner())]
#learn = loop.run_until_complete(asyncio.gather(*tasks))[0]
#loop.close()

@app.route('/')
def index(request):
    html = path/'index.html'
    return HTMLResponse(html.open().read())

#@app.route('/analyze', methods=['POST'])
#async def analyze(request):
#    data = await request.form()
#    img_bytes = await (data['file'].read())
#    img = cv2.imread(data['file'])
#    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#
#   faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # print(faces) #locations of detected faces
#    count = 0

#    for (x, y, w, h) in faces:
#        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)  # draw rectangle to main image

#        detected_face = img[int(y):int(y + h), int(x):int(x + w)]  # crop detected face
#        detected_face = cv2.cvtColor(detected_face, cv2.COLOR_BGR2GRAY)  # transform to gray scale
#        detected_face = cv2.resize(detected_face, (48, 48))  # resize to 48x48
#
#        img_pixels = image.img_to_array(detected_face)
#        img_pixels = np.expand_dims(img_pixels, axis=0)


#        img_pixels /= 255  # pixels are in scale of [0, 255]. normalize all pixels in scale of [0, 1]
#        predictions = model.predict(img_pixels)  # store probabilities of 7 expressions
#       break;
#    img = open_image(BytesIO(img_bytes))
#    prediction = learn.predict(img)[0]
#    return JSONResponse({'result': str(predictions)})


if __name__ == '__main__':
    if 'serve' in sys.argv: uvicorn.run(app=app, host='0.0.0.0', port=5042)
