---
public: true
category: "Post"
date: "2021-08-08T01:23:00+09:00"
title: "가장 쉽게 배우는 하스켈 책과 하스켈에 대한 후기"
description: "가장 추천되는 하스켈 입문용 책인 Learn you a Haskell과 Haskell 언어에 대한 나의 생각 정리"
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "Book Review"
tags:
  - "Book Review"
  - "Language Review"
  - "Functional Programming"
  - "Monad"
  - "Learn You a Haskell"
---

```toc

```

![책 표지](https://bookthumb-phinf.pstatic.net/cover/074/362/07436299.jpg?udate=20200424)

[Learn You a Haskell for Great Good!](http://learnyouahaskell.com/)

[가장 쉽게 배우는 하스켈 책](https://book.naver.com/bookdb/book_detail.nhn?bid=7436299)

## Haskell에 관심을 갖게 된 이유

필자는 아싸이다. 그래서인지 굉장히 사람들이 하지 않는 것을 하는 것을 좋아했다. 예를 들자면 함수형 프로그래밍 같은 것을 말이다. 그렇게 함수용 프로그래밍에 관심을 가지다 보니 엔하위키 등을 통해서 알게 된 F#이라는 게 있었고, F#은 마이크로소프트에서 나온 언어로서 내 관심을 끌게 되었다. 하지만 그 당시에는 함수형 프로그래밍에 대한 정보는 굉장히 부족했다. 물론 그렇게 관심을 가졌다 하더라도 관심 대상에 대해서 공부를 하는 성격은 아니었으므로 정보를 찾아보고 나는 이런 언어도 알고있다는 허영심을 가지는 편에 불과했다.

그렇게 나는 군대를 가게 되었고 군대 안에서도 무언가 배워보겠다는, 약간 설날에 공부를 하겠다는 그런 것과 비슷한 느낌으로 군대 안에서도 책을 열심히 읽었다. 그 중에 하나가 가장 보편적으로 추천되는 [스칼라로 배우는 함수형 프로그래밍](https://book.naver.com/bookdb/book_detail.nhn?bid=8829454) 책이다. 하지만 그 빨간 책만으로는 스칼라의 아름다운 문법을 이해할 수 없었기 때문에 결국 [Programming in Scala](https://book.naver.com/bookdb/book_detail.nhn?bid=17758453) 책을 별도로 사게 되었고, 그 책을 전역하고 나서 일 년 동안 열심히 읽다가 결국 어디에서도 활용되지 못한 지식이었기 때문에 기억에서 사라져 갔다.

2~3년에 걸쳐서 함수형 프로그래밍에 대해서 열심히 웹 서핑을 하다 보니 하스켈이라는 언어에 대해서 알게 되었다. 하스켈은 스칼라 지원하는 함수형 프로그래밍 수준을 뛰어 넘어서, 굉장히 극단적으로 지원함으로 유명했다. 그래서 쓰는 사람도 매우 적었고, 그것을 상업에서 사용하는 회사도 굉장히 적었다. 그런 점이 또 아싸의 눈길을 끌게 된다. 그런 것에 환장하는 필자로서, 하지 않을 수가 없었다

한창 프로그래밍을 하지 않다가 다시 프로그래밍을 시작할 때 자바스크립트나 파이썬 같은 언어를 배우지 않고 하스켈을 배우기 시작했는데, 이는 미래를 생각하지 않은 행동이라고 할 수 있겠다. 하지만 결국 취직하자마자 해야 했던 것은 JavaScript와 TypeScript를 이용한 웹 프로그래밍이었기 때문에, 어찌 보면 Haskell을 한 것보다는 내 생존 능력을 더 키워줬다고 할 수 있을 것이다. 하여튼, 생존 능력이 늘어난 것과 별개로 나의 하스켈에 대한 스킬은 다시 사그라져 가고 있었다. 하지만 사그라져간 것뿐이지 나의 하스켈에 대한 배움의 의지가 사라진 것은 아니었다. 지금 시간을 내가 원하는 것을 배우는 데 쓰고 싶었다. 해야 할 것의 가장 1 순위는 하스켈이 되었던 것이다. 하지만 그 우선순위가 예전부터 있었던 그저 아싸 기질에서 나온 것은 아니다. 왜 프로그래머는 야근하는 직종으로 생각되는 것인지, 왜 프로그래머는 실제로 언제나 밤을 새고 힘들게 살아야 하는가에 대한 해결책을 함수형 프로그래밍으로 생각했기 때문이다.

첫 번째는 프로그래머가 신경 써야 할 것들을 컴퓨터가 챙겨 주기 때문이다. 특히나 강력한 타입 시스템을 지원하는 언어는 다른 언어에 비해서 더 많은 문제들을 잡아준다고 알고 있었다. 프로그래머가 신경 써야 할 것이 적어진다면 프로그래밍 할 때도 머리를 덜 굴려도 되고 문제점이 발견하기 쉬우니 나중에 제품이 나가서 문제가 생기는 경우도 적어질 것이라고 생각했다. 두 번째는 함수형 프로그래밍을 이용한 코드의 패러다임 단순화이다. 객체 지향 프로그래밍에서는 객체 간에 소통을 통해서 프로그래밍이 이뤄지게 되는데, 그에 비해서 함수형은 함수와 데이터가 조합되어 더 단순하게 판단할 수 있기 때문이다. 마치 mutable을 지원하는 언어에서의 상태의 추적과 immutable 언어에서의 상태 추적과 같은 차원의 차이라고 생각한다. 마지막으로는, 아직도 아싸의 기질이…

사실 하스켈을 배워야겠다는 의지는 많았지만 하스킬 자체를 현업에서 쓰겠다는 생각은 들지 않았다. 왜냐하면 아싸의 고집도 짓눌러 버릴 정도로 하스켈을 쓰는 회사는 굉장히 적었고, 그것을 하겠다고 말하는 것만큼 미래에 대한 계획이 없는 것이 없었다. 그렇다 보니 하스켈을 배우겠다는 말에 본질적인 의미는 하스켈을 통해서 함수형 프로그래밍들의 다양한 방면을 배워보겠다는 것과 다름없었다. 나의 조악한 계획 상으로는, 하스켈은 그저 함수형 프로그래밍을 배우기 위한 발판이었을 뿐이고 실제로는 하스켈을 배우고 난 후에 F#, Rust, Scala를 통해서 그나마 돈 받고 한국에서 일할 수 있을 것 같은 언어를 배우는 것이 나의 계획이며 그것은 지금도 그러하다.

## Learn You a Haskell의 후기

이 책은 하스켈을 소개하는 여러 책 중에서 그나마 쉽다고 알려진 책으로, 실제로 웹사이트에 처음 들어갔을 때 마치 유치원 홈페이지에 들어온 것 같았다. 결론부터 말하자면 유치원처럼 보인다고 해서 유치원만큼 쉬운 것이 아니였고, 결국 하스켈은 하스켈이었기 때문에 머리를 박아가며 배웠어야 했다. 특히 어려운 개념을 설명하면서도 그에 걸맞은 주석 같은 설명이 아니라 재미있는 그림과 설명으로 설명을 하다 보니 실제로 개념을 이해하는데 도움이 안 되고 나 혼자서 코드를 바라보며 골머리를 썩혔던 기억들이 굉장히 많다. 그 개념을 이해한 후에 나중에 복기할 때에는 도움이 될 수도 있겠다.

그리고 번역의 상태가 안 좋은 경우가 많았는데, 코드를 옮겨 쓰는 와중에도 코드가 실제 웹사이트에 있는 코드와 다른 경우가 많다. 물론 웹사이트의 경우 계속 최신으로 업데이트를 해 줄 수 있으니 그 코드의 오류가 어디서부터 났는지는 불분명하지만, 실제 번역가가 코드를 보고 옮기면서 실행해본지 안 해 본 것인지는 알 수 있다.

게다가 이 책 자체도 그리 만족스럽지 못한 것은 결국 하스켈에 대한 교육 과정을 모나드로의 경로로 설정했기 때문이다. 물론 함수형 프로그래밍을 하스켈을 통해서 배우는 사람들이 모나드에 대해서 모나드에 대해서 궁금해하는 것은 맞지만, 이 책에 대한 많은 비판들이 "이 책을 배우고 나서도 할 수 있는 것이 없다"라는 것을 생각해보면 책을 다 본 입장에서는 왜 그들이 그런 말을 했는지 알 수 있다.

## Haskell에 대한 후기

이 책을 배웠다고 해서 내가 하스켈에 전부를 안다고는 말할 수 없겠지만 결국 내가 하스켈에 갖게 된 인상은 컨텍스트를 이용한 코딩이라는 것이다. 그리고 그 컨텍스트는 강력한 타입 시스템에 기초로 한다. 물론 이런 방식의 코딩을 하스켈에서만 할 수 있는 것은 아니다. 함수형 프로그래밍 언어는 물론 다른 객체 지향 언어에서도 가능하다. 나무위키에서는 하스켈을 순수 함수형 언어로 설명한다. 실제로 하스켈의 모든 함수나 표현식들은 사이드 이펙트를 가지지 않는 것으로 알려져 있지만, 그러한 설명은 하스켈에 대한 옳지 않은 망상을 꾸게 해주는 문장들이라고 생각한다. 필자는 그 문장으로 비롯하여 하스켈의 사이드 이펙트적인 요소까지 모두 순수하게 처리할 수 있다고 생각했으며, 결국 그 망상은 결국 이 책을 덮을쯤이나 되서야 깨질 수 있었다. 책을 다 읽어서 해결한 것은 아니다. 그 점에 대해서 책은 최근 아무런 설명을 하지 않았기 때문이다. 하스켈을 배우면서 틈틈이 가입했던 커뮤니티에서 도움을 받아서 알게된 사실은 다음과 같다. 하스켈이 사이드 이펙트를 가지는 부분을 인터페이스로 처리했기 때문에 하스켈 코드 안쪽이 순수하게 남는 것뿐이지, 결국 사이드 이펙트를 처리하는 함수형 프로그래밍을 배울 때 느꼈던 그 순수했던 부분들을 제공하기 위해서 하스켈이 더러운 일들을 보이지 않는 곳에서 처리해주고 있었던 것이다.

[이 링크](https://panty.run/why-haskell-is-so-difficult/)에서 설명하다시피 만약 함수형 프로그래밍 자체만 배우고 싶다면 고차 함수 챕터까지만 봤으면 됐을 것이다. 아니 오히려, 요즘 일반적인 프로그래밍 언어들도 다들 고차 함수를 지원하므로 해당 언어 책의 고차 함수 챕터만 봐도 함수형 프로그래밍에 대해 달성하고 싶은 대부분의 내용들을 알 수 있을 것이다. 다만 함수형 언어에서 비롯된 기능들을 일반적인 프로그래밍 언어가 사용할 때 그 사용할 때 그 내부에서 일어나는 일들을 모나드를 배움으로써 눈치챌 수 있게 되었다. 마치 결국 컴퓨터공학과의 기초공학과에 기초 전공과목들이 토대가 되어야 나중에 더 높은 프로그래머가 될 수 있을 것이라는 그런 굉장히 꼰대스러운 말이다.

## 앞으로

[다음 링크](https://xtendo.org/ko/monad#1)에서도 알게 된 내용이지만 하스켈은 하위 호환성이 좋지 못하다고 한다. 왜냐하면 하위 호환성을 지키면서까지 랭귀지 디자인을 나쁘게 보존하고자 하는 생각이 별로 없기 때문이다. 그런 점에서 볼 때 현장에서 쓰지 않는 이유를 알 수 있다 알 수 있다. 물론 현장에서 쓰지 않는 이유가 하위 호환성이라기보다는 실제 배우는 사람도 적고 배워서 쓰고 싶은 사람도 적은게 더 크지 싶다. (여담이지만 스칼라도 2.X 버전부터 소수점 자리수마다 호환성 이슈가 발생한다는 글을 본 적이 있다.)

하스켈에 대해서 초심자의 기초라고 할 수 있는 모나드까지 배워본 후기로서는 결국 하스켈은 그저 함수형 프로그래밍을 배우는 발판이라는 인식을 벗어나지 못했다. 결국은 그다음으로 배우고 싶었던 F# 수업을 듣고 있으며 이쪽 코드가 좀 더 현실성 있을 것이라고 또 망상을 품고 있다. 물론 앞에서 말했던 로스트나 스칼라에 비해서 한국 취업 시장은 10배는 처참하겠지만 말이다. 하스켈, F#을 익히면, 내 인생에 고집을 부리면서까지 익히고 싶은 것은 없어지지 않을까 싶다.

어떤 사람으로부터 들은 말은, 어렸을 때 다양한 언어를 체험하는 게 좋다고 생각한다고 한다. 그 점을 그나마 위안으로 삼으면서 여러 가지 언어를 배우려고 하고, 몇 달 뒤부터는 조금 더 실무에 가까운 내용과 내가 많이 해보지 못한 서버사이드, DB 프로그래밍에 대한 토이 프로젝트를 진행해보고 싶다.