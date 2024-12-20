# Description: Flask 애플리케이션 메인 파일.

from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    # 홈 페이지 엔드포인트
    return send_from_directory("frontend", "index.html") 

if __name__ == '__main__':
    # Flask 서버 실행
    app.run(debug=True)
