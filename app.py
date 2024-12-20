from flask import Flask, send_from_directory, request, jsonify
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

@app.route('/api/send_message', methods=['POST'])
def send_message():
    # 선택된 사용자와 메시지를 처리하는 API
    data = request.json
    message = data.get('message')
    selected_users = data.get('users')

    if not message or not selected_users:
        return jsonify({"error": "Message or users data is missing."}), 400

    # 가상 메시지 전송 로직 (추후 실제 API 연동 가능)
    responses = []
    for user in selected_users:
        responses.append({
            "name": user.get("Name"),
            "phone": user.get("Phone"),
            "status": "Sent"
        })

    return jsonify({
        "message": "Messages sent successfully.",
        "details": responses
    }), 200

if __name__ == '__main__':
    # Flask 서버 실행
    app.run(debug=True)