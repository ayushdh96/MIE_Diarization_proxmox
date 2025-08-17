# Use a multi-stage build for frontend and backend

# Stage 1: Frontend build with Node
FROM node:20-slim as frontend

WORKDIR /app/diarization-ui

RUN ls -la
COPY diarization-ui/package*.json ./
RUN npm install --legacy-peer-deps
RUN ls -la
COPY diarization-ui/. .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage 2: Backend with Python
FROM python:3.11-slim as backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    ffmpeg \
    build-essential \
    cmake \
    libsndfile1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY whisper-diarization/requirements.txt whisper-diarization/constraints.txt ./
RUN pip install --upgrade pip && \
    pip install -c constraints.txt -r requirements.txt

COPY whisper-diarization/. /app/whisper-diarization
WORKDIR /app/whisper-diarization

EXPOSE 5001
CMD ["python", "app.py"]