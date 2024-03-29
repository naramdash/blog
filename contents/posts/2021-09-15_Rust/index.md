---
public: true
category: "Post"
date: "2021-09-15T23:40:00+09:00"
title: "Rust 책거리 후기"
description: "러스트 프로그래밍 공식 가이드 책에 대한 후기, 그리고 Rust 자체에 대한 후기"
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "Book Review"
tags:
  - "Book Review"
  - "Language Review"
  - "System Programming"
  - "Rust"
---

Haskell, F# 언어를 학습하며 지식욕의 한을 푼 필자는 그래도 한국에서 돈 벌어 살아보겠다고 Rust를 배워보게된다. Rust를 수요있는 F# 정도로 생각하고 안일한 마음가짐으로 진입했다가 겨우 살아돌아온 이야기를 해보고자 한다.

```toc

```

## 왜 Rust를 배우려고?

솔직히 Rust가 추구하는 속도는 내가 별로 관심없는 분야이다. 하지만 여러 패러다임의 장점을 콕콕 찝어 적용하고 함수형 프로그래밍 ~ 패턴 매칭 등으로 마무리했다는 그 소문들로 인해 내 머리 속에서 Rust는 "실용적으로 타협하면서도 속도와 안정성까지 추구한 킹왕짱 함수형 언어"라는 인식(망상)이 생겼다.

게다가 2021년 중순을 지나는 지금 시점에서 아직도 취업의 기미도 보이지 않는 F#에 비하여 Rust는 AWS Lambda에서 썼다더라, Microsoft가 주목하는 그 언어 등으로 화제에 오르며 몇몇 취업의 틈새가 열리기 시작한 듯하다.

`함수형 언어 + 취업의 문 = 내가 가야할 길` 이라는 연산에 다다르고, Rust라는 언어를 나무위키에서 봐온지 어느덧 5년, Rust 2018 에디션 책 한국 번역판을 사놓은지 1년 반만에 그 첫장을 넘겼다.

먼저 말하자면, "Haskell이 함수형 언어와 프로그래머들을 구원할, 안타깝게도 아직 주목받지 못한 언어"라는 내 멋대로의 망상처럼 이번에도 나의 망상이 너무 컸다.

## 러스트 프로그래밍 공식 가이드

![러스트 프로그래밍 공식 가이드](http://image.kyobobook.co.kr/images/book/xlarge/729/x9791188621729.jpg)

한국어로 출판된 유일한 Rust 프로그래밍 책이다. 원문 자체는 [The Book](https://doc.rust-lang.org/book/title-page.html)이라는 별칭으로 인터넷에 무료로 공개되고 있다. 또한 [한국어판](https://rinthel.github.io/rust-lang-book-ko/foreword.html)도 인터넷에 무료 공개가 되어있는데, 이는 출판본과는 연관없는 작업으로 보인다. 인터넷 버전에 대해서 말하자면, 최신 원문으로 업데이트 되지 못한 챕터들이 보인다. 그래서 그나마 이 책이 더 최신으로 보인다. 하지만 원문이 업데이트 되는 이상 한국어 번역본도 뒤쳐지는 내용들이 가끔 있다. 이는 짧은 업데이트 주기를 가지는 Rust의 특성이 한몫 거든듯 하다. 하지만 컴파일러의 도움말을 참고하면서 따라가다 보면 확인 가능한 조그마한 부분들 뿐이다.

다만, 이 책을 보면서 정말 아쉬운 것은, 용두사미에 가까운 번역이다. 가변 <-> 불변이 왔다갔다하는 번역도 그렇고 아무리 봐도 틀린 코드들은 무지성으로 코드를 따라치는 독자를 맞왜틀 20분 형에 처하게 한다. 그래서 출판사에 있는 오탈자 목록을 찾아 봤는데 그 수와 내용이 무시할 수 없는 수준이다. 이정도면 오탈자 수정 스티커를 만들어서 기존 독자에게 무료 배포해야되지 않나 싶다. 이 책을 읽어야하는 독자들은 [오탈자 목록](https://jpub.tistory.com/1020)을 꼭 확인하자. 물론 이 곳에 나와있는 것들이 전부는 아니다. 책의 내용을 토대로 긴장의 끈을 놓치지 말고 다음 내용과 코드를 살펴보자.

## Rust 후기

Rust를 취직 가능한 F# 정도로 생각했던 나의 망상은 산산조각났다.

Rust는 속도와 안전을 동시에 챙긴 시스템 프로그래밍 언어라는 만들어질 당시의 목표에서 크게 벗어나지 않았다. 패턴 매칭이니 일급 함수(클로저)니 하는 것들은 Rust를 멋진 함수형 언어로 만들기 위해서 도입한 것이 아니라, 멋진 시스템 프로그래밍 언어가 되기 위해 도입한 것이다. trait를 통한 동작의 공유는 Haskell과 닮아지고 싶어서가 아니라, Rust가 더 깔끔하고 실용적인 기능을 제공하기 위함이다.

이런 당연한 것들을 나의 단단한 망상이 가로막고 있었는데, 직접 Rust를 작성해보면서 현실로 돌아올 수 있었다.

하지만 그렇다고 해서 Rust에 대한 내 인식이 부정적으로 변한 것은 아니다. Rust는 "무비용"이라는 접두사를 항상 강조하는데, 이는 속도, 레이턴시 등의 요구사항을 만족해야할 때 쓸 수 있는 강력한 도구가 될 수 있음을 의미한다. Java, C#, Python에서 되도 않는 최적화를 감행하다가 "우리가 이런 코드를 짜게 된 건 다 이유가 있어..."와 같은 상황이 되기 보다는 Rust로 납득가능하고 더 치밀한 저수준의 최적화를 진행한 후 FFI로 제공하는 것이 가독성 유지보수 등에서 더 나을 것이라는 생각이 든다.

위에서는 Rust에 대한 나의 망상을 말해봤으니 Rust 자체에 대해서 말해보자.

Rust의 Unsafe 블록을 소개하는 부분에서 Rust의 컨셉을 또렷하게 알 수 있었다. 왜냐하면 Rust가 Unsafe함으로써 수행할 수 있는 "위험한" 작업들은 C, C++에서의 평범한 코드들이기 때문이다. 스마트 포인터를 배우면서 borrow 하는 거에 비해서 너무 어려운데 생각하다가, 이게 C++에서는 raw pointer에 비해서 더 안전한 기능을 수행해주는 "스마트"한 포인터로 취급되었을 생각해보니 안전성에 대해서 얼마나 Rust가 개발자를 엄하게 감시하는지 알 수 있었다. borrow에 lifetime에 trait bound까지 겹쳐서 작성하다보면 컴파일러가 "안돼 안봐줄거야 돌아가" 수십번을 하다가 그 뜻을 깨닫고 나면 컴파일을 해주는데, 거꾸로 이런 헬리콥터 부모와 같은 보살핌 없이 어찌 C, C++로 시스템 프로그래밍을 작성했을까 하는 생각이 드는 것이다.

나 혼자서 프로젝트를 진행할 수 있다면 먼저 비지니스 코드를 빠르게 F#으로 작성한 후, 서비스 수요에 따라서 Rust로 변경하는 작업을 수행할 것 같다.

Rust를 하다가 든 생각은, 최적화의 장점은 그저 빠르다로 끝나지는 않는다라는 것이다. 1개의 VM이 n개의 요청을 처리할 수 있다가 2n의 요청을 처리할 수 있도록 변경된다면, 같은 수요일 때는 클라우드 제공자에게 내야하는 비용이 절반이 될 것이다. 또한, 더 많은 수요로 인해서 scale out 해야하는 순간이 더 늦게 옴으로 인해서 동시성-병렬 작업에 대한 고려도 더 늦게 할 수 있을 것이다. [Green Coding](https://whossavingtheplanet.com/read/innovation/green-coding-sustainability-in-software/2020-10-04)이라는 키워드를 아는가? 우리가 소모하는 컴퓨팅 자원을 줄임으로써 자연도 보호할 수 있다!

## 앞으로

이제와서는 내가 더 배우고 싶다, 이것을 알지 못하고 다시 직장으로 돌아간다면 한이 맺힐 것 같다, 이런 것은 없다. F#과 Rust 두 언어로 직장에서 코딩을 하고 싶다는 생각만 있을 뿐이다. 다만, 내가 그 언어들을 다룰 수 있음을 포트폴리오로 증명을 해야할 것이다. F# 책을 덮었을 때에는 내가 어떤 서비스를 F#으로 작성하여 제공할 수 있을까에 대해서 두근거리는 느낌이 있었다. 하지만 Rust 책을 덮고 나서는(물론, 책 한권 봤다고 언어를 다 아는 것은 아니다.) 내가 정말 Rust로 소프트웨어를 만들 수 있을까에 대해서 두려움과 막연함이 든다. 하지만 멈춰있어서는 후회뿐이라는 것을 깨달은 지금에서는 앞으로 계속 나아갈 뿐이다.
