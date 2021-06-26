---
public: true
category: "Post"
date: "2021-06-27T04:15:00+09:00"
title: "YouTube Pinned - .NET 특집"
description: ".NET과 Azure 위주의 가성비 최고 유튜브 목록들"
primaryImage:
  source: ../../images/YouTube-Pinned.jpg
  alt: "YouTube Pinned"
tags:
  - "YouTube"
  - "ASP.NET Core"
  - "Entity Framework Core"
  - "ML.NET"
  - "Xamarin"
  - "Azure Functions"
  - "Azure Web PubSub"
---

```toc
```

## ASP.NET Core 101

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLdo4fOcmZ0oW8nviYduHq7bmKode-p8Wy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

ASP.NET Core에 대한 기초 강좌 시리즈이다. dotNET이나 다른 Microsoft 관련 채널을 구독하다보면 많이 만나게 되는 Leslie Richardson과 Scott Hanselman이 진행한다. 

크게 3단계로 진행이 된다.
1. Razor를 이용한 Server-Side Rendering
2. Web API를 기존 프로젝트에 추가 
3. Blazor Server를 기존 프로젝트에 추가

다른 것보다 이 강좌에서 내가 많이 배운 것은 ASP.NET은 그자리 그대로 있고, 필요에 따라 MVC, Web API, ServerSideBlazor와 같은 기능을 ``Startup.cs``에 구성하면 된다는 점이다. 어찌보면 당연한 이야기겠지만, dotnet new 할 때의 template를 어떻게 하면 벗어나는지 몰랐기 때문에 이 시리즈를 통해서 ASP.NET 자체는 기능을 제공하기 위한 프레임워크라는 것을 감각적으로 느낄 수 있었다.

## Entity Framework Core

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLUKeKSeg3QeTic8R0JyYniHa4n2fBU3zE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

.NET에서 많이 활용되는 ORM 프레임워크인 EF Core에 대한 기초 강좌 시리즈이다.

지금까지 필자가 프론트엔드 작업 위주로 하느라, 실제로 DB 및 서버 작업을 별로 한 적이 없어서 매우 관심있게 보았다. 특히 JPA와는 기본적으로 코드를 사용하는 방식이 다르기 때문에, 더 집중하게 되었다. 나중에야 알게된 사실이지만, EF Core의 DbContext는 작업단위 LifeCycle을 가진다고 한다. 이 점도 JPA Repository와는 많이 다르지 않을까? 만약 작업단위(Scoped)로 생성되는 객체라면 ReservedConnections 같은 것은 어떻게 지속되는 것일까?

## ML.NET

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLdo4fOcmZ0oUDTvk5XMNues09FnuB_D0u" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

ML.NET에 대한 간단한 소개 시리즈이다. 

이 강의에서는 ML.NET의 AutoML의 기능을 통해 쉽게 최상의 모델을 추출하는 과정을 위주로 설명한다. 그러다보니, ML 자체의 도메인보다는, 어떻게 ML 추출물(모델)을 만들고 프로젝트에서 활용할 수 있는가를 설명한다. 이 과정을 한번은 Visual Studio GUI에서, 한번은 VS Code에서 dotnet cli를 통해 진행한다. 만약 빠른 시간 내에 큰 투자 없이 머신러닝이라는 이름의 간판을 달고 싶다면, 주저없이 이 시리즈를 다시 들어보고 적용할 것이다.


## Xamarin 101

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLdo4fOcmZ0oU10SXt2W58pu2L0v2dOW-1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Xamarin에 대한 간단한 소개 시리즈이다.

이 강의는 크게 3부분으로 나뉜다.
1. Xamarin의 목적, 설치 과정, 아키텍쳐
2. XAML을 이용한 MVVM 패턴 앱 개발
3. C# Only를 이용한 MVVM 패턴 앱 개발

사실 이 강의를 통해서 Xamarin 보다는 .NET 계열 GUI앱에 대한 MVVM 패턴 작성에 대해서 더 알 수 있었다. 아직 WPF를 많이 쓴다지만은, MAUI가 다가오는 이 시점에서 .NET MVVM 패턴을 익힐 가장 좋은 프레임워크는 Xamarin 아닐까?

## 서버리스로 나만의 단축 URL 서비스 만들어보기

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLDZRZwFT9Wkuvx3xZW40rKKUO8YlSD0t1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

단축 URL 제공 서비스 제작 시나리오를 통해 Azure Functions를 이용하는 가이드 튜토리얼이다.

최근에 한국 Microsoft 관련 비디오에 많이 얼굴을 비추시는 Justin Yoo가 진행한다. Azure Functions를 C#으로 작성하고 Azure Table Storage 서비스를 연결하여 단축 url을 등록하고, url로 진입하여 redirect 되는 기능을 구현한다. 한국어이기도 하고 쉽게 잘 설명해주니, 따라가는데 큰 지장이 없을 뿐더러, 이 강의를 통해 토이 프로젝트를 만들고 싶다는 욕망도 생겼다.

기존의 ASP.NET 같은 곳에서 Scoped나 Singleton으로 관리하는 DI 요소를 어떻게 Azure Functions에서 구현했는지를 확인한 것이 가장 큰 수확이었다.

다만 아쉬운 점은 Visual Studio를 이용한 튜토리얼이라는 점이고(Visual Studio Code 같은 무료 기반 툴에 cli로 작업을 했으면 했다), 다른 점은 Azure Storage 내에 Table 형태로 저장하는 서비스는 이미 Azure Cosmos DB로 넘어간지 오래인 것 같은데 어떻게 사용하시는지 모르겠다. 이부분은 알아서 Microsoft Learn을 보고 알아서 대체해야 할 것이다.

## An overview of Azure Web PubSub

<iframe width="560" height="315" src="https://www.youtube.com/embed/OX4tNrjRr4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

새로 나온 미리보기 서비스인 [Azure Web PubSub](https://azure.microsoft.com/ko-kr/services/web-pubsub/)에 대해서 소개한다.

[Azure SignalR Service](https://azure.microsoft.com/ko-kr/services/signalr-service/)와 근간은 매우 유사한 것으로 보이지만, WebSocket 서버리스에 집중한 서비스로 보인다. 가격 체계도 완전히 같다.

특히나 코로나를 통한 원격 시대에서 실시간 서비스는 주목받는다. 서버리스라서 관리에 대한 부담이 적고 WebSocket 지원을 통해 서비스의 접근성이 높으니 기대가 된다.

[도큐먼트](https://azure.github.io/azure-webpubsub/getting-started/introduction)와 [데모 사이트들](https://azure.github.io/azure-webpubsub/demos/whiteboard)도 있는데 실제 사용해보면 재미있다. 이 블로그에 실시간 채팅 기능을 집어넣고 싶다.