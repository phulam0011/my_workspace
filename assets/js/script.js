        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        const chatbox = document.getElementById('chatbotbox');

        const body = document.querySelector('body');
        const btn = document.querySelector('.btnmode');
        const icon = document.querySelector('.btnmode__icon');

        function addMessage(content, isUser) {
            const messageContainer = document.createElement('div');
            messageContainer.className = isUser ? 'row app-content__msg' : 'row app-content__msg app-content__msgbot';

            const messageContent = document.createElement('div');
            messageContent.className = 'col-md-11 app_content__qa';
            messageContent.innerHTML = `<p>${content}</p>`;

            const messageIcon = document.createElement('div');
            messageIcon.className = 'col-md-1 app-content__icon';
            const iconImage = document.createElement('img');
            iconImage.src = isUser ? 'https://cdn2.iconfinder.com/data/icons/woman-man-avatar/62/Person13-512.png' : 'https://th.bing.com/th/id/OIP.qCCLO4Fp0ekUuvkvEmLsrQHaHa?pid=ImgDet&rs=1';
            messageIcon.appendChild(iconImage);
            
            messageContainer.appendChild(messageContent);
            messageContainer.appendChild(messageIcon);

            chatbox.appendChild(messageContainer);
        }

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message !== '') {
                addMessage(message, true);

                fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                })
                .then(response => response.json())
                .then(data => {
                    const botReply = data.reply;
                    addMessage(botReply, false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                messageInput.value = '';
            }
        }

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                sendMessage();
            }
        });



//to save the dark mode use the object "local storage".

//function that stores the value true if the dark mode is activated or false if it's not.
function store(value){
    localStorage.setItem('darkmode', value);
  }
  
  //function that indicates if the "darkmode" property exists. It loads the page as we had left it.
  function load(){
    const darkmode = localStorage.getItem('darkmode');
  
    //if the dark mode was never activated
    if(!darkmode){
      store(false);
      icon.classList.add('fa-sun');
    } else if( darkmode == 'true'){ //if the dark mode is activated
      body.classList.add('darkmode');
      icon.classList.add('fa-moon');
    } else if(darkmode == 'false'){ //if the dark mode exists but is disabled
      icon.classList.add('fa-sun');
    }
  }
  
  
  load();
  
  btn.addEventListener('click', () => {
  
    body.classList.toggle('darkmode');
    icon.classList.add('animated');
  
    //save true or false
    store(body.classList.contains('darkmode'));
  
    if(body.classList.contains('darkmode')){
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }else{
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  
    setTimeout( () => {
      icon.classList.remove('animated');
    }, 500)
  })