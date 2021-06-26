---
public: true
category: "Post"
date: "2021-06-26T23:30:00+09:00"
title: "YouTube Pinned"
description: "인상 깊게 본 YouTube 영상들과 리뷰"
primaryImage:
  source: ../../images/YouTube-Pinned.jpg
  alt: "YouTube Pinned"
tags:
  - "YouTube"
  - "Static pages"
  - "C#"
  - "Zero Trust"
  - "Blazor"
  - "Auth"
  - "Dynamic Component"
---

```toc
```

## How to quickly develop static pages in LINE -Korean version-

<iframe width="560" height="315" src="https://www.youtube.com/embed/lclP6MbSdG4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

소리가 굉장히 작다.

Line에서 특정 이벤트용 웹페이지를 정적으로 배포할 때, 프로세스와 툴(Land Press)을 적용시켜 배포 기간을 단축시킨 내용에 관한 영상이다. 인상 깊었던 것은 정적페이지를 필요로하는 사람이 직접 쉽게 구현하게 하도록 하는 WYSIWYG 툴이었다. 사실 개발자의 관점에서 보자면, 결국 못하겠는것이 어디있겠는가. 테스트 배포는 Azure Static Web Apps에도 가능하고, uglify minify는 빌드 단계에 적용하면 될 것이다. 하지만, 업무에 참여하는 사람의 수를 줄이고, 커뮤니케이션을 줄임으로써 업무 기간을 단축시켰다는게 가장 중요한 것이 아니겠는가. Line이라는 IT 기업이라서 이루어낼 수 있었는지, Line이라는 거대한 기업 내에서도 해낸 일인지 궁금하다.

글을 쓰다보니 비슷한 툴이 생각난다. [배달의민족의 만다오](https://woowabros.github.io/woowabros/2021/03/08/mandao.html)이다.

## C# Language Highlights: Records

<iframe width="560" height="315" src="https://www.youtube.com/embed/gZOwXiOYHHc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

C# 9과 함께 등장한 Record에 대한 소개 영상이다.

처음 보았을 때는 F#의 [Record](https://docs.microsoft.com/ko-kr/dotnet/fsharp/language-reference/records)를 [C#](https://dev.to/wrijugh/c-9-0-inheritance-in-record-type-ffi)으로 도입한 형태이다. 비파괴 변경과 == operator에 대한 지원이 그렇다. 그렇기도 하지만, 가장 비슷한 형태는 Kotlin의 [Data Class](https://kotlinlang.org/docs/data-classes.html)가 아닐까 싶다. 하지만 코틀린하고 완벽하게 동일한 것도 아니다. C#의 Record는 상속이 지원되기도 하고 비변경 강제 때문이다. 당장은 써보지 않지만, 밀어주는 기능이기도 하니, 앞으로 데이터 타입을 생성할 때 염두에 두어야겠다.

## 재택근무 시 보안과 협업을 모두 달성하는 방법? | Zero Trust

<iframe width="560" height="315" src="https://www.youtube.com/embed/zKm5RG3iGEg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Microsoft Korea에 올라온, Microsoft Zero-Trust에 대한 한국어 웨비나이다. 언뜻 어려울듯 싶은 주제이지만, 발표자의 멋진 목소리와 능숙한 내용 전달으로 (물론 소개 영상이기에 완전 어렵게 들어가겠냐만은) 쉽게 이해할 수 있었다.

공성전과 같은 보안전이 도둑으로부터 박물관을 지키는 양상으로 변경되었다. BYOD(Bring Your Own Device)나 코로나를 통해 그 변화가 가속화되었다. 이러한 상황에 대한 새로운 보안 기조는 Zero-Trust라는 것이다. 언제나 검증하면고, 최소한의 권한만 주면서, 침해 상황을 가정한 보안 태세를 지키는 것이다.

후반부로 가면 Zero-Trust 보안 원칙에 해당하는 Microsoft 전시장으로 바뀌지만, 전반적인 내용은 훌륭하다고 생각한다.

## Authentication and Authorization in Blazor

<iframe width="560" height="315" src="https://www.youtube.com/embed/evNRI7h_4Zk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

인증과 권한에 따른 Blazor View를 어떻게 구현해야하는지를 자세히 설명하고 있다.

매번 Blazor에 관련된 영상을 보다보면, 그 성질이 판이하게 다른 Server와 WASM이 Blazor로 묶여있는 것은 참 신기하다. ASP.NET의 숨겨놓은 힘이 2020년대가 되서야 그 힘을 발휘하는 것일까? 많은 규칙을 통해 간결하게 기능 구현할 수 있는 Blazor이기에, 쓰고 싶은 기능을 놓치지 않는 것이 중요하다고 생각한다.

## Blazor .NET 6- Dynamic Components - 4 Examples of DynamicComponent

<iframe width="560" height="315" src="https://www.youtube.com/embed/6JIADmG2kxo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

.NET6의 Blazor에 제공된다고 하는 Dynamic Component에 대해서 소개하고 있다.

사실 이 기능은 아직 제대로, 공식적으로, 소개된 적은 없는 기술이다. [.NET 6 ASP.NET Core preview 1 내의 간략한 소개](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-1/) 

scripting 방식으로 Dynamic 화면 렌더링을 지원하는 기술이다. 이를 보면서 React Native나, Ionic과 같은 스크립트 언어기반 크로스 플랫폼 앱 프레임워크의 경우에 지원하는 [CodePush](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/)나 [Live Update](https://ionic.io/docs/appflow/quickstart/deploy) 같은 기술이 생각났다. Blazor도 이러한 기능을 제공할 수 있는 근간을 구축한 후, Visual Studio App Center에서 CodePush for Mobile Blazor Binding으로 제공할(팔) 생각 아닐까?