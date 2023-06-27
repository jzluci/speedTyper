const paragraphs = [
    "red orange yellow green blue purple pink brown gray black white color shade hue rainbow sunlight moonlight starlight twilight darkness light bright dim pale vibrant dull shiny glossy matte smooth rough soft hard wet dry hot cold warm cool freezing boiling melting evaporating condensing solid liquid gas oxygen nitrogen carbon hydrogen helium neon argon krypton xenon radon water steam ice fire earth air wind sand rock soil clay mud grassland desert forest jungle mountain valley ocean river lake waterfall glacier volcano canyon cave island continent country city village suburb",
    "tree plant flower grass moss fern bamboo cactus succulent shrub vine bush palm oak maple birch willow pine spruce cedar poplar apple pear cherry orange lemon lime grapefruit banana strawberry raspberry blueberry blackberry watermelon pineapple mango papaya kiwi peach plum avocado coconut olive tomato cucumber potato carrot lettuce broccoli cauliflower spinach kale cabbage onion garlic ginger mushroom radish pumpkin squash eggplant pepper asparagus corn bean pea lentil rice wheat oats barley rye quinoa millet couscous buckwheat",
    "sun moon star sky cloud rain thunderstorm lightning snow hail wind tornado hurricane fog mist sunrise sunset twilight dawn dusk noon midnight morning evening afternoon night day week month year century decade millennium January February March April May June July August September October November December Monday Tuesday Wednesday Thursday Friday Saturday Sunday yesterday today tomorrow now later soon never always sometimes rarely often occasionally frequently seldom rarely occasionally never rarely sometimes always often usually rarely",
    "love hate joy sorrow anger fear happiness sadness excitement surprise disgust boredom passion desire peace war victory defeat success failure hope despair courage fearlessness strength weakness power knowledge wisdom curiosity creativity imagination intuition logic reason truth falsehood beauty ugliness kindness cruelty honesty deceit generosity greed empathy apathy sympathy compassion patience impatience tolerance intolerance forgiveness revenge gratitude envy contentment satisfaction frustration confusion clarity doubt certainty uncertainty possibility impossibility freedom imprisonment justice injustice equality inequality",
    "red orange yellow green blue purple pink brown gray black white color shade hue rainbow sunlight moonlight starlight twilight darkness light bright dim pale vibrant dull shiny glossy matte smooth rough soft hard wet dry hot cold warm cool freezing boiling melting evaporating condensing solid liquid gas oxygen nitrogen carbon hydrogen helium neon argon krypton xenon radon water steam ice fire earth air wind sand rock soil clay mud grassland desert forest jungle mountain valley ocean river lake waterfall glacier volcano canyon cave island continent country city village suburb",
    
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);