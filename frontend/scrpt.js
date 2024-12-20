const sendButton = document.getElementById('send');

// 전송 버튼 클릭 이벤트 리스너
sendButton.addEventListener('click', () => {
    const message = document.getElementById('message').value; // 입력된 메시지 값 가져오기
    fetch('http://localhost:5000/api/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }), // 메시지를 JSON 형식으로 변환하여 전송
    })
    .then(response => response.json())
    .then(data => alert('Message sent!')) // 성공 시 알림 표시
    .catch(error => console.error('Error:', error)); // 오류 처리
});