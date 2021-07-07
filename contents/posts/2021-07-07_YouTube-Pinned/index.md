---
public: true
category: "Post"
date: "2021-07-07T14:15:00+09:00"
title: "YouTube Pinned"
description: "앱간의 프로토콜, Microsoft(Azure)의 ID 플랫폼, 반응형 시스템, C#의 멋진 기능, Dapper Micro ORM 그리고 Tye에 대한 유튜브 동영상 정리"
primaryImage:
  source: ../../images/YouTube-Pinned.jpg
  alt: "YouTube Pinned"
tags:
  - "YouTube"
  - "Protocol"
  - "Microsoft Identity"
  - "Reactive Systems"
  - "C# Features"
  - "Dapper"
  - "Tye"
---

```toc

```

## 프런트엔드를 위한 API 프로토콜, REST만이 답은 아니다. (with. gRPC, GraphQL)

[프런트엔드를 위한 API 프로토콜, REST만이 답은 아니다. (with. gRPC, GraphQL)](https://youtu.be/6C9zyLioTOU)

개발자로 프로덕트를 만드는데 필수적인 네트워킹에 대해서, 어떤 선택지들이 있는지에 대해서 설명한다.

개념적인 내용을 쉽게 설명해줘서 좋았다. JS프론트엔드와 이종언어로 된 백엔드가 소통하기 위해서 IDL을 만드는 트렌드는 네트워킹의 분야조차 컴파일의 과정 속에 놓고 더 체계적으로 버그를 줄이기 위함이지 싶다.

## An introduction to the Microsoft identity platform

<iframe src="https://www.youtube.com/embed/sn9HWh-rg9o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Microsoft Identity Platform에 대해서 설명한다.

Microsoft Identity와 Azure AD가 무슨 차이일까 고민한 적이 있었는데, Azure AD가 포함되는 관계였다. 제발 ID 기능을 스스로 만들지 말라고 하는 부분이 인상깊었다. 물론 보안의 성능이나 기능이나 MS의 제품이 더 좋을테지만, 그게 내 서비스의 플랫폼 중립성을 보장해줄 수 있을까? AWS API Gateway에 적용할 수 있을까? 그건 찾아봐야 할 일이다.

## 프로덕트 조직의 생산성 높이기

<iframe src="https://www.youtube.com/embed/xlV82Q-ZmAA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

개발 조직의 생산성을 높이는 방법과 구현을 설명한다.

핵심은,

- 툴을 이용하여 작업자의 집중도를 높힌다.
- 툴은 API를 이용하여 개인화하지 않고 사내화한다.
- 명확하고 체계적인 방법을 준수하여 다른 조직 다른 직군의 작업 이해도를 높혀 협업 효율성을 높힌다.
- 반복되는 질문을 공격적으로 자동화하여 없애고, 적극적으로 질문자에게 프로세스를 이해시킨다.

그리고 이런 관리자의 영역에서 제품자체에는 기여를 한게 없으니 멘탈이 공허해질수 있는 부분에 대해서 설명하는 부분이 좋았다. 다만 극복방법이 극히 개인적인데, 개인적인 상황 극복보다는 조직이 프로세스에 적극적으로 피드백하고 공로를 인정하는 문화가 있으면 좋지 싶었다.

## What Are Reactive Systems?

<iframe src="https://www.youtube.com/embed/Ysn6eInApYM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Reactive Systems에 대해서 설명한다.

의아한 점은 Reactive Programming에서 나오는 Observation 이라던지 Stream 같은 언어는 일체 없고 내용 자체는 AKKA와 같은 메시지, 액터 기반으로 되어있다는 점이다. 그렇게 치자면 Actor가 이 화자가 Reactive System인 것은 알겠는데, 그렇다면 Reactive System과 Reactive Programming은 그저 같은 형용사를 쓰고있는것 뿐일까? 에 대해서는 [Reactive programming vs. Reactive systems](https://www.oreilly.com/radar/reactive-programming-vs-reactive-systems/)가 자세히 설명하고 있다.

## The top 10 best new features in C# version 6 to 9 - Chris Klug

<iframe src="https://www.youtube.com/embed/hIQa7SsWYUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

C# 6에서 9까지의 발표자 기준 TOP 10 기능을 설명한다.

1. record type
2. pattern matching & switch expressions

   이부분은 패턴 매칭보다는 `is` `not` `or` `and`와 같은 자연스러운 코드 리딩에 도움을 주는 연산자에 더 관심이 가게 되었다.

   ```cs
   static bool IsFirstSummerMonday(DateTime date) => date is { Month: 6, Day: <=7, DayOfWeek: DayOfWeek.Monday };
   ```

   자세한 것은 [이곳](https://docs.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/is)을 참고하자.

3. named tuple

   메소드 반환시에 별도의 타입을 작성할 필요없이 튜플로 작성할 수 있고, 튜플에 이름을 지정해서 반환 받은 측에서 쉽게 이름으로 property를 사용할 수 있다. 또한 deconstructor를 이용하면 반환시에 property 단위로 쉽게 선언하여 사용할 수 있다.

4. nullable reference types

   reference type에 대해서 명시적인 nullable을 설정할 수 있는 기능이다. 프로젝트 단위에서 설정할 수도 있고, 전처리기를 이용하여 부분적으로만 적용할 수도 있다. 중요한 점은 실제 런타임까지 nullable 타입으로 내려가는 것이 아니라 컴파일 타임에서 warning으로 처리되므로 무시하고 작성할 수 있다는 것이다.

5. null-condition operator & null-coalescing assignment

   ?.는 js와 같이 멤버가 있을 때는 멤버를, 없을 때는 null을 전달하는 기능이고 ??=은 값이 null 일 경우 기본값을 재할당하는 연산자이다.

6. discard
7. expression bodied members

   하나의 식이나 문으로 끝날 수 있는 class member를 arrow 로 작성하는 기능이다.

8. out variables
9. default interface methods

   내가 구현한 인터페이스를 다른 사람들이 쓰고 있을 때 문제 없이 인터페이스를 확장할 수 있는 기능이다.

10. string interpolation

사람들은 C#의 이런 기능들과 매번 새로 추가되는 기능 때문에 사용자에게 많은 부담을 준다고 생각할 수 있지만, 발표자의 생각은 다르다. C#은 고리타분한 Java식으로 작성해도 잘 돌아가며, Scala와 같은 온갖 최신 기능으로 무장한 언어같이 작성해도 잘 돌아간다. C#의 장점은 모든 사용 행태를 포용할 수 있다는 것이며 자신 혹은 조직이 원하는 순간에 다른 표현법으로 변경할 수 있다는 것이다.

## Dapper를 이용한 ORM 활용

<iframe src="https://www.youtube.com/embed/KBaqHJif9Hc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Micro ORM인 Dapper에 대해서 설명한다.

Dapper는 Full ORM인 EF나 SQL 쿼리를 직접 날리는 DataTable의 중간 레벨에서 쿼리를 날릴 수 있게 해준다. EF 같은 ORM으로 데이터 쿼리를 하다보면 성능 최적화에 대해서 굉장히 돌아가는 선택을 하게 되는 경우가 있는데, 적당한 수준에서 SQL과 ORM을 적절히 섞어 구현하는 것이 Dapper가 주장하는 장점이다. 보다보니 connection을 매번 전달하여 사용하던데 EF의 DbContext와 같이 Scoped Lifecycle로 DI해서 쓰면 어떨까 싶었다.

## 닷넷 개발자를 위한 클라우드 네이티브, Tye

<iframe src="https://www.youtube.com/embed/CZzZ0RWAp2M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

dotnet app들을 쉽게 연결하고 배포하고 관리할 수 있는 [Tye](https://github.com/dotnet/tye)에 대해서 설명한다.

tye를 이용하면 dotnet sln 단위로 쉽게 여러 앱을 한번에 실행하고 엔드포인트를 동적으로 사용할 수 있다. 도커파일을 자동으로 생성하고 쿠버네티스와 연동도 할 수 있는 듯 하다. 데모에서 사용하는 모습이 인상깊었으나, 이 세미나가 1월에 발표되었을 때도 experimental이었으나 현재도 experimental에서 벗어나지 못하고 document도 자세히 작성되지 않은 상태인 것을 보니 아직 기다려야할 듯 하다.
