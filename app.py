from flask import Flask, send_from_directory
from dotenv import load_dotenv
import os

# 환경 변수 로드
load_dotenv()

app = Flask(__name__, static_folder="frontend", static_url_path="")

@app.route('/')

def serve_frontend():
    # 프론트엔드의 index.html 제공
    return send_from_directory("frontend", "index.html")

@app.route('/<path:path>')
def serve_static_files(path):
    # 프론트엔드의 정적 파일 제공
    return send_from_directory("frontend", path)

if __name__ == '__main__':
    # Flask 서버 실행
    app.run(debug=True)