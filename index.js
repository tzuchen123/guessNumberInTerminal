const readline = require('readline');

function sortArray(array) {
    return array.sort(function(a, b) {
        return a - b;
    });
}

function createAnswer() {
    const answerArray = [];
    while (answerArray.length < 4) {
        let randomNumber = Math.floor(Math.random() * 10);
        if (answerArray.indexOf(randomNumber) === -1) {
            answerArray.push(randomNumber);
        }
    }

    return sortArray(answerArray);
}

function hasDuplicateDigits(input) {
    const digitSet = new Set();
    for (let digit of input) {
        if (digitSet.has(digit)) {
            return true;
        }
        digitSet.add(digit);
    }
    return false;
}

function playGame() {
    const answerArray = createAnswer();
    let answerMap = new Map();
    answerArray.forEach((element, index) => {
        answerMap.set(element, index);
    });

    let times = 0;

    console.log('開始猜數字囉！');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askForGuess() {
        rl.question('請輸入4位數字：', (input) => {
            //input to array and sort
            input = input.split('');
            input = input.map((element) => parseInt(element));   
            input = sortArray(input); 
            times++;

            if (input.length !== 4) {
                console.log('輸入的數字長度不符合要求，目前次數：', times);
                askForGuess(); // 继续询问用户输入
            } else if (hasDuplicateDigits(input)) {
                console.log('輸入的數字包含重複的數字，目前次數：', times);
                askForGuess(); // 继续询问用户输入
            }else if (JSON.stringify(input) !== JSON.stringify(answerArray)) {
                let A = 0;
                let B = 0;
                input.forEach((element, index) => {
                    if (answerMap.has(element)) {
                        if (answerMap.get(element) === index) {
                            A++;
                        } else {
                            B++;
                        }
                    }
                });
                console.log('猜錯了，結果是：', A, 'A', B, 'B，目前次數：', times);
                askForGuess(); // 继续询问用户输入
            } else {
                console.log('猜對了，正確數字:',input.join(''), '，總共猜了', times, '次');
                rl.close();
            }
        });
    }




    askForGuess(); // 开始询问用户输入
}

playGame();
