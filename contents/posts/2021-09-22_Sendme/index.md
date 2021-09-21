---
public: true
category: "Post"
date: "2021-09-22T01:15:00+09:00"
title: "SendMe 토이 프로젝트 후기"
description: "가입이 필요없는 초경량 무의존성 URL Redirect 토이 프로젝트 후기"
primaryImage:
  source: ../../images/project.jpg
  alt: "Project"
tags:
  - "toy project"
  - "vite"
  - "web component"
  - "Azure Cosmos DB"
  - "Azure Static Web Apps"
---

최근 시작하여 완성한 juho.kim 도메인 두번째 프로젝트 sendme에 대한 경험과 후기, 앞으로의 일정을 말하고자한다.

[✈️sendme.juho.kim](https://sendme.juho.kim)

[GitHub Repository](https://github.com/naramdash/sendme)

```toc

```

## 프로젝트를 시작한 이유

이 프로젝트는 이전부터 생각하고 있던 프로젝트이다. 실제로 깃허브에서 커밋 목록을 확인하면 6월 14일이 최초 커밋으로 확인된다. 여러 juho.kim 프로젝트의 망상들 중 나만의 도메인을 이용한 url redirection 서비스가 있으면 얼마나 재미있을까 생각했다. 예를 들면, 어떤 회사에 포트폴리오 링크를 걸어야하는데 <a>https://sendme.juho.kim/to/your-portfolio</a> 링크(지금은 없다)를 제줄한다던지, 모르는 사람에게 파일을 공유해야하는데 이해못할 원드라이브 단축 url이 아니라 읽을 수 있는 <a>https://sendme.juho.kim/to/the-file-we-share</a>링크(이것도 지금 없다)를 보낸다던지 말이다.

물론 프로젝트의 구성이 간단해보이고 스스로 바닥부터 작성이 가능하겠다는 생각이 들어서 여차저차 내 포트폴리오로 쓸 수 있지 않을까 하는 생각을 하기도 했다.

## 모든 측면의 비용을 최소화하자

이 프로젝트를 진행하면서 가장 고민했던 부분은, 생성한 링크를 통해 url redirect가 될 때의 비용이었다. 유저의 관점에서 보자면 생성한 중계 URL을 통해서 이동할 때 중계 URL이 해줘야하는 것은 `location.href = where-i-want-to.go`의 기능만 있으면 된다. 내가 이 서비스로 개인정보를 수집할 것도 아니고, 쇼핑물 중계하면서 돈을 벌 것도 아니기도 하며 서비스로서의 핵심 가치의 전달에 군더더기를 최대한 없애고 싶었다.

그래서 여차저차 갈아엎었지만, 위에서 말한 가치를 최대한 지키기 위해 vite + typescript 구성으로 작성했다.

## 수많은 갈아엎음

프로젝트의 첫번째 커밋을 따라가면 21년 6월로 도착한다. 사실 그 전에도 작성은 했었지만, 레포 자체를 엎으면서 새로 만들었다. 현재 레포에서 보이는 가장 첫번째 커밋은 Blazor Server 기반으로 작성되었다. 원래는 Front-End 프레임워크를 사용하여 CRUD 사이트를 작성한 후, Azure Static Web Apps의 Functions로 초압축 redirect 코드가 있는 HTML을 보내려고 했는데, [Static Web Apps가 Functions의 기반 url을 `/api/`로 고정](https://docs.microsoft.com/ko-kr/azure/static-web-apps/apis#constraints)해놓았기 때문에 내가 원하던 human-readable url을 만들 수가 없었기 때문이다. 그래서 Blazor Server와 Web API를 동시에 수행하는 ASP.NET Core를 Azure WebApp 으로 구동하려고 했다. 어찌보면 전통적이면서도 적절한 구성이지만, 24시간 대기하는 특성상 실제 사용량에 비해 많은 과금이 발생할 것이라는 우려가 들었다. Web Apps 와 Static Web Apps를 왔다갔다 하다가 마지막에 Static Web Apps를 선택하였다. Static Web Apps의 설정으로 [경로규칙을 설정할 수 있음](https://docs.microsoft.com/ko-kr/azure/static-web-apps/configuration)을 알았기 때문이다. 굳이 redirect HTML을 Functions로 보낼 필요는 없었다는 것을 나중에야 깨달았다.

## Vite

이번 프로젝트에 Vite를 쓰기로 결정한 것은 Vite가 강조하는 여러 면들이 마음에 들었기 때문이다. native ESM을 이용한다는 점도 마음에 들고, HMR을 이용하여 진보된 Hot-Reloading을 지원한다는 것도 좋았다. 그중에서도 제일 좋았던 것은 빠른 빌드 속도이다. 이 블로그 사이트는 빌드하는데 1분 40초 가량 걸리지만, sendme 프로젝트는 10초 안에 끝난다. 물론 웹 프레임워크들이 사용하는 복잡한 기능을 필요로 하지는 않았지만 말이다. 또한 webpack 및 babel 등으로 위시되는 무시무시한 프론트엔드 툴보다 간단하고 문서화가 잘되어 있어서 좋았다. 어찌보면 [Multi-Page App](https://vitejs.dev/guide/build.html#multi-page-app)을 지원하는 것이 Static Web Apps의 경로규칙과 함께 서비스가 유저의 redirect 비용을 최소화할 수 있는 기반이기도 했다.

## Web Component

예전부터 표준 기능으로서 나의 많은 관심을 끌었던 Web Component, 이번 프로젝트로 실전 경험을 해보기로 하였다. 기능 자체가 많지 않고 복잡하지 않은 관계로 [MDN](https://developer.mozilla.org/ko/docs/Web/Web_Components)에 나온 그대로 코드를 작성해보았다. 두 개의 컴포넌트에 한번은 생TS ONLY로, 다른 한번은 template와 함께 사용하였다.

중간중간 [lit](https://lit.dev/)이나 [fast](https://www.fast.design/) 같은 web component를 쉽게 만들어주는 라이브러리를 사용할까 싶었지만, 이미 웹 프레임워크도 안쓰는 시점에서 굳이 의존성을 안 만들겠다는 의지로 꾹 버텼다. 버텼다 뿐이지 이런 노가다 코드들을 적어야하나 싶어 많이 힘들었던 것은 사실이다. TS로 HTML 코드를 만드는게 마치 옛날에 Swing 썼을때의 기분이 떠올랐다. 그나마 Windows Form은 마우스 작업이라도 되지 이건 일일이 코드를 적어야했다. JS가 소개하는 Proxy나 Web Component 같은 기능들을 내는 것을 보았을 때, JS는 웹의 어셈블리어로 자리를 찾아가지 않나 생각이 들었다.

Web Component는 컴포넌트를 선언한다 말고는 없었기 때문에, react에서의 map으로 반복 선언하는 것들이 얼마나 그리웠는지 모른다. 또, template 코드를 Component 선언과 같은 파일에 묶으려면 template 코드를 string literal로 가지고 있어야하는 끔찍한 일이 벌어진다. 사람들이 주요한 프레임워크를 쓰는데에는 큰 이유가 있는 법이다.

## Azure Static Web Apps

[Azure Static Web Apps](https://azure.microsoft.com/ko-kr/services/app-service/static/#overview)는 [Netlify](https://www.netlify.com/)나 [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/)처럼 Static Hosting과 Serverless Functions를 묶어서 제공하는 서비스이다. GitHub Action을 통한 CI/CD를 자동 설정해준다는 점이 편하기도 하지만 제일 중요한 것은 Static File와 Functions이 같은 host를 공유하는 것으로 처리된다는 것이다. 이로 인해서 서버와 클라이언트를 연결하기 위해 CORS 설정을 굳이 안해도 되고, CORS 설정을 안하니 잘못된 CORS 설정으로 인해 발생할 수 있는 문제들이 원천적으로 차단된다는 것이 또다른 장점이겠다.

앞서 말했듯이 Static Web Apps의 경로설정을 통해 단순한 Static File Hosting이 처리할 수 없는 부분에 대한 규칙을 정해줄 수 있는데, 지금까지 막연하게 Azure Storage에 올리면 그대로 사이트가 뜨겠지 싶은 안일한 생각에 큰 경각심을 주었다. S3 같은 것들도 사실은 Apache HTTP 서버와 같은 서버로서의 역할을 하고 있던 것이 아니겠는가.(물론 가격이 싸서 다르게 생각했을 뿐)

다만 아쉬운 점은 앞에서 말했다싶이 api로 Functions의 route가 고정되어있다는 점이고, Functions 타입이 HTTP Trigger로 고정되어 있는 것이다. 물론 Static Web Apps라는 이름대로의 목적을 생각하면 아쉬울 게 없지만 하나의 앱에 하나의 서비스 로직을 모아놓고 싶을 때에는 아쉬운 부분이다.

## Azure Cosmos DB

[Azure Cosmos DB](https://azure.microsoft.com/ko-kr/services/cosmos-db/#overview)는 행성급 스케일을 지원하며 다양한 Query Language를 지원하는 NoSQL 데이터베이스이다. 중요한 건 상시 무료 제품에 Cosmos DB가 포함되어 있다는 것이다. Azure의 DB 제품 중에 가장 싼 게 Azure Cosmos DB 인듯하고 그다음이 Azure SQL 인듯 하다. 개인용으로는 이 두제품에서 멀리 벗어나는 순간 매달 치킨 반납이다.

다양한 Query Language를 지원한다고 하나, 동시에 지원하는 것은 아니다. 만들때 어떤 Query Language를 지원하게 할지 선택한다. 그래도 나만의 Query Language를 만들꺼야!하지 않은 것은 훌륭한 선택이라고 생각한다. 다만 Query Language가 달라지는 것일 뿐 본체의 기능이 달라지는 것은 아니라서 Cosmos DB란 무엇인가에 대해서는 처음부터 배워야한다.

Cosmos DB를 접할 때 가장 머리 아픈 부분은 partition key이다. 샤딩 기준인가? 싶은데 실제로 중요도의 수준은 partition key > unique key이다. 행성급 스케일에서는 partition key를 기준으로 데이터를 먼저 나눈 후에 partition key 내부에서의 unique를 관리해야하나 보다. 그래서 일반적인 unique함을 가져가고 싶다면 partition key와 unique key를 동일하게 가져가야한다. 아니면 partition key + unique key를 unique로 생각하던지.

이번 프로젝트간에 TTL 기능을 넣기 위해 expired 컬럼을 넣고 Azure Functions Time Trigger로 쿼리해서 지우는 기능을 생각하고 있었는데 [Cosmos DB 차원에서 TTL을 지원](https://docs.microsoft.com/ko-kr/azure/cosmos-db/sql/time-to-live)하고 있었다. 그래서 별도의 Azure Functions를 만들지 않아도 되어서 다행이었다.

이외에도 UDF와 같은 기능을 이용해서 쉽게 원하는 기능을 만들 수 있는 것은 좋았다. 근데 이 기능이 있어서 보편적인 함수들이 많이 없는듯한 기분이 든다. 그 반대일 수도 있다.

## 후기

블로그 이후로 오랜만에 코드를 작성하면서 즐겁게 보낸 1주였다. 지금까지는 F#, Rust 배우느랴고 프로젝트나 포트폴리오 활동을 전혀 하지 않았는데, 앞으로는 프로젝트나 포트폴리오만 해야한다. 다만 걱정되는 것은 배운 것은 F#, Rust인데 쓰는게 어째 다 Typescript이다. 어떻게든 구실을 찾아 F#과 Rust를 구겨넣어야겠다.

이번 프로젝트에서는 모든 기술들을 새로 배워가면서 해야했다. 옛날에는 새로운 것을 배우면서 제품을 작성해야한다고 하면 그 스트레스에 병원을 갈지도 모를 일이였다. 하지만, 여러가지 언어를 배우고 머리 박아가며 프로젝트를 완성하는 경험을 해보고 나니, 모르는 것을 배우는 것이 두렵지 않다. 오히려 이제 와서는 내가 아는 거 안에서 이거저거 구겨넣었겠거니 싶기도 하고 아니면 더 배우지 싶은 자신감이 든다. 실제로 4학년 졸업할 때는 PHP를 다시 배우는데 1달을 생각한다고 말한 적이 있으나 지금와서는 그냥 1주 배우고 써보면 알면 되겠지 싶은 마인드이다. 개인적으로는 좋은 발전이라고 생각한다. 만약 아직까지도 1달 걸린다고 하면 회사 면접볼 때 얼마나 마이너스 될까.

## 앞으로

앞으로도 계속 프로젝트를 진행하려고 한다. [FluidFramework](https://fluidframework.com/)를 기반으로 한 코드쉐어링 서비스를 만들지, [ScreenCapture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture)와 [Tesseract.js](https://tesseract.projectnaptha.com/) 기반의 Cyphers 게임 서비스를 만들지 고민이다. 다만 두 개 다 내가 할 수 있는 범위에 있는지 PoC를 진행해야한다.

음... 근데 또 Typescript 아닌가?
