---
public: true
category: "Post"
date: "2021-10-03T23:15:00+09:00"
title: "가상머신 세팅은 Ansible로!"
description: ""
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "review"
tags:
  - "Ansible"
  - "template"
  - "commands"
---

이번 포스팅은 교육 과정간에 학습한 **Ansible**이다.

`Ansible`은 원격 머신들을 세팅할 수 있는 프로그램이다. 1주동안의 기간 동안 배우면서, 여러 머신들이 한번의 명령어(물론 템플릿은 줄줄이 적었지만)로 후다닥 설정되는 것이 재밌었다. 다만, 이것이 수많은 가상머신에 `SSH`로 명령어를 하달하는 정도의 수준과 무엇이 다른가? 싶은 생각이 들었다. 멱등성을 통해 불필요한 동작을 배제하고 안정성을 높히고 통일된 모듈을 통해 다른 머신 환경에도 일관된 템플릿을 작성할 수 있는 `Ansible`에게는 당연히 틀린 말이지만, 느낌은 그랬다. 대량의 머신을 세팅하는 것은 서버실이 있었던 옛날부터 있었을 일이었기에 `Ansible` 이전에도 여러 제품이 있었다. 하지만 이 교육 과정에서 Ansible을 배우게 된 것은 실행 환경에 `Kubernetes`를 세팅하는 과정에서 [Kubespray](https://kubernetes.io/ko/docs/setup/production-environment/tools/kubespray/#1-5-%EC%95%84%EB%9E%98%EC%9D%98-%EC%9A%94%EA%B1%B4-%EC%B6%A9%EC%A1%B1%ED%95%98%EA%B8%B0)를 사용하는데, 이 `Kubespray`의 프로세스가 `Ansible`에 크게 의존하고 있기 때문일 것으로 추측한다.(처음부터 말해주셨으면 좋았을텐데) 가상 머신을 수 없이 돌릴 💲자산과 계획이 없는 지금이야 한때 배운 기술이지만, 회사에 들어가 내가 주도적으로 제시한다면 유효한 기술이 되지 않겠는가! 이번 포스팅을 통해 나도 뇌리에 박히게 정리해보고자 한다.

```toc
to-heading: 3
```

[Ansible 공식 사이트](https://www.ansible.com/)

## 와! 앤서블 아시는구나

## 수많은 도구들

## 설치

## 파일 구조

## 즉발형 명령어

```

```
