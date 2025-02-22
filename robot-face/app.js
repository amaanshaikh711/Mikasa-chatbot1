async function sendMessage() {
    const input = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');
    
    if (!input.value.trim()) {
      alert("Please type a message first!");
      return;
    }
  
    const userMessage = input.value;
    input.value = '';
    
    // Add user message
    messagesDiv.innerHTML += `
      <div class="message user-message">
        ${userMessage}
      </div>
    `;
  
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        messagesDiv.innerHTML += `
          <div class="message bot-message">
            ${data.response}
          </div>
        `;
      } else {
        messagesDiv.innerHTML += `
          <div class="message bot-message error">
            ⚠️ System Error: ${data.response}
          </div>
        `;
      }
      
    } catch (error) {
      console.error('Fetch Error:', error);
      messagesDiv.innerHTML += `
        <div class="message bot-message error">
          ⚠️ Connection Failed: ${error.message}
        </div>
      `;
    }
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }