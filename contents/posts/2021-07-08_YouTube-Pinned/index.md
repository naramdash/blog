---
public: true
category: "Post"
date: "2021-07-08T11:10:00+09:00"
title: "YouTube Pinned"
description: "Actor의 작동 방식과 프레임워크 Akka.NET, Orlean, Dapr 그리고 XNA Framework를 계승한 크로스플랫폼 프레임워크 MonoGame, Kotlin과 Java의 비교, 함수형 프로그래밍에 대한 설명"
primaryImage:
  source: ../../images/YouTube-Pinned.jpg
  alt: "YouTube Pinned"
tags:
  - "YouTube"
  - "Actor"
  - "Akka.NET"
  - "Orlean"
  - "Dapr"
  - "MonoGame"
  - "Kotlin"
  - "Functional Programming"
---

```toc

```

## When and How to Use the Actor Model: An Introduction to Akka NET Actors

<iframe src="https://www.youtube.com/embed/0KnIMDoJpZs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Actor 시스템을 기반으로한 Akka.NET에 대해서 설명한다.

구현 코드는 Akka.NET을 기반으로 되어있지만, 동영상에서 설명하는 개념적인 것들은 모두 Actor 시스템이기 때문에 Actor에 대해서 배우고 싶다면 플랫폼 상관없이 봐도 괜찮을 것 같다. 게다가 쉽게 잘 설명해서 좋았다. Actor에 관련된 동영상을 보면서 흥미로웠던 것은 각 Actor는 한번의 하나의 메시지만 처리하여, 병렬성의 개념이 없다는 것이다. 요즘 시대에서 병렬성이 없음에 의아해하는 사람들이 있을 수 있으나, 싱글 스레드에서도 많은 것을 처리할 수 있다고 하며(하긴 그럼 JS는 얼마나 느리겠는가), Actor 자체를 논리적이든 효율적이든 의미있게 나누는 것이 중요할 것이다.

## Akka.NET 으로 만드는 온라인 게임 서버

<iframe src="https://www.youtube.com/embed/rcG0g5M42Tg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

좀 예전 동영상이기는 하지만, 한국어로된 Akka.NET 동영상이다.

내용 자체가 심화로 가지는 않지만, Actor 시스템을 도입하면서 PoC를 실제로 시나리오와 함께 구현한 것이 참고하기에 매우 좋았다. 또한 Akka.NET은 라이브러리로 클라이언트와 서버 분간없이 사용할 수 있다는 점이 흥미롭다. Actor 시스템을 도입할 때 Orlean과 Akka.NET을 두고 선택을 고민했다고 하는데 이제 2021년이 되었으니 Orlean에 대해서도 많이 성숙하였고 또한 Dapr와 같이 마이크로서비스 패턴들을 지원하는 새로운 프레임워크도 나왔으니 더 많은 선택지가 생긴 것이다.

## On .NET Live - Deep Dive into Microsoft Orleans

<iframe src="https://www.youtube.com/embed/R0ODfwU6MzQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Microsoft의 Actor System인 Orlean에 대해서 설명한다.

그냥 Actor System이 아닌 Virtual Actor System으로 기본적으로 Scale out에 기반한 서비스 확장을 염두에 두었다는 것이 긍정적이다. 그래서 Akka.NET의 경우 클러스터 확장 기능을 이용하여 별도로 구성하는 것으로 알고 있고, 생성되지 않는 액터에 접근할 때 에러의 위험이 있는 것으로 확인했는데, 그것에 비하면 더 낫다고 생각한다. 그리고 클러스터링 구현에서 신선했던 것은 다른 인스턴스의 존재를 그저 데이터베이스 테이블을 보고 확인한다는 것이다. 그리고 해당 테이블을 유지하는 과정을 `Gossip`이라고 하는데 Kafka를 써보려고 했을 때 Zookeeper 구성하는 것보다는 5천배 쉬운 것 같아서 긍정적인 부분이었다.

## Adding a Little DAPR to Your .NET Microservices

<iframe src="https://www.youtube.com/embed/g-gOlkD9lKs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

마이크로서비스를 위한 Add-On과 같은 [Dapr](https://dapr.io/)에 대해서 설명한다.

처음에 Dapr을 봤을 떄는 메시지 pubsub이던, actor던 다 지원을 해준다는 것은 알겠는데, 도당체 어떻게 동작하는 것인지를 이해를 못했다. 그래서 사이트도 들어가서 여러번 읽어보고 관련 동영상도 여러개 보고나니 대충 감이 잡혔는데, 아까 말한 메시지나 Actor에 관한 핵심 코드나 구현체를 Microservice에 직접적으로 집어넣는 것이 아니라, instance마다의 별도의 dapr instance를 띄운 후 http나 gRPC로 기능을 호출하는 방식으로 사용하는 것이다. 혹은 쿠버네티스안의 공용 dapr instance를 띄어놓고 모든 마이크로서비스가 참조하는 방식도 있는 것 같다. 참고로 Dapr은 Distrubeted Application Runtime의 줄임말인 것 같다.

## Writing Cross Platform Games with MonoGame and .NET - Stephen Haunts

<iframe src="https://www.youtube.com/embed/kBQ4Af7g4k8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

XNA Framework를 계승한 오픈 소스 프레임워크 MonoGame에 대해서 설명한다.

동영상의 모든 것을 이해하지는 못했지만, 전체적으로 tricky한 프레임워크라는 인상이 남았다. 프레임의 순환 간에 코드가 끼어서 작동하는 방식이라던가... collapsion 구현을 위해서 트릭을 사용한다던지... 이런 점이 프레임워크에 대해서 깊이 이해하는 계기가 되기도 하겠지만은 옛날 식이라는 인상을 벗어나기 어려웠다. [스타듀벨리](https://store.steampowered.com/app/413150/Stardew_Valley/)가 MonoGame의 걸출한 자식인데, 한번 해보면 그래도 느낌적인 느낌으로 이해할 수 있지 않을까?

## 코틀린의 현재와 미래!? (feat. 라인 안드로이드 개발자)

<iframe src="https://www.youtube.com/embed/qFitd3Ukgcc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

라인 안드로이드 개발자들이 코틀린에 대해서 평하는 동영상이다.

먼저 안드로이드 런타임과 Java는 다른 것인게 인상깊다. 최근에 오라클하고 구글하고 박터지게 싸운 것도 실제 내부 구현체는 다르지만 API를 그대로 복붙해서 썼기 때문에 그런 것 아니였는가. React를 쓸 때 느낀 React Dom과 HTML의 관계와 비슷한 것 같다. 현재에도 Java 8의 전체 기능을 못 쓰는 것을 보니 JS를 온전히 지원하지 못하는 Facebook의 hermes를 보는 것 같기도하다.

패널들의 의견이 은근히 부정적이다...

- 실행속도는 변하지 않는다
- 컴파일 속도가 느리다
- 낮은 레벨에서의 구현방식이 달라서 유닛테스트를 실행하기 힘들다

위의 의견들은 엄청나게 큰 어플리케이션 레벨에서야 이런 단점이 체감될 거라고 한다. 결국 코틀린으로 가야하는 것은 자명한 사실이라고 한다.

## 라인 백엔드 개발자의 함수형 프로그래밍 언어 실전 사용기

<iframe src="https://www.youtube.com/embed/H6JxxWL6bJI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

라인 개발자가 함수형 프로그래밍이 무엇인지, 어떻게 팀에 도입했는지에 대한 동영상이다.

아쉬웠던 것은 Scala를 팀에 도입한 것이지, 함수형 프로그래밍을 도입한게 아니라는 점이다. 그렇게 보면 보스나 팀원이나 함수형을 생각하고 들어간 것은 아닐 것이라는 생각이 든다. 하지만 오히려 그런 식으로 순차적으로 함수형을 도입하는 것이 함수형 약을 팔기 위한 올바른 절차가 아닐까? 내가 약을 팔고 싶을 때 다시 참고해볼 것 같다.

함수형의 장점을 설명할 때 시간의 개념을 가져와 설명한 것이 매우 좋았다. 한 변수가 가지는 값이 변하지 않음으로 생기는 디버깅 차원의 감소, 병렬 프로그래밍에서의 안정성, 공격적인 최적화를 가져올 수 있음을 쉽게 설명 해주었다. 그에 대비한 단점도 명확히 설명해준 것도 좋았다. 보편적인 데이터 구조나 알고리즘이 명령형 기반이라는 점인데, 이 얘기를 들으면서 이전에 사놓았던 [순수 함수형 데이터 구조](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791161753515&orderClick=LAG&Kc=) 책을 꼭 읽어야겠다는 생각을 했다.
