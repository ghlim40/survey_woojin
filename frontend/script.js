const sendButton = document.getElementById('send');
const processButton = document.getElementById('process');
const csvFileInput = document.getElementById('csvFile');
const resultTableBody = document.getElementById('resultTable').querySelector('tbody');

// 메시지 전송 버튼 클릭 이벤트 리스너
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

// CSV 처리 버튼 클릭 이벤트 리스너
processButton.addEventListener('click', () => {
    const file = csvFileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        const data = rows.slice(1).filter(row => row.trim() !== '').map(row => {
            const values = row.split(',');
            return headers.reduce((acc, header, index) => {
                acc[header.trim()] = values[index]?.trim();
                return acc;
            }, {});
        });

        // 테이블에 데이터 추가
        resultTableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');

            // 선택 박스 추가
            const tdSelect = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            tdSelect.appendChild(checkbox);
            tr.appendChild(tdSelect);

            // 나머지 데이터 추가
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });

            resultTableBody.appendChild(tr);
        });
    };

    reader.readAsText(file);
});
