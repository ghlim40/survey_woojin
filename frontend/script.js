const sendButton = document.getElementById('send');
const processButton = document.getElementById('process');
const csvFileInput = document.getElementById('csvFile');
const resultTableBody = document.getElementById('resultTable').querySelector('tbody');

// 메시지 전송 버튼 클릭 이벤트 리스너
sendButton.addEventListener('click', () => {
    const message = document.getElementById('message').value; // 입력된 메시지 값 가져오기
    const selectedUsers = [];

    // 선택된 사용자 데이터 수집
    const rows = resultTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            const user = {
                Name: row.cells[1].textContent,
                Position: row.cells[2].textContent,
                Department: row.cells[3].textContent,
                Team: row.cells[4].textContent,
                Phone: row.cells[5].textContent
            };
            selectedUsers.push(user);
        }
    });

    if (selectedUsers.length === 0) {
        alert('Please select at least one user.');
        return;
    }

    fetch('http://localhost:5000/api/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, users: selectedUsers }), // 메시지와 선택된 사용자 데이터 전송
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Messages sent successfully!');
            console.log('Response:', data);
        }
    })
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
