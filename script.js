$(document).ready(function () {
  // 여기다가 코드를 작성하세요
  console.log("Ready");
});

$(document).ready(function () {
  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  setInterval(function () {
    $(".ellipse").css("background-color", getRandomColor());
  }, 1000);
});

class TextScramble {
  constructor($el) {
    this.$el = $el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
  }

  setText(newText) {
    const oldText = this.$el.text();
    const length = Math.max(oldText.length, newText.length);
    const promise = $.Deferred(); // jQuery's deferred promise
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    this.frame = 0;
    this.update();
    this.resolve = promise.resolve;
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.$el.html(output);

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

$(document).ready(function () {
  const phrases = [
    "When you realize you’re dreaming,",
    "you want to wake up.",
    "But the moment you accept the dream as reality,",
    "it becomes your reality.",
    "The dream is real.",
  ];

  const $el = $(".text-wrapper");
  const fx = new TextScramble($el);

  let counter = 0;

  function next() {
    fx.setText(phrases[counter]).then(function () {
      counter = (counter + 1) % phrases.length;
      setTimeout(next, 800); // 다음 문장으로 넘어가기 전에 잠시 대기
    });
  }

  next();
});

$(document).ready(function () {
  let isDragging = false;
  const $image = $(".group"); // Top.png 이미지 선택

  // 이미지의 중앙 위치를 기준으로 기울기 적용
  const imageCenterX = $image.offset().left + $image.width() / 2;

  // 마우스 클릭 시 드래그 활성화
  $image.mousedown(function (e) {
    e.preventDefault();
    isDragging = true;
  });

  // 마우스 버튼을 놓으면 드래그 비활성화
  $(document).mouseup(function () {
    isDragging = false;
  });

  // 마우스가 움직일 때마다 x축 기울기만 변경
  $(document).mousemove(function (e) {
    if (isDragging) {
      const mouseX = e.pageX;

      // 이미지 중앙을 기준으로 마우스 위치에 따라 -30도 ~ +30도로 기울기 설정
      let tilt = ((mouseX - imageCenterX) / $(window).width()) * 60;

      // 기울기를 -30도 ~ 30도 사이로 제한
      tilt = Math.min(Math.max(tilt, -30), 30);

      // x축 기울기 적용
      $image.css({
        transform: `rotate(${tilt}deg)`,
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const phrases = ["dream", "a little", "bigger", "darling"];
  const textWrappers = [
    document.querySelector(".dream-wrapper .text-wrapper-3"), // dream
    document.querySelector(".div-wrapper-2 .text-wrapper-3"), // a little
    document.querySelector(".text-wrapper-2"), // bigger
    document.querySelector(".div-wrapper-3 .text-wrapper-3"), // daring
  ];

  let currentIndex = 0;

  function showNextPhrase() {
    if (currentIndex < phrases.length) {
      textWrappers[currentIndex].textContent = phrases[currentIndex];
      textWrappers[currentIndex].style.opacity = 1; // 글자가 보이게 함
      textWrappers[currentIndex].classList.add("text-background"); // 배경 색상 추가
      currentIndex++;
      setTimeout(showNextPhrase, 3000); // 2초 후에 다음 문장을 표시
    }
  }

  // 처음에 모든 요소를 숨깁니다.
  textWrappers.forEach((wrapper) => {
    wrapper.style.opacity = 0;
  });

  // 첫 번째 문장을 표시하기 시작합니다.
  showNextPhrase();
});
