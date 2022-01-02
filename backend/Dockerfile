FROM python:3.9-slim

COPY . /pyapp

COPY Pipfile ./Pipfile

WORKDIR /pyapp

RUN pip install -r ./requirements.txt

EXPOSE 5000

CMD ["python", "./app.py"]