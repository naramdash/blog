---
public: true
category: "Post"
date: "2021-12-16T21:20:00+09:00"
title: "Javascript에서 Email 검증하기"
description: "웹 브라우저에서 이메일 주소 쉽게 검증하는 법(한번에 이해 가능)"
primaryImage:
  source: ../../images/javascript.jpg
  alt: "javascript"
tags:
  - "Javascript"
  - "Email"
  - "Validation"
  - "No Dependency"
---

일단 node.js에서 사용하려는 분께 심심한 사과의 말씀을 드려야겠다. 거기서는 안된다...

사실 인터넷에 `javascript validate email` 찾아보면 수두룩 빽빽하게 나온다. 다만, 그게 실제 내가 이해하고 쓰는 코드인지 아닌지 모를 기괴한 정규식을 사용한 검증일 뿐이다.

또한, input element에 `type="email"`로 속성을 지정하면, form submit 이벤트에서 알아서 막아준다. 이래서 표준을 지켜야한다.

하지만, 그럼에도 아직도 이메일 검증 코드를 찾고 계신 분이라면, 정규식도, input element도 쓰지 못하는 상황일 것이라고 생각한다. 나도 파일 input으로 입력되는 csv 안의 이메일 주소를 검증하기 위해서 고민하고 있었다. npm 패키지를 깔을까 생각도 했지만, 이메일 체크하자고 디펜던시를 추가하자니 또 마음이 심란해져서 방법을 생각하고 있었던 것이다.

결국에 작성한 것이 아래 코드이다.

```javascript
function validateEmail(email) {
  const input = document.createElement("input")
  input.setAttribute("type", "email")
  input.value = email
  return input.checkValidity()
}
```

_이 코드에는 정규식도, 패키지도 없다_. 그리고 이해하기 쉽다.

독자 여러분도 금방 이 코드를 어떻게 개선할 수 있을지 여러가지 방법들이 생각날 것이다. 하지만 중요한 것은, **우리가 납득할 수 있는 방법을 찾았다**는 것이다.

[MDN | HTMLInputElement.checkValidity()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity)에 따르면, 매우 고대의 브라우저라도 이 방법이 가능하다. 아직까지 IE9을 지원해야한다면... 이제는 요구사항을 바꿔야할 때이다.
