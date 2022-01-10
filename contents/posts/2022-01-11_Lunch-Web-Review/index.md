---
public: true
category: "Post"
date: "2022-01-11T01:00:00+09:00"
title: "회사 점심 식당 검색 웹사이트 프로젝트 후기"
description: "식단대장 앱에 지도 기능 없는 줄 알고 주말에 10시간 부어서 만든 Vue3.2 SPA와 여러 잡생각들"
primaryImage:
  source: ../../images/project.jpg
  alt: "Project"
tags:
  - "toy project"
  - "Vite"
  - "Vue 3.2"
  - "Kakaomap API"
---

2022년을 맞이하여 회사에서 점심 식대를 지원하기 시작했다!

법인카드도 몇없는 회사에 점심 식대 지원한다고 하면, 가고싶지도 않은 식당을 몰려다닐 생각에 아찔할 수 있다. 하지만 사원이 주어진 식대를 쉽고 자유롭게 사용할 수 있고, 경영지원에서는 더 쉽게 비용을 처리할 수 있는 **[식권 대장](https://sikdae.com/)** 앱을 사용하게 되었다.

아래 글에서 프로젝트의 후기를 남기고자 한다.

[Daim Lunch](https://blue-water-02a9f0300.azurestaticapps.net/)

[GitHub Repository](https://github.com/naramdash/daimlunch)

```toc

```

## 프로젝트를 시작한 이유

실제로 식권대장 서비스를 사용하기 전에 사용할 수 있는 음식점 목록과 지도 캡처가 담긴 PDF 파일을 받았다. 지금에야 앱에서 식사하기를 누르면 어떤 가게에서 먹을 수 있는지, 어디에 있는지가 나온다는 것을 알지만, 그때는 PDF 내용만 보고 _매 점심마다 아날로그 식으로 고민해야한다고?_ 라고 생각했다. 라고 생각하자마자 대충 이 프로젝트 견적이 짜여졌다.

- 지금 회사 업무 수행 전에 시범삼아 Vue 3 예습이 필요하다.
- 카테고리 별로, 거리별로 필터링하는 기능이 필요할 것이다.
- 돌려돌려 돌림판 기능이 있으면 웃음 포인트가 될 것이다.
- 식당 리스트는 잘 바뀌지 않을 것으로 예상하며, 40개 언저리다.
- [카카오맵 API](https://apis.map.kakao.com/web/)은 일 30만번 호출까지 결제수단 등록없이 무료이다.
- 카카오맵 API에 [Samples](https://apis.map.kakao.com/web/sample/)를 보면 예시가 많고, 맵 위에 마커를 찍을 수 있다.

그날 밤 프로젝트는 시작되었다.

## Vue 3.2

전 회사에서는 react 17을 썼고 지금 회사에서는 angular 10을 쓰고 있으며 앞으로는 vue 3.2를 쓰려고하는 현재 시점에서, 이런 작고 간단한 프로젝트는 나를 적절히 단련시켜줄 수 있을 것으로 생각되었다.

SPA 프레임워크를 배울때 맨처음으로 배웠던 것이 Vue 2였지만 프론트엔드 3대장 순회를 돌고, 여러 실무 경험을 겪고 나서 Vue3.2를 보니 여러 생각이 든다.

### SFC

Vue2 때도 있었던 기능이지만, 아직까지도 다른 프레임워크에서 넘볼 수 없는 뚜렸한 장점이다. angular나 react도 한파일에 html js css를 어떻게든 우겨넣으면 우겨넣을수 있지만, 가장 웹스러우면서도 가성비와 효용성 있게 구성한 것은 Vue라고 생각한다. 최악은 Angular이다. 컴포넌트 만드는 것조차 최소 2개 파일을 쓰며, 도대체 언제가 되야 표준으로 올라갈지 모를 Decorator 문법으로 떡칠이 되어있다.

### Typescript

Vue 3는 Typescript로 [작성](https://v3.vuejs.org/guide/typescript-support.html#typescript-support)되었다. 👍

react는 @types/react를 통해 ts 타입을 지원한다. facebook은 자체적으로 [flow](https://flow.org/)라는 타입 유추 툴을 갖추고 있지만, 아직까지도 버전 1에 도달하지 못했으며, 커뮤니티 크기에서도 큰 차이가 난다.

angular는 2부터 Typescript를 강제한다. 하지만 프론트 스프링부트를 만들기 위한 구글의 집념 때문인지, Decorator라는 Typescript의 실험적인 기능을 선넘게 사용할 뿐만 아니라, Decorator로 발생하는 로직의 생략과 무책임한 디펜던시가 곳곳에서 발견된다.

### Component

3대장 프레임워크들을 보면 다들 클래스 컴포넌트로 시작한다. Vue2는 완전히 OOP는 아니지만 object 형태와 proxy를 이용하여 짜임새 있는 구성을 지원한다.

react는 16.8에 hook과 함께 함수 컴포넌트를 지원했다. 하지만, 클래스 컴포넌트와 다른 라이프사이클, ref에 대한 기능 차이와 라이프사이클의 차이에도 클래스 컴포넌트와 함수 컴포넌트가 공존하는 등 깊게 사용할수록 납득할 수 없었다.

Vue는 3에서 [Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)를, 3.2에서는 [SFC script setup](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)을 지원하였다. react스럽게 자유롭게 코드를 배치할 수 있으면서도 script setup로 작성한 컴포넌트와 클래스 컴포넌트가 같은 라이프사이클을 공유하는 더 나은 모습을 보여준다.

### Reactive

react의 use로 시작하는 hook은 사용에 있어 여러가지 규칙이 있다. 함수 컴포넌트 내에서만 사용해야하며, 여러 depth 밑에서 사용해서는 안되며, 실제 동작은 hook이 선언된 순서를 기반으로 한다. 이는 Elm의 MVU 스타일을 자체적으로 해석한 결과로 보이며 좋아하는 사람도 있겠고 의문스럽지만 그냥 사용하는 사람도 있을 것이다.

필자는 [solidjs](https://www.solidjs.com/)와 vue3.2를 최근에 겪어보면서 react의 hook과 solidjs, vue3.2 SFC script setup 스타일의 차이점을 살짝 이해할 수 있었다. solidjs와 vue setup은 reactivity를 기반으로 [factory method](https://www.solidjs.com/guides/comparison) 형태를 취하고 있다. 그말인 즉슨 함수 컴포넌트 코드는 맨처음 한번 호출된 뒤 완전히 데이터와 이벤트의 상호작용으로 이루어지는 것이다. 그에 비해 react의 함수 컴포넌트는 MVU 스타일로 매번 함수를 처음부터 다시 호출한다. 호불호는 있겠지만, reativity와 component를 깔끔하게 분리해서 생각할 수 있는 구조에 더 관심이 간다.

## Kakaomaps API

카카오맵을 사용한 이유는 별도의 결제수단 등록 없이 쉽게 사용할 수 있었기 때문이다.

또한 [웹사이트](https://apis.map.kakao.com/)에 실제 문서나 가이드가 잘 작성되어 있어, 원하는 시나리오를 쉽게 찾아 코드를 응용할 수 있었다.

실제 사용은 CDN을 통해 스크립트를 받아오는 형태로 구성한다. 그래서 Typescript 타입 지원이 되는가 싶었지만, 다행히 누군가 [@types/kakaomaps](https://www.npmjs.com/package/@types/kakaomaps)에 타입을 작성해놓아, 다행히 안전하게 타입스크립트 코딩을 할 수 있었다.

다만, CDN기반으로 불러온 js 코드지만 왜인지 모르게 에러가 나는 기능들이 있었다. 마커와 관련된 기능이었는데, 실제로 해결하지 않고 바이패스해서 해결했다. 이벤트리스너를 추가하는 코드도 그렇고 나온지 오래된 느낌인데, 전체적으로 리뉴얼했으면 좋겠다는 생각이 든다.

## 후기

Vue 3.2와 KakaoMaps API만을 이용하여 만들었지만, 구현 기능이 작았는지, 라이브러리들의 지원되는 기능이 많았는지 불편함 없이 진행할 수 있었다. 다만, setup script로 작성하였는데, 불변스러운 가변성이 좋기는 좋았지만 react hook과 비슷한 가독성을 보여주었다. 이부분에 대해서는 같이 작업하는 동료들, 커뮤니티 전체의 가이드를 찾아서 따라야할 것 같다.

## 앞으로

원래 이 프로젝트가 있기 전부터 친구들을 모아 진행하는, 그리고 다른 회사 개발자까지 끼워넣은 사이드 프로젝트가 있었다. 이 프로젝트를 진행함으로써 한 주가 날라가버리는 체험을 함으로써 생각없이 일정을 잡지 말아야겠다는 생각이 들었다. 점점 회사일도 바빠지고 있는 듯 하지만, 그럴수록 시간을 할애하여 프로젝트를 꾸준히 진행해야겠다는 마음가짐이 필요하다. 이 프로젝트는 프론트뿐만 아니라 백엔드와 지출이 동반되고 여러 사람을 참여시킨만큼 프로젝트를 시작한 나로써 어께가 무겁다. 아무리 힘들어도 꾸준히 진행하는 끈기가 필요한 시점이다.
