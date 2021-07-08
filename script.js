// Todo: Use Cookie to save data.
// Forked from here: https://mdn.github.io/web-speech-api/speak-easy-synthesis/

var synth = window.speechSynthesis;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var voiceSelect = document.querySelector("select");

var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector(".pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");

var phoneticAlphabetObject = [
  {
    character: "a",
    value: "Alfa",
  },
  {
    character: "b",
    value: "Bravo",
  },
  {
    character: "c",
    value: "Charlie",
  },
  {
    character: "d",
    value: "Delta",
  },
  {
    character: "e",
    value: "Echo",
  },
  {
    character: "f",
    value: "Foxtrot",
  },
  {
    character: "g",
    value: "Golf",
  },
  {
    character: "h",
    value: "Hotel",
  },
  {
    character: "i",
    value: "India",
  },
  {
    character: "j",
    value: "Juliett",
  },
  {
    character: "k",
    value: "Kilo",
  },
  {
    character: "l",
    value: "Lima",
  },
  {
    character: "m",
    value: "Mike",
  },
  {
    character: "n",
    value: "November",
  },
  {
    character: "o",
    value: "Oscar",
  },
  {
    character: "p",
    value: "Papa",
  },
  {
    character: "q",
    value: "Quebec",
  },
  {
    character: "r",
    value: "Romeo",
  },
  {
    character: "s",
    value: "Sierra",
  },
  {
    character: "t",
    value: "Tango",
  },
  {
    character: "u",
    value: "Uniform",
  },
  {
    character: "v",
    value: "Victor",
  },
  {
    character: "w",
    value: "Whiskey",
  },
  {
    character: "x",
    value: "Xray",
  },
  {
    character: "y",
    value: "Yankee",
  },
  {
    character: "z",
    value: "Zulu",
  },
  {
    character: "0",
    value: "Zero",
  },
  {
    character: "1",
    value: "1",
  },
  {
    character: "2",
    value: "2",
  },
  {
    character: "3",
    value: "3",
  },
  {
    character: "4",
    value: "4",
  },
  {
    character: "4",
    value: "5",
  },
  {
    character: "6",
    value: "6",
  },
  {
    character: "7",
    value: "7",
  },
  {
    character: "8",
    value: "8",
  },
  {
    character: "9",
    value: "9",
  },
  {
    character: "10",
    value: "10",
  },
  {
    character: " ",
    value: " ",
  },
];

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname == bname) return 0;
    else return +1;
  });
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  let phoneticAlphabet;

  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  if (inputTxt.value !== "") {
    let textInputAsanArrayofLetters = inputTxt.value.split("");
    //Added this line here to split word into alphabets..

    textInputAsanArrayofLetters.forEach((letter) => {
      for (i = 0; i < phoneticAlphabetObject.length; i++) {
        if (phoneticAlphabetObject[i].character === letter.toLowerCase()) {
          phoneticAlphabet = phoneticAlphabetObject[i].value;
          // console.log(phoneticAlphabet, phoneticAlphabetObject[i].value);
        }
      }
      //letter is key..
      var utterThis = new SpeechSynthesisUtterance(phoneticAlphabet);

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
      };
      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };
      var selectedOption =
        voiceSelect.selectedOptions[0].getAttribute("data-name");
      for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
          break;
        }
      }
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      synth.speak(utterThis);
    });
    // var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  }
}

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = function () {
  speak();
};
