FROM python:3.7

RUN apt-get update && apt-get install -y git python3-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

COPY facial_expression_model_structure.json .

COPY facial_expression_model_weights.h5 .

COPY haarcascade_frontalface_default.xml .

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt --upgrade

COPY app app/

COPY facial_expression_model_structure.json app/facial_expression_model_structure.json

COPY facial_expression_model_weights.h5 app/facial_expression_model_weights.h5

COPY haarcascade_frontalface_default.xml app/haarcascade_frontalface_default.xml

RUN python app/server.py

EXPOSE 5042

CMD ["python", "app/server.py", "serve"]