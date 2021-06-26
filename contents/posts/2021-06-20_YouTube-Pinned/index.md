---
public: true
category: "Post"
date: "2021-06-20T01:50:00+09:00"
title: "YouTube Pinned"
description: "인상 깊게 본 YouTube 영상들과 리뷰"
primaryImage:
  source: ../../images/YouTube-Pinned.jpg
  alt: "YouTube Pinned"
tags:
  - "YouTube"
  - "Async"
  - "Azure Cosmos DB"
  - "Blazor"
  - "Tailwind"
  - "Azure Static Web Apps"
  - "Azure AD B2C"
  - "ASP.NET"
  - ".NET"
  - "양자 통신"
---

```toc
```

## YouTube Pinned를 작성하는 이유

필자는 최근 헬스장을 다니기 시작했는데, 헬스장 러닝머신에 Screen Sharing 기능이 있었다. 헬스장 러닝머신에 TV가 있어도 내가 보고 싶은 것이 아니라 케이블에서 보여주는 드라마, 영화나 보아야하는 것보다는 내가 보고 싶은 유튜브 동영상을 보는게 더 재밌기도 하고, 어쩌피 볼 유튜브 영상이라면 러닝머신을 뛰면서 보는게 인생의 절약이라는 생각이 들었다. 또한 유튜브 결제를 했기 때문에 미리 다운받아놓고 데이터나 배터리 부담도 덜할 수 있어서 적극적으로 보게되었다. 부작용이라면, 유튜브 보는게 재미있어서 러닝머신만 열심히 뛰고 근력 운동은 하나도 안하는 점이랄까? 그래도 매일 80분씩 뛰는거 자체는 나쁘지 않으리라 생각하면서 계속 유튜브를 보고 있다.

헬스장에서 보는 유튜브들은 대부분 코딩에 관련된 영상이다. 왜냐하면 그런 주제의 영상들은 집에서 집중에서 보기 힘들기 때문이다. 아무래도 딴 짓을 많이 하게 되는데, 딴 짓을 할 수 없는 러닝머신 위에서 보기 최적의 주제인 것 같다. 그런 영상들을 보다보면, 배우는 점, 깨닫는 점이 참 많다. 저런 제품이 새로 나왔으니 써보고 싶다던가, 저런 방식으로 코딩하면 더 깔끔해지겠구나, 묵혀두고 다시 한번 봐야겠다 등의 생각이 든다. 하지만 생각난 것들을 바로 적고 기록하지 않으니, 효율적으로 몸에 체득되지 않는 것이 느껴진다. 영상에서 확인한 비슷한 상황을 봤을 때, 아 그 동영상에서 어떻게 했는데~ 까지는 기억이 나는 데, 정작 어떻게 했었는지는 기억이 안 나는 것이다. 그래서 앞으로 블로그를 활성화도 하고 내 기억을 위해서 유튜브 감상평을 남기려고 한다.

## Async Debugging

<iframe src="https://www.youtube.com/embed/7POKQgdkrA4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe src="https://www.youtube.com/embed/jfxGk5rdj-0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

async await에 대한 코드 디버깅은 순서대로 이루어질 수 없고, 하나의 함수 코드가 같은 쓰레드 안에서 작동하리라는 보장이 없다. 동기 코드의 경우에는 스택을 기반으로 작동하지만, 비동기 코드의 경우 그래프와 같이 동작함으로 이해해야한다.

또한 신기한 점은 async await 코드가 컴파일되는 과정에서 Task를 주고 받는 식의 async await가 제거된 코드로 변경된다는 점이다. F#의 async await과 동작 방식은 다르겠지만 나중에 한번 C#할 때 다시 확인해보고 싶다.

## 누가, 왜, 어떻게 Cosmos DB를 사용하고 있을까요?

<iframe src="https://www.youtube.com/embed/v61t9NNWHPs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

한글 자막이 추가된 Azure Cosmos DB에 대한 소개 영상이다. 실제로 쓰는 것과는 상관없는, 홍보용 영상이기는 하지만 한국어 내용이 별로 없는 Cosmos DB 영상이라서 보았다. 실제 프로그래밍에 관한 내용보다는, 어떤 기능을 할 수 있는 지에 대한 소개와, RU라고 불리는 새로운 과금 단위에 대한 소개가 중요하다. 다만 아쉬운 점은, 지금 작성하고 있는 토이 프로젝트에서 Cosmos DB를 사용함을 통해서 상당히 애로사항이 있다는 것을 알았지만 이 영상을 통해 입문하는 사람은 알 수 없을 것이다.

## Building Beautiful Blazor apps with Tailwind CSS

<iframe src="https://www.youtube.com/embed/9YdxhhgJvrE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

BlazorWasm에서 TailwindCSS를 쓰는 방법을 알려주는 영상이다. 

초반부는 post-css등의 npm 패키지가 필요한 tailwind를 어떻게 사용하는지 보여준다. 사실 tailwind 자체보다는 어떻게 닷넷 프로젝트에 npm을 연결하는 지가 가장 궁금했던 부분인데, csproj 파일에 ``<Target>``을 이용하여 필요한 tailwind css 파일을 닷넷 빌드 전에 npm 빌드하여 가져오는 방법으로 가져온다.(41분 가량 소개됨)

중반부는 tailwind 자체에 대한 소개로 이어진다. tailwind가 utility class를 이용하여 빠르고 간편하게 스타일링할 수 있다는 점은 이미 알고 있었다. 다만, 실제 활용해본 적이 없기도하고, sass를 사용할 때 궁금했던, 어떻게 하면 utility class들을 이용하여 새로운 utility class를 만들 수 있을까 하던 점이 해결되었다. sass에서도 mixin, extend가 있지만 그거 클래스를 여러개 묶은 alias를 만드는 듯한 느낌은 아니어서 사용하기 꺼려졌다. tailwind에서는 [@apply directive](https://tailwindcss.com/docs/extracting-components#extracting-component-classes-with-apply)를 이용하여 여러 클래스를 하나의 클래스 이름으로 단순화 할 수 있다. 반복되는 여러 클래스의 사용이 있을 때, 아주 효용성이 클 것이다.

후반부에는 tailwind를 production에 올릴 때의 최적화에 관해 이야기하였다. 다만, 당장 올릴 일이 없다보니 별 관심이 있게 보지는 않았다. purge라는 키워드를 이용하여 자신이 프로젝트에 사용한 class만 존재하는 최적화된 파일을 생성하는 것 같다.

## How to secure your C# API w/ Azure Static Web Apps [13 of 16]

<iframe src="https://www.youtube.com/embed/eZQq3zw3WL4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

BlazorWasm을 활용한 Azure Static Web Apps에서 [AuthN & AuthZ](https://docs.microsoft.com/ko-kr/azure/active-directory/develop/authentication-vs-authorization)를 사용하는 방법을 소개한다. ```Microsoft.Azure.Functions.Authentication.WebAssembly``` 패키지를 이용한다. Blazor의 razor directive를 이용하여 쉽고 간편하게 페이지별 접근 권한을 설정하는데, 매우 괜찮아 보였다. 나중에 Blazor로 실제 커뮤니티 서비스를 만들게 된다면 꼭 이 동영상을 다시 볼 것이다.

## Working with Azure AD B2C in ASP.NET

<iframe src="https://www.youtube.com/embed/oG9GcYIuYQM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Azure AD B2C를 생성하고, asp.net에서 사용하는 방법을 보여준다.

## Entity Framework Community Standup - Azure Cosmos DB and EF Core

<iframe src="https://www.youtube.com/embed/nEqH_XfCfho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Blazor Server + Azure Cosmos DB + EF Core를 이용한 코드 시연 영상이다. [동영상에 나오는 내용과 코드는 Jeremy Likness의 블로그](https://blog.jeremylikness.com/blog/ef-core-and-cosmosdb-with-blazor-webassembly/)에서 확인할 수 있다.

최근에 본 유튜브 중 몇 안 되게, 지금 당장 필요한 내용이었다. 같은 기술 스택으로 토이 프로젝트를 완성하려고 했기 때문이다. 근데 사용하는 기술 스택들이 서로 다 안 친한듯 하다. Blazor Server는 Circuit으로 클라이언트의 상태를 서버쪽에서 처리하기 때문에, 일반적인 서버의 DbContext LifeCycle과는 다르게 가져가야한다. 그리고 Cosmos DB는 기본적으로 Global Distribution을 지원하려고 하는지, 기존 DB에서는 없던 Partitioning에 대한 개념과 Partition Key에 대한 이해가 필요하다. EF Core의 Key가 Cosmos DB의 Partition Key와 Unique Key와 맞지 않기 때문에 모호한 부분이 있으며, NoSQL임에도 EF Core의 Cosmos DB provider에서 List 타입이나 Object 타입을 지원하지 못해서 Stringfied해서 저장해야한다. 만약 상용 프로그램에 Cosmos DB를 써야한다면, Client를 Service로 넣어서 사용하는 방법이 더 나을 것 같다.

## Keynote: The Future of Modern Application Development with .NET and Azure

<iframe src="https://www.youtube.com/embed/ba33CqjqacA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

.NET 6에 대한 소개 영상이다. 

.NET 5에서 이룬 퍼포먼스와 .NET 6에서도 극적으로 상향되는 EF Core의 성능이 인상적이다. 

C#10에서 Top-Level Statement와 간략화된 namaspace 선언으로 종횡의 세레모니 코드를 줄였고, Minimal web API를 통해 코드를 압도적으로 간단하게 만든 면에서, 다른 경쟁 언어 프레임워크와의 간극을 줄이려했다.

MAUI를 통해서 크로스플랫폼 앱 개발을 하나의 Project로 압축시켰고, Mobile Blazor Binding을 통해서 닷넷 웹 프론트개발자도 큰 변화 없이 쉽게 멀티 플랫폼 지원을 달성시킬 수 있다.

Hot Reloading이 아직까지 전체 플랫폼에 지원이 안된 것은 다른 클라이언트 측 개발 기술에 비해서 한참 뒤쳐졌다고 생각하지만, 앞으로 지원할 예정이라고 하니, .NET 6부터는 개발 편의성면에서 많이 좋아질 것으로 생각된다.

현재 Preview 5 단계이다. 11월에 .NET Conf와 함께 공식 배포 예정이니 5개월이 남았다. 다만, 6.1이 LTS이고 6.0은 LTS가 아니니, 주의하도록 하자.

## '양자 통신'이 양자 컴퓨터를 막는 방패일까? 차세대 보안 통신 기술! [안될과학 랩미팅]

<iframe src="https://www.youtube.com/embed/x9vDVB8halo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

가끔씩 양자 컴퓨팅이 기존 보안 체계를 모두 뚫을 것이다. 라는 이야기가 있었다. 하지만 그에 대한 대안으로 양자 통신을 통해서 보안을 강화하는 방법이 있다고 한다. 이 기술에 대한 설명인데, 차근차근 따라가면서 이해할 수 있어서 좋았다.