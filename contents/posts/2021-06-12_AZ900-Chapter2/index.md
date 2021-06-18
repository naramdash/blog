---
public: true
category: "Post"
date: "2021-06-12T00:09:00+09:00"
title: "AZ900 Chapter 2 핵심 Azure 서비스에 대해 설명하기"
description: "Azure 컴퓨팅 / 네트워킹 / 스토리지 / 데이터베이스 소개"
primaryImage:
  source: ../../images/AZ900-Exam.png
  alt: "AZ900 시험"
tags:
  - "Microsoft"
  - "Azure"
  - "AZ900"
---

```toc
```

## Azure 컴퓨팅 서비스 살펴보기

### Azure Virtual Machine

#### 사용 시점

- OS(운영 체제)에 대한 완전한 제어.
- 사용자 지정 소프트웨어 실행하는 기능.
- 사용자 지정 호스팅 구성을 사용해야 하는 경우.

#### 사용 예시

- 테스트 및 개발 도중
- 클라우드에서 애플리케이션을 실행하는 경우
- 데이터 센터를 클라우드로 확장하는 경우
- 재해 복구 도중

#### VM 스케일링

- 가상 머신 크기 집합(Virtual Machine Scale Sets): 부하 분산된 동일한 VM 그룹을 만들고 관리
- Azure Batch: 수십, 수백 또는 수천 개의 가상 머신으로 스케일링함으로써 대규모 병렬 및 고성능 컴퓨팅(HPC) 일괄 작업을 수행

### Azure App Service

App Service를 사용하면 **인프라를 관리할 필요 없이** 원하는 프로그래밍 언어로 웹앱, 백그라운드 작업, 모바일 백 엔드 및 RESTful API를 빌드하고 호스트

#### 유형

- 웹앱
    
  App Service는 ASP.NET, ASP.NET Core, Java, Ruby, Node.js, PHP 또는 Python을 사용하여 웹앱 호스트가 전체 지원됩니다. Windows 또는 Linux를 호스트 운영 체제로 선택할 수 있습니다.
- API 앱
  
  웹 사이트를 호스트하는 것처럼 원하는 언어 및 프레임워크를 사용하여 REST 기반 웹 API를 빌드할 수 있습니다. 전체 Swagger 지원과 함께 Azure Marketplace에서 API를 패키지 및 게시하는 기능을 사용할 수 있습니다. 생성된 앱은 HTTP 또는 HTTPS 기반 클라이언트에서 사용할 수 있습니다.
- WebJobs
  
  WebJobs 기능을 사용하여 웹앱, API 앱 또는 모바일 앱과 동일한 컨텍스트에서 프로그램(.exe, Java, PHP, Python 또는 Node.js) 또는 스크립트(.cmd, .bat, PowerShell 또는 Bash)를 실행할 수 있습니다. 프로그램과 스크립트는 트리거를 통해 예약하거나 실행할 수 있습니다. WebJobs는 종종 애플리케이션 로직의 일부로 백그라운드 작업을 실행하는 데 사용됩니다.
- 모바일 앱
  
  App Service의 Mobile Apps 기능을 사용하여 iOS 및 Android 앱의 백 엔드를 빠르게 빌드할 수 있습니다. Azure Portal에서 몇 번만 클릭하면 다음을 수행할 수 있습니다.
  - 클라우드 기반 SQL 데이터베이스에 모바일 앱 데이터를 저장합니다.
  - MSA, Google, Twitter 및 Facebook과 같은 일반적인 소셜 공급 기업에 대해 고객을 인증합니다.
  - 푸시 알림을 보냅니다.
  - C# 또는 Node.js에서 사용자 지정 백 엔드 논리를 실행합니다.

### 인프라 관련 사항 자동 처리

- 배포와 관리 기능이 플랫폼에 통합됩니다.
- 엔드포인트에 보안이 설정됩니다.
- 높은 트래픽 부하를 처리하기 위해 사이트를 빠르게 스케일링할 수 있습니다.
- 기본 제공 부하 분산 및 Traffic Manager가 고가용성을 제공합니다.

### Azure Container Instance & Azure Kubernetes Service

#### 컨테이너

- 가상화 환경
- 저용량이며 동적 생성, 스케일 아웃 및 중지를 할 수 있도록 설계
- 수요 변화에 대응할 수 있도록 설계
- 컨테이너를 사용하여 크래시 또는 하드웨어 중단이 발생한 경우 빠르게 다시 시작

#### Azure Container Instance

- 가상 머신을 관리하거나 추가 서비스를 채택하지 않고도 Azure에서 컨테이너를 실행하는 가장 빠르고 간단한 방법을 제공
- 실행되는 컨테이너를 업로드할 수 있는 PaaS(Platform as a Service) 제공

#### Azure Kubernetes Service

- 분산형 아키텍처와 대량의 컨테이너가 있는 완벽한 컨테이너용 오케스트레이션 서비스
- 오케스트레이션은 다수의 컨테이너와 상호 작용 방식을 자동화 및 관리하는 작업

### Azure Functions

#### 서버리스 컴퓨팅

- 서버의 추상화
  
  서버리스 컴퓨팅은 실행하는 서버를 추상화합니다. 서버 인스턴스를 명시적으로 예약하지 않습니다. 플랫폼이 해당 기능을 관리합니다. 각 함수 실행은 다른 컴퓨팅 인스턴스에서 실행될 수 있습니다. 해당 실행 컨텍스트는 코드에 투명합니다. 서버리스 아키텍처를 통해, 고가용성으로 실행되는 코드를 배포합니다.
- 이벤트 기반 크기 조정
  
  서버리스 컴퓨팅은 예정된 이벤트에 응답하는 워크로드에 대해 매우 적합합니다. 이벤트에는 다음을 통해 수행되는 트리거가 포함됩니다.
  - 타이머(예: 매일 오전 10시 UTC에 함수를 실행해야 하는 경우).
  - HTTP(API 및 웹후크 시나리오).
  - 큐(예: 주문 처리).
  - 이 외에도 많은 기능이 있습니다.
- 전체 애플리케이션을 작성하는 대신 개발자는 함수를 작성하고, 함수에는 트리거 및 바인딩에 관한 코드 및 메타데이터 모두가 포함됩니다. 플랫폼은 자동으로 함수 실행을 예약하고 예정된 이벤트의 비율에 따라 컴퓨팅 인스턴스의 수를 조정합니다. 트리거는 함수가 호출되는 방식을 정의합니다. 바인딩은 코드 내에서 서비스에 연결하기 위한 선언적 방식을 제공합니다.

- 마이크로 청구
  
  기존 컴퓨팅은 웹 사이트 호스팅을 위한 월간 또는 연간 요금 지급과 같이 시간 블록에 대해 요금을 청구합니다. 이 청구 방법은 편리하지만 항상 비용 효율적이지는 않습니다. 고객의 웹 사이트에서 하루에 한 번만 방문하는 경우에도 일일 가용성 전체에 대해 지불하게 됩니다. 서버리스 컴퓨팅을 사용하면 코드가 실행되는 시간에 대해서만 비용을 지불합니다. 활성 함수 실행이 발생하지 않는 경우 요금이 부과되지 않습니다. 예를 들어, 코드가 하루에 한 번 2분 동안 실행되는 경우 실행 1회와 컴퓨팅 시간 2분에 대해 요금이 부과됩니다.

#### Azure Functions

- 기본 플랫폼이나 인프라가 아닌, 서비스를 실행하는 코드에 관해서만 관심이 있는 경우
- 수요에 따라 자동으로 스케일링되므로 수요가 가변적일 때 좋은 선택
- 함수가 실행되는 동안 사용되는 CPU 시간에 대한 요금만 부과
- 함수는 상태 비저장 또는 상태 저장 중 하나일 수 있습니다. 함수는 상태 비저장(기본값)인 경우 이벤트에 응답할 때마다 다시 시작되는 것처럼 동작합니다. 함수가 상태 저장(Durable Functions라고 함)인 경우 이전 작업을 추적하기 위해 컨텍스트가 함수를 통해 전달됩니다.
- 서버리스 컴퓨팅의 주요 구성 요소

#### Azure Logic Apps

- 비즈니스 시나리오를 자동화하도록 설계되고 미리 정의된 논리 블록에서 빌드된 ‘워크플로’를 실행 (코드가 아님)
- 트리거를 통해 시작
- 비주얼 디자이너를 사용하여 논리 앱 워크플로를 만듬
- Azure는 다양한 서비스와 상호 작용하는 200개가 넘는 다양한 커넥터 및 처리 블록을 제공

### Windows Virtual Desktop

Azure의 Windows Virtual Desktop은 클라우드에서 실행되는 데스크톱 및 애플리케이션 가상화 서비스입니다. 이를 통해 사용자는 모든 위치에서 클라우드 호스트 버전의 Windows를 사용할 수 있습니다. 

#### 장점

- 최적의 사용자 환경 제공
- 보안 강화
- 간소화된 관리
- 성능 관리
- 다중 세션 Windows 10 배포

#### 비용 절감
- Microsoft 365 라이선스가 있는 경우 추가 비용 없이 Windows Virtual Desktop을 사용
- Azure Reserved Virtual Machine Instances


## Azure 네트워킹 서비스 살펴보기

### Azure Virtual Network

- 격리 및 구분
- 인터넷 통신
- Azure 리소스 간 통신
- 온-프레미스 리소스와 통신
- 네트워크 트래픽 라우팅
- 네트워크 트래픽 필터링
- 가상 네트워크 연결

### Azure VPN Gateway

Azure VPN Gateway 인스턴스는 Azure Virtual Network 인스턴스에 배포되며 다음과 같은 연결이 가능하도록 설정합니다.

- 사이트 간 연결을 통해 온-프레미스 데이터 센터를 가상 네트워크에 연결합니다.
- 지점 및 사이트 간 연결을 통해 개별 디바이스를 가상 네트워크에 연결합니다.
- 네트워크 간 연결을 통해 가상 네트워크를 다른 가상 네트워크에 연결합니다.

#### VPN 유형

- 정책 기반 VPN: 각 터널을 통해 암호화되어야 하는 패킷의 IP 주소를 정적으로 지정
- 경로 기반 VPN:  IP 주소를 정의하는 것이 너무 번거로울 경우 경로 기반 게이트웨이를 사용할

#### 필요한 Azure 리소스

![필요한 Azure 리소스 다이어그램](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-networking-fundamentals/media/resource-requirements-for-vpn-gateway-2518703e.png)

- 가상 네트워크
- GatewaySubnet
- 공용 IP 주소
- 로컬 네트워크 게이트웨이
- 가상 네트워크 게이트웨이
- 연결

#### 필요한 온-프레미스 리소스

- VPN 디바이스
- 공용(인터넷 라우팅 가능) IPv4 주소

#### 고가용성 시나리오

- 활성/대기
  
  ![활성/대기 다이어그램](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-networking-fundamentals/media/active-standby-c4a3c14d.png)
- 활성/활성

  ![활성/활성 다이어그램](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-networking-fundamentals/media/dual-redundancy-d76100c9.png)
- ExpressRoute 장애 조치(failover)
- 영역 중복 게이트웨이

### Azure ExpressRoute

![Azure ExpressRoute 다이어그램](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-networking-fundamentals/media/azure-expressroute-overview-5520731d.png)

연결 공급자의 도움을 받아 프라이빗 연결을 통해 온-프레미스 네트워크를 Microsoft 클라우드로 확장

ExpressRoute는 온-프레미스 인프라와 Azure 인프라 간의 프라이빗 연결

ExpressRoute 연결은 퍼블릭 인터넷을 통해 이동하지 않습니다. 이 기능을 사용하면 ExpressRoute 연결은 인터넷을 통한 일반 연결보다 안정적이고 속도가 빠르며 대기 시간이 일관되고 보안성이 높습니다.

#### 장점

- 연결 공급자를 통한 온-프레미스 네트워크와 Microsoft Cloud 간의 3계층 연결입니다. 임의의(IPVPN) 네트워크, 지점간 이더넷 연결, 이더넷 Exchange로 가상 간 연결을 통해 연결할 수 있습니다.
- 모든 지정학적 지역에 걸쳐 Microsoft 클라우드 서비스에 연결합니다.
- ExpressRoute 프리미엄 추가 기능으로 모든 지역에 걸쳐 Microsoft 서비스에 글로벌 연결합니다.
- BGP를 통해 네트워크와 Microsoft 간 동적 라우팅
- 높은 안정성을 위한 모든 피어링 위치의 기본 중복성입니다.
- 연결 가동 시간 SLA입니다.
- 비즈니스용 Skype에 대한 QoS 지원.

#### 연결 모델

- 클라우드 교환의 공동 배치
- 지점 간 이더넷 연결
- 임의 네트워크

Microsoft 클라우드 서비스에 연결할 수 있다

## Azure Storage 서비스 살펴보기

### Azure Storage

#### Azure Storage 계정

![Azure Storage 계정과 Storage의 관계](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-storage-fundamentals/media/account-container-blob-4da0ac47.png)

Azure Storage를 사용하려면 먼저 데이터 개체를 저장할 Azure Storage 계정을 만들어야 합니다.

스토리지 계정에는 Blob, 파일 및 디스크와 같은 모든 Azure Storage 데이터 개체가 포함됩니다.

스토리지 계정은 HTTP 또는 HTTPS를 통해 전 세계 어디에서나 액세스할 수 있는 Azure Storage 데이터에 고유한 네임스페이스를 제공합니다. 이 계정의 데이터는 안전하고 가용성과 내구성이 높으며 대규모 확장이 가능합니다.

### Disk Storage
![Azure VM에서 Disk Storage를 활용](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-storage-fundamentals/media/azure-disks-7841e01e.png)

Azure 가상 머신에 디스크를 제공

Disk Storage를 사용하면 연결된 가상 하드 디스크에서 데이터를 영구적으로 저장 및 액세스할 수 있습니다.

### Azure Blob Storage 

클라우드용 개체 스토리지 솔루션

방대한 양의 데이터(예: 텍스트 또는 이진 데이터)를 저장

비정형이므로 포함될 수 있는 데이터 종류에 대한 제한이 없음

#### 적합한 경우 

- 브라우저에 이미지 또는 문서 직접 제공
- 분산 액세스용 파일 저장.
- 비디오 및 오디오 스트리밍.
- 백업/복원, 재해 복구 및 보관용 데이터 저장
- 온-프레미스 또는 Azure 호스팅 서비스에서 분석하기 위한 데이터 저장.
- 가상 머신에 대해 최대 8TB의 데이터를 저장합니다.

### Azure Files

![Azure Files 예제 시나리오](https://docs.microsoft.com/ko-kr/learn/azure-fundamentals/azure-storage-fundamentals/media/azure-files-5f942c3e.png)

산업 표준 SMB(서버 메시지 블록) 및 네트워크 파일 시스템(미리 보기) 프로토콜을 통해 액세스할 수 있는 완전 관리형 파일 공유를 제공

일반적인 사용 시나리오로는 전 세계 어디서나 파일을 공유하고, 진단 데이터 또는 애플리케이션 데이터를 공유하는 경우

파일을 가리키는 URL을 사용하여 전 세계 어디에서나 파일에 액세스할 수 있다

또한 SAS(공유 액세스 서명) 토큰을 사용하여 특정 기간에 프라이빗 자산에 액세스할 수 있습니다.

#### 적합한 경우

- 여러 온-프레미스 애플리케이션에서 파일 공유를 사용
- 구성 파일을 파일 공유에 저장하고 여러 VM에서 액세스
- 데이터를 파일 공유에 쓰고 이 데이터를 나중에 처리하거나 분석


### Blob 액세스 계층

- 핫 액세스 계층
  
  자주 액세스하는 데이터(예: 웹 사이트의 이미지)를 저장하는 데 최적화되어 있습니다.
- 쿨 액세스 계층
  
  자주 액세스하지 않고 30일 이상 저장하는 데이터(예: 고객에 대한 송장)에 최적화되어 있습니다.
- 보관 액세스 계층
  
  거의 액세스하지 않고 180일 이상 보관하며 유연한 대기 시간 요구 사항(예: 장기 백업)이 있는 데이터에 적합합니다.

## Azure Database 및 분석 서비스 살펴보기

### Azure Cosmos DB 살펴보기

전 세계에 배포된 다중 모델 데이터베이스 서비스

많이 사용되는 여러 API(SQL, MongoDB, Cassandra, Tables, Gremlin) 중 하나를 사용하여 한 자릿수 밀리초의 빠른 데이터 액세스를 활용

지속적으로 변경되는 데이터를 지원하기 위해 응답성이 뛰어난 “Always On” 애플리케이션을 빌드할 수 있는 스키마 없는 데이터를 지원

### Azure SQL Database

Microsoft SQL Server 데이터베이스 엔진의 최신 안정화 버전을 기반으로 하는 관계형 데이터베이스

기본 제공되는 고가용성, 백업 및 다른 일반적인 유지 관리 작업이 포함된 완전 관리형 서비스

#### 마이그레이션

Azure Database Migration Service를 사용하여 최소한의 가동 중지 시간으로 기존의 SQL Server 데이터베이스를 마이그레이션할 수 있습니다.

마이그레이션을 수행하기 전에 필요한 변경 사항을 설명하는 권장 사항을 제공하는 평가 보고서를 생성할 수 있습니다.

필요한 수정을 평가하고 해결한 후 마이그레이션 프로세스를 시작할 수 있습니다. 

Azure Database Migration Service가 필요한 모든 단계를 수행합니다. 앱에서 연결 문자열만 변경해주면 됩니다.

### Azure Database for MySQL

클라우드의 관계형 데이터베이스 서비스이며 MySQL Community Edition 데이터베이스 엔진 5.6, 5.7 및 8.0 버전을 기반

기본 제공 보안, 내결함성 및 데이터 보호를 모든 MySQL 서버용 Azure Database에서 활용

MySQL용 Azure Database에서 특정 시점 복원을 사용하여 서버를 최대 35일 전의 상태로 복원

- 추가 비용 없이 기본 제공되는 고가용성
- 예측 가능한 성능 및 포괄적인 종량제 가격 책정
- 필요에 따라 몇 초 만에 스케일링
- 중요한 미사용 데이터 및 사용 데이터 보호 기능
- 자동 백업
- 엔터프라이즈급 보안 및 규정 준수

### Azure Database for PostgreSQL

커뮤니티 버전의 오픈 소스 PostgreSQL 데이터베이스 엔진을 기반

- 온-프레미스 리소스에 비해 높은 기본 고가용성. 애플리케이션 가용성을 유지하기 위한 추가 구성, 복제 또는 비용이 필요 없습니다.
- 단순하고 유연한 가격 책정. 소프트웨어 패치, 자동 백업, 모니터링 및 보안이 포함된 가격 책정 계층 중 선택하는 계층에 따라 예측 가능한 성능을 얻을 수 있습니다.
- 필요에 따라 몇 초 만에 스케일 업 또는 스케일 다운합니다. 필요한 대로 컴퓨팅 또는 스토리지 규모를 독립적으로 조정하여 사용량에 맞게 서비스를 조정할 수 있습니다.
- 조정 가능한 자동 백업 및 특정 시점 복원(최대 35일).
- 엔터프라이즈급 보안 및 규정 준수를 통해 중요한 미사용 데이터 및 사용 중인 데이터를 안전하게 보호. 이 보안은 디스크의 데이터 암호화 및 클라이언트와 서버 통신 간 SSL 암호화에 적용됩니다.

#### 배포 옵션

- 단일 서버
  - 추가 비용 없이 기본 제공되는 고가용성(99.99% SLA)
  - 예측 가능한 성능 및 포괄적인 종량제 가격 책정
  - 필요에 따라 몇 초 만에 수직적 스케일링
  - 서버를 평가하기 위한 모니터링 및 경고
  - 엔터프라이즈급 보안 및 규정 준수
  - 중요한 미사용 데이터 및 사용 데이터 보호 기능
  - 최대 35일 동안 자동 백업 및 지정 시간 복원
- 하이퍼스케일 (Citus)
  - 분할을 사용하여 여러 머신에 걸쳐 쿼리를 수평으로 스케일링, 병렬 처리하여 큰 데이터 세트에서 더 빠르게 응답 (100GB의 데이터에 이르거나 이미 초과한 워크로드를 처리)
  - 다중 테넌트 애플리케이션 지원
  - 실시간 운영 분석 및 높은 처리량 트랜잭션 워크로드 지원


### Azure SQL Managed Instance

Azure SQL Database와 마찬가지로 Azure SQL Managed Instance는 PaaS(Platform as a Service) 데이터베이스 엔진

[Azure SQL Managed Instance는 Azure SQL Database에서 사용할 수 없는 몇 가지 옵션을 제공](https://docs.microsoft.com/ko-kr/azure/azure-sql/database/features-comparison/) (Azure SQL Database는 기본 SQL_Latin1_General_CP1_CI_AS 서버 데이터 정렬만 사용 등)

#### 마이그레이션

Azure SQL Managed Instance를 사용하면 Azure DMS(Database Migration Service)나 네이티브 백업 및 복원을 사용하여 SQL Server의 온-프레미스 데이터를 클라우드로 쉽게 마이그레이션

사용하는 모든 기능을 검색한 후 Azure SQL Managed Instance로 마이그레이션할 수 있는 온-프레미스 SQL Server 인스턴스를 평가하여 차단 문제가 있는지 확인

문제를 해결한 후에는 데이터를 마이그레이션한 다음, 애플리케이션에서 연결 문자열을 변경하여 온-프레미스 SQL Server에서 Azure SQL Managed Instance로 전환할 수 있습니다.

### 빅데이터 및 분석

#### Azure Synapse Analytics (Azure SQL Data Warehouse)

엔터프라이즈 데이터 웨어하우징 및 빅 데이터 분석을 통합하는 무제한 분석 서비스

#### Azure HDInsight

Apache Hadoop 기반 분석 서비스

엔터프라이즈용 완전 관리형 오픈 소스 분석 서비스

#### Azure Databricks

Apache Spark 기반 분석 서비스

#### Azure Data Lake Analytics

빅 데이터를 단순화하는 주문형(on-demand) 분석 작업 서비스