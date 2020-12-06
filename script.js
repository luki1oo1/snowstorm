const container = document.querySelector('.container');
const tabCol = ['#a7f9ff', '#3bb0c7', '#1badb6', '#00769a'];
const snowFlakes = [];
let sizeSnow = '';
let count = 0;

const fxRandom = (arg, arg2) => Math.random() * (arg2 - arg + 1) + arg;

const snowFlakesGenerator = (number) => {
    for (let i = 0; i < number; i++) {
        const size = Math.floor(fxRandom(0, 50));
        const originalX = Math.floor(fxRandom(0, window.innerWidth - size));
        snowFlakes.push({
            color: tabCol[Math.floor(fxRandom(0, 3))],
            sizeSnow: size,
            v: fxRandom(0, 1),
            y: 0,
            originalX,
            x: originalX
        });
    }

    snowFlakes.map(el => {
        const check = (randomNumber) => {
            if (snowFlakes.every(els => randomNumber + els.sizeSnow < els.x || randomNumber > els.x + els.sizeSnow)) {
                el.x = randomNumber;
                el.originalX = randomNumber;
            } else {
                check(Math.floor(fxRandom(0, window.innerWidth - el.sizeSnow)));
            }
        }
        check(el.x);
        return el;
    }).forEach((el, index) => {
        sizeSnow = Math.floor(fxRandom(0, 40));
        container.innerHTML += `
            <div 
                class="snow-flake"
                style="background-color: ${ el.color }; left: ${ el.x }px; top: ${ el.y }px; width: ${ el.sizeSnow }px; height: ${ el.sizeSnow }px;">
            </div>`;
    });
};

const snowFlakessActions = cb => document.querySelectorAll('.snow-flake').forEach((el , index) => cb(el , index));

const initBlizzard = e => {
    switch (e.code) {
        case  'ArrowUp': {
            let pushTopFrame;
            const pushTop = () => {
                snowFlakessActions((el, index) => snowFlakes[index].y -= snowFlakes[index].v);
                pushTopFrame = requestAnimationFrame(pushTop);
            };
            pushTopFrame = requestAnimationFrame(pushTop);
        }
        break;

        case 'ArrowDown': {
            let pushDownFrame;
            const pushDown = () => {
                snowFlakessActions((el, index) => snowFlakes[index].y += snowFlakes[index].v);
                pushDownFrame = requestAnimationFrame(pushDown);
            };
            pushDownFrame = requestAnimationFrame(pushDown);
        }
        break;

        case 'ArrowRight': {
            let pushRightFrame;
            const pushRight = () => {
                snowFlakessActions((el, index) => snowFlakes[index].x += snowFlakes[index].v);
                pushRightFrame = requestAnimationFrame(pushRight);
            };
            pushRightFrame = requestAnimationFrame(pushRight);
        }
        break;
        case 'ArrowLeft': {
            let pushLeftFrame;
            const pushLeft = () => {
                snowFlakessActions((el, index) => snowFlakes[index].x -= snowFlakes[index].v);
                pushLeftFrame = requestAnimationFrame(pushLeft);
            };
            pushLeftFrame = requestAnimationFrame(pushLeft);
        }
        break;
        case 'Space': {
            let pushSideFrame;
            const pushSide = () => {
                document.querySelectorAll('.snow-flake').forEach((el , index) => {
                    if (snowFlakes[index].y > container.offsetHeight) {
                        snowFlakes[index].y = 0;
                    }
                    snowFlakes[index].y += snowFlakes[index].v;
                    if (count % 3 === 0) {
                        snowFlakes[index].y += snowFlakes[index].v;
                    } else if (count % 2 === 0) {
                        snowFlakes[index].x += snowFlakes[index].v;
                    } else {
                        snowFlakes[index].x -= snowFlakes[index].v;
                    }
                    el.style.transform = `translate(${snowFlakes[index].x}px , ${snowFlakes[index].y}px`;
                });
                pushSideFrame = requestAnimationFrame(pushSide);
            };
            pushSideFrame = requestAnimationFrame(pushSide);
            count++;
        }
    }
};

document.addEventListener('keyup', initBlizzard);
snowFlakesGenerator(30);
const update = () => {
    snowFlakessActions((el, index) => {
        if (snowFlakes[index].y > container.offsetHeight) {
            snowFlakes[index].y = 0;
            snowFlakes[index].x = snowFlakes[index].originalX;
        }
        snowFlakes[index].y += snowFlakes[index].v;
        el.style.transform = `translate(${snowFlakes[index].x}px, ${snowFlakes[index].y}px)`;
    });
    requestAnimationFrame(update);
};
requestAnimationFrame(update);

// jak index jest parzysty to w lewo jak jest niearzysty a jak index jest wielokorotnoasica liczby 3 to platki spadaja w dol
// refacotr
// przechwycic strzalki i zrobi to co mowilem
