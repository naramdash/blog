---
public: true
category: "Post"
date: "2021-08-27T16:25:00+09:00"
title: "FSharp 책거리 후기"
description: "FSharp을 배우기 위해 사용했던 Udemy 강의와 책에 대한 후기, 그리고 FSharp 자체에 대한 후기"
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "Book Review"
tags:
  - "Book Review"
  - "Language Review"
  - "Functional Programming"
  - "F#"
---

최근에 Udemy의 F# From the Ground Up 강좌와 옛날에 사두었던 Get Programming with F# 책을 마쳤다. 이에 대한 후기와 F# 자체에 대해서 말해보고자 한다.

```toc

```

## Udemy - F# From the Ground Up

[F# From the Ground Up](https://www.udemy.com/course/fsharp-from-the-ground-up/)

F#은 원래부터 관심이 있었던 언어였으며, 꼭 배워야겠다고 생각하던 와중, F#을 만든 Don Syme이 트위터에 이 강좌를 입문용으로 추천하던 것이 아니겠는가? 어쩔 수 없이 구입을 하게되었다. Udemy가 한국으로 치자면 인프런 같은 서비스여서, 원래는 강의는 러닝머신에서 보고 실습만 따로 집에서 컴퓨터로 할려고 하였는데 코로나 4단계가 오기도 하고, 아무래도 코드를 러닝머신에서만 보고 이해한다는게 말이 안되기 때문에 그냥 컴퓨터 앞에서 강의 보면서 따라했다.

이 강의의 목적은 수강생으로 하여금 **F#에 무서움 없이 두 발자국 정도 내딛여주게 해주는 것**이다. 왜 두 발자국인가? 왜냐하면 이 강의는 F#의 강력하면서도 세부적인 언어 기능을 모두 소개해주지는 않기 때문이다. 하지만 프로그래밍을 처음 배웠을 때, ifelse와 for문을 배우고 모든 것을 할 수 있을 것 같은 그 자신감을 심어준다.

그 목적이 강의의 장점이자 단점이다. 소개해주는 대부분의 내용이 다른 언어에서도 유용한 기능들이 어떻게 F#에 표현되는가 + F#의 코드 전개 스타일이므로, 지금까지의 내가 사용했던 방식을 놓치지 않고 F#에 표현할 수 있는 방법을 알 수 있다. 이것이 장점이다. 하지만, F#만이 가져다줄 수 있는 장점이 없다면 F#을 배워야하는 이유가 있겠는가? 이것이 단점이다.

## Get Programming with F#

<img src="https://images.manning.com/book/2/6ccdc18-2956-4d1b-8773-8f4d3bbf09c9/Abraham-Fsharp_FC_hires.png" alt="책 표지" style="width: 50vw; max-width: 800px" />

[Get Programming With F#](https://book.naver.com/bookdb/book_detail.nhn?bid=7436299)

정말 옛날에, 관련된 주제의 책을 사놓으면 내 지식이 된 것 같은 기분에 허영과 사치를 누렸던 시점에 사놓았던 책이다. 2016년 쯤에 발간된 책이다. 그것을 명확히 알 수 있는 것이, 실습환경이 .NET Framework이며, C#에 튜플이 나오니 안나오니 하는 글이 나온다. 이제는 C#은 튜플을 넘어서 레코드까지 나왔다.

현재 기준(2021-08)으로 옛날에 나온 책이지만, 언어에 대한 내용이 알차다. 아무래도 언어 책이라서 그런 것 같다. 프레임워크나 라이브러리에 관련된 책이었다면 1년만 지나면 무용지물이 되기 쉽지만 언어의 근간을 쉽게 바꾸지는 않으니 말이다.

그리고 40개 정도의 많은 챕터로 이루져있지만, 각 챕터의 주제가 명확하고 챕터의 내용이 짧기 때문에 오히려 지루하지 않게 진도를 꾸준히 뺄 수 있었다.

하지만 실습 챕터나 라이브러리 사용하는 챕터가 문제이다. 닷넷 버전이나 라이브러리의 버전 차이 때문에 큰 고통들이 닥친다. HttpClient 라이브러리 소개하는 부분은 현재와 버전이 7단계나 차이가 나서 예제 코드가 도움이 안된다. 그냥 그 챕터가 말하고자 하는 바만 따라가는 수준이다. 특히 C#과 F#의 공존을 설명하는 부분에서 WPF를 사용하는데, 일단 예제 코드들의 .NET Framework 기반인데다가 포크해와서 VS로 돌려봐도 다 에러터지면서 돌지가 않는다. 그래서 이런 챕터들은 에디터에서 눈으로만 따라갔다. 닷넷코어 기준으로 classlib와 console 간에 project reference 걸어서 해봤으니 충분하겠지...

이 책의 목적은 **F#은 무엇을 위해 존재하며, 그를 위한 수단(장치)들은 무엇이 있는가?** 이다. 하지만 이 책도 F#의 모든 것을 설명하지는 않는다. 그래도 F#을 왜, 어떻게 써야하는지에 대한 정신교육이 된다는 것이 장점이며, 책의 내용과 코드가 현재 버전을 따라가지 못한다는 것이 약간의 아쉬움이다. 그래도 Udemy 강의가 두 발자국이었다면 이 책은 10 발자국 정도?

F#의 모든 것이 설명되있지는 않지만 마지막 부록에 가보면 설명되지 않은 중요한 기능에 대해서 간략하게나마 나열해놓았다. 인터페이스 선언법, 클래스 상속하는 법 같은 건 둘째 치더라도 Active Pattern, computation expression은 꼭 배워놓자. 그리고 이 책이 나온 이후에 추가된 F#의 기능들: F# 스크립트에서 nuget 바로 불러오는법, 익명 레코드, 보간 문자열, implicit yield도 알아놓으면 좋다.

## 그래서 F# 후기

F#의 가장 큰 목적은 <u>문제를 해결하는데 집중</u>하게 하는 것이다.

> F#은 간결하고 강력하고 뛰어난 코드를 작성하기 위한 오픈 소스 플랫폼 간 상호 운용 가능한 프로그래밍 언어입니다. 프로그래밍의 세부 정보보다는 문제 도메인에 중점을 두고 있습니다.
>
> from: https://docs.microsoft.com/ko-kr/dotnet/fsharp/what-is-fsharp

그 목적을 달성하기 위한 수단이 아래와 같이 있음을 알 수 있다.

- 강력한 타입 시스템을 기반으로 테스트를 컴파일 검사로 대체하기
- 파이프라인과 자연어에 가까운 신택스를 통해 쉽게 읽을 수 있는 코드로 작성할 수 있게 하기
- 쉬운 모듈 및 타입 작성을 통해 비지니스 로직을 최대한 가깝게 코드로 이식하고, 말이 안되는 코드를 컴파일도 안되게 하기(Make illegal states unrepresentable)
- 외부 세계의 데이터를 쉽게 타입화하기(Type Provider)

감히 말하자면 세최언이지 않나 싶다... 왜 이런 좋은 언어를 다들 안쓰는거지...

F#에 대해 더 궁금하다면 아래 Don Syme의 프레젠테이션을 보도록 하자!

<iframe src="https://www.youtube.com/embed/1AZA1zoP-II" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 여담

F# 커뮤니티를 주시하다보면, 몇명 안되는 커뮤니티에서 네임드들이 주거니 받거니하는 장면을 보게 된다. 그들만의 리그인가? 싶다가도 그분들이 커뮤니티에 적극 참여하고 기여한 내용들이 참 많기 때문에, 어찌보면 C#이 이루고 싶은 (작지만) 오픈소스 커뮤니티 생태계가 아닐까 싶다.

바로 이전에 배운 Haskell과 비교해봤을때, 언어의 기능이나 스타일은 당연히 차이가 나겠지만, 그거보다 더 강하게 느낀 것이 교수법의 차이이다. Haskell에 비해서 더 실용적이고, 더 친절하다. 학습자를 나락의 길(M words)로 이끄는 것을 강력하게 막으며, 문제의 본질, 프로그래밍하는 즐거움에 더 집중하려고 한다.(F in FSharp is Fun!) 그래서 강의나 책이 학습자에게 F#의 모든 것을 구겨넣으려고 하지는 않았던 것 같다.

F#을 배우면서 백준 알고리즘을 열심히 F#으로 풀고있다. 하지만 같은 알고리즘도 C#이 더 빠른걸 보면 질투심이 솟는다. 이건 닷넷팀의 태만 아닌가? 싶다가도 Python이 C#보다 빠른걸 보면 백준이 Python에 뭔가 혜택을 주지 않나 싶은 의심이 마구 든다. 하지만 코드가 파이프로 좌측정렬되있는 것을 보면 역시 이게 코드지 자화자찬하면서 계속 F#을 쓰게 된다.

## 앞으로

책을 끝마친 후 Scott Wlaschin의 [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/) 책을 보려했으나, 굉장히 이론적인데다가 영어라서 빠르게 포기한 후, [Rust The Book](https://doc.rust-lang.org/book/title-page.html)을 보고 있다. 사회에 점점 가까워지고 있다.
