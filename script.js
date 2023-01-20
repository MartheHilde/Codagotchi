const micBtn = document.getElementById('microphone');
const panelsData = document.getElementById('panels-data');
const transcript = document.getElementById('transcript');
//Get screen element
const screen = document.getElementById('screen');

//Add speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

const commands = ['eat', 'sleep', 'dance'];

//Listen for click event
function onStartListening() {
    recognition.start();
    panelsData.classList.add('talking');
}

function onResult(event) {
    panelsData.classList.remove('talking');

    const text = event.results[0][0].transcript;

    transcript.innerText = `You said: ${text}`;

    //Look at commands I am allowed to say
    const action = commands.find(function (command) {
        //Does command match text?
        return text.toLowerCase().includes(command)
    });
    //Look at the text that was generated from the speech recognition
    //Check if the text matches an allowable command
    if (action) {
        screen.classList.add(`codigotchi-screen_${action}`);
    } else {
        transcript.textContent += ' - Invalid command'
    }

    setTimeout(function () {
        screen.classList.remove(`codigotchi-screen_${action}`);
        transcript.innerText = '';
    }, 3000)

    //If it does, do some CSS.
    //If not, let me know.

}

micBtn.addEventListener('click', onStartListening);
recognition.addEventListener('result', onResult);