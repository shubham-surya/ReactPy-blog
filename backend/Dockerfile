FROM python:3.9-slim

COPY . /app

COPY Pipfile ./Pipfile

WORKDIR /app

RUN pip install -r ./requirements.txt

EXPOSE 5000

CMD ["python", "./app.py"]