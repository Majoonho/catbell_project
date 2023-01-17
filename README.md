![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&text=Welcome!%20&fontSize=60&fontAlignY=40&desc=I'm%20joonho)
# starbucks_home_project
![image](https://user-images.githubusercontent.com/103080228/211338974-41fddb48-bdbb-45a0-9f66-70c0d1a7da6c.png)
<br><br>
<br><br>

## Lodash
Lodash (https://lodash.com/) - 다양한 유틸리티 기능을 제공하는 자바스크립트 라이브러리<br>
[Lodash API](https://lodash.com/docs/4.17.15) <br>
[Lodash throttle](https://lodash.com/docs/4.17.15#throttle)
가장 일반적으로 많이 사용하는 것은 제일 위에 있는 것입니다.<br>
copy script code('</>') 를 클릭해서 html에 붙여넣기해서 사용하면 됩니다.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js" integrity="sha512-90vH1Z83AJY9DmlWa8WkjkV79yfS2n2Oxhsi2dZbIv0nC4E6m5AbH8Nh156kkM7JePmqD6tcZsfad1ueoaovww==" crossorigin="anonymous"></script>
```


![image](https://user-images.githubusercontent.com/103080228/209610183-3cf66742-aa2c-4b79-b56f-46da924e7b78.png)

```js
const badgeEl = document.querySelector("header .badges");
window.addEventListener('scroll', _.throttle(function () {console.log('scroll!');}
, 300));
```

_.throttle(함수, 시간) 을 사용하면 정해준 시간만큼 실행되는 것에 부하를 준다.
<br><br>
<br><br>

## GSAP & ScrollToPlugin

  - GSAP(The GreenSock Animation Platform)(https://greensock.com/gsap/) - 자바스크립트로 제어하는 타임라인 기반의 애니메이션 라이브러리.
[ScrollToPlugin](https://greensock.com/scrolltoplugin/)은 스크롤 애니메이션을 지원하는 GSAP 플러그인.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js" integrity="sha512-f8mwTB+Bs8a5c46DEm7HQLcJuHMBaH/UFlcgyetMqqkvTcYg4g5VXsYR71b3qC82lZytjNYvBj2pf0VekA9/FQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

[.to() 사용법](https://greensock.com/docs/v3/GSAP/gsap.to())
[GSAP Easing](https://greensock.com/docs/v2/Easing)

```js

const badgeEl = document.querySelector('header .badges');
console.log(badgeEl)

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
  //배지 숨기기
  // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity:0
    });
  } else {
  //배지 보이기
  gsap.to(badgeEl, .6, {
    opacity: 1})
  };
  }, 300));
```

![image](https://user-images.githubusercontent.com/103080228/209625175-4f480e42-4982-444e-9776-ff4eefe7c351.png)

위에 표시된 부분이 사라졌다가 나타나는 효과를 낼 수 있다.


  - GSAP을 이용한 순차적으로 사라지는 그림.

```js
// section 스타벅스 그림 순차적으로 나타내기

const fadeEls = document.querySelectorAll('.visual .fade-in');
console.log(fadeEls)
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .6, //0.7 1.4 2.1 2.7 초후에 나오게 됨.
    opacity: 1
  });
});
```
<br><br>
<br><br>

## SWIPER 
  - Swiper는 하드웨어 가속 전환과 여러 기본 동작을 갖춘 현대적인 슬라이드 라이브러리. (여기서는 슬라이드 기능사용)
  - 6.버전은 class 를 swiper-container 로 명시하지만 이후 버전에서는 swier 만 명시.
  - https://swiperjs.com/get-started
<br><br>
<br><br>
## ScrollMagic
  - 스타벅스 홈페이지 아래 SEASON PRODUCT/RESERVE COFFEE/PICK YOUR FAVORITE/FIND THE STORE 에 적용.
  - 양 옆으로 사라지는 효과를 줄 수 있음.
  
```js
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});
```

![image](https://user-images.githubusercontent.com/103080228/211337904-76efd761-c2de-4c99-bb3a-30b10c510192.png)

