---
public: true
category: "Post"
date: "2021-10-01T23:55:00+09:00"
title: "가상머신 생성은 Vagrant로!"
description: ""
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "review"
tags:
  - "Vagrant"
  - "Virtual Machine"
  - "template"
  - "commands"
---

이번 포스팅은 교육 과정간에 학습한 **Vagrant**이다.

사실 `Vagrant`는 `Kubernetes` 세팅 때문에 겸사겸사 몇 시간 배운 것이지만, 꽤나 마음에 드는 제품이다. 쉽게 말하자면 **가상머신을 위한 도커**랄까? 이제껏 여러 가상머신 구동 프로그램은 있었지만, 선언적인 템플릿과 쉬운 CLI를 통해서 사용 부담을 확 낮춘 느낌이다. 쉽게 가상머신을 구동하는 만큼 운영뿐만 아니라 개발에서도 쉽게 사용하는 것이 그들의 목표 중 하나이다. 자세히 배운 것은 아니지만, 공식 문서를 파헤쳐보며 당장 필요한 것들을 알아보도록 하겠다.

```toc
to-heading: 2
```

[Vagrant 공식 사이트](https://www.vagrantup.com/)

## 왜 써야하는가

Oracle Linux 써보겠다고 iso 파일 다운받고, GUI에서 머신 세팅하고, iso 삽입한 다음 운영체제 설치한다고 이거저거 누르고... 고정IP 설정한다치면 머신 안에서 터미널로 이거저거 쑤시고... 하나 더 만들려면 운영체제 설치하고 스냅샷을 찍어놨으면 복제하고, 안 찍어놨으면 처음부터 다시...

머신을 세팅하는 머신이 된 기분이다. 하지만 `Vagrant`가 있다면? 마치 `Docker`에서 이미지 가져오고 컨테이너 실행하는 것처럼 경쾌하게 진행할 수 있다. 코드로 되어있기 때문에 관리와 수정, 반복이 무진장 쉬운 것도 장점이다.

머신을 배포해야하는 IT관리자 입장에서만 편할까? 그렇지 않다는 것이 공식사이트의 입장이다. 만약 내가 여러 프로젝트를 담당해야하는데, 어떤 프로젝트는 yarn을 쓰고, 어떤 프로젝트는 npm6을 쓰고, 어떤 프로젝트는 npm7를 쓰고 어떤 프로젝트는 node 16을 쓴다면??? 아마 이짓거리를 허용한 모두의 칼라에 접속해 그 진상을 파악해야하는 것도 중요하겠지만, 일단 그 프로젝트들이 내 컴퓨터에서 돌아가게 만드는 것이 우선일 것이다. "node 버전 관리자를 사용해요"라는 의견이 있겠지만, `vagrant`가 있는 이상 그런 건담 파츠 갈아끼우는 듯한 복잡함과 `0.~` 버전의 비공식 커뮤니티 지원 해결책은 사용하지 않아도 된다. 답은 간단해진다. 프로젝트별로 가상머신을 설치 한 후 한곳 한곳 다른 의존성을 설정하면 된다!(기립박수) 어? 그러면 "`docker`를 사용해서 해결하는 것은 어떤가요?"라고 할 수 있다. 좋은 의견이다. 나도 아직은 `vagrant`를 개발에 활용한 적은 없으므로 비슷한 생각을 한 적이 있다. 다만 컨테이너의 이미지 레이어와 볼륨 마운트 방식으로는 개발 환경에 사용하기에는 조금 타이트하지 않을까 생각이 든다. 그러면 코드는 가상머신 안에다가 clone 해야하냐고? VirtualBox에 공유 폴더 설정하듯이 프로젝트만 공유 폴더로 설정하면 될 것이다. 그리고 코드는 호스트의 IDE로 고치면서 터미널에서는 `vagrant ssh`로 우아하게 접속한 다음 `dotnet watch`나 `npm run dev`로 돌리면 되겠지.

## 설치

공식 홈페이지에서 바이너리를 다운받아 설치할 수 있겠지만, `winget`을 이용하면 더 간단하게 설치할 수 있다.

`winget install vagrant`

## Quickstart

vagrant 사용은 vm이 설치되어있어야한다. VirtualBox를 깔고 진행하자.

```bash
# Vagrantfile을 저장할 별도의 폴더 만들기
mkdir my-vagrant

# Ubuntu 18를 기반으로 한 Vagrantfile 생성
# 왜 bionic이 Ubuntu 18인지는 https://wiki.ubuntu.com/Releases 참조
# init 뒤에 붙는 것을 박스라고 하며, https://app.vagrantup.com/boxes/search 에서 더 많은 박스를 참고
# 박스를 지정하지 않으면 이미지를 지정하지 않아 구동할 수 없게 된다
vagrant init hashicorp/bionic64

# Vagrantfile을 기반으로 가상머신 생성 및 구동
vagrant up

# 생성한 vm에 접속
vagrant ssh

# ssh 끊기
logout

# 생성한 vm을 끄고 삭제하기
vagrant destory
# 혹은 vm을 끄기만 하고 싶다면
vagrant halt
```

## Box

`Box`란 `Docker`의 이미지와 같다. `docker image pull` 처럼 미리 박스를 호스트에 저장해놓을 수도 있다. 박스들은 [Hashicorp의 도커허브 같은 역할을 하는 곳](https://vagrantcloud.com/boxes/search)이 있어 박스를 다운받을 수 있다.

```bash
# 호스트에 박스 저장
vagrant box add generic/oracle8
```

## Vagrantfile

초기화를 하면 `Vagrantfile`이 생긴다.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
end
```

많은 내용이 있지만 대부분 주석이며 실제 동작하는 코드는 3줄이다. 필자에게는 생소하지만, `Ruby On Rails`로 유명세가 있는 `Ruby`라는 언어로 작성되어 있다. `do |config| ... end` 는 `kotlin`에서 `let` scope function과 비슷한 역할이다.

우리는 기반 박스만을 명시해서 `Vagrantfile`을 초기화했다. 원하는 내용을 추가해보도록 하자.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"

  # box 버전 지정
  config.vm.box_version = "1.0.282"

  # box의 url을 직접 지정
  # config.vm.box_url = "https://vagrantcloud.com/hashicorp/bionic64"
end
```

`Vagrantfile`을 기반으로 실제 vm을 구성하고 `ssh`로 접근해보자. 그중에 `ssh`로 접근할 때의 편리성이 특출나다.

```bash
# vagrantfile 기반 세팅 및 구동
vagrant up

# vm에 접속
vagrant ssh

# ctrl + d를 눌러 ssh를 종료하거나
logout

# vagrantfile을 기반으로 한 vm을 종료 후 삭제
vagrant destroy
```

마치 도커에서 컨테이너를 삭제하더라도 이미지가 남아있는 것처럼 `vagrant`에서도 vm을 삭제하더라도 `box`가 남아있다. 깔끔한 정리를 위해 호스트에 깔려 있는 `box`를 확인하고 삭제해보자.

```bash
# 호스트에 저장된 box 목록
vagrant box list

# 호스트에서 box 제거
vagrant box remove generic/oracle8
```

## 호스트와 vm의 파일 공유

Vagrant는 기본적으로 `Vagrantfile`이 위치한 디렉토리를 vm의 `/vagrant`에 마운트한다.

```bash
cd /vagrant

echo "sync really work?" > text.txt
```

실제로 호스트에 파일이 생성된다. (`generic/oracle8` box의 경우 없던데 box마다 설정이 다른가 싶다.)

이제 어떻게 project에 vagrant를 접목할 지 감이 오지 않는가? 프로젝트 최상단에 Vagrantfile을 위치한 후 같이 공유하면 될 것이다.

## [상태 구성 자동화 (Provision)](https://learn.hashicorp.com/tutorials/vagrant/getting-started-provisioning)

vm 내부에서 상태를 구성하기 위한 스크립트 파일을 만들자

```bash
# bootstrap.sh

#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi
```

해당 스크립트를 구동하도록 `Vagrantfile`에 설정하자

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision :shell, path: "bootstrap.sh"
end
```

만약 vm이 꺼져있어, `vagrant up`을 통해 구동해야한다면 바꾼 Vagrantfile이 적용되겠지만, 이미 동작 중인 경우에는 `vagrant reload --provision`을 통해 재설정한다.

개발자의 경우 필요한 의존성을 설치하고, 개발 커맨드를 실행시키는 것은 어떨까?

## 포트포워딩 구성

Vagrant의 vm들이 기본적으로 UI 없이 제공되는 이상, 웹브라우저 같은 화면이나 API 테스트를 위한 Postman을 vm에서 동시에 돌리기는 힘들것이다. 또한, 그런 것 정도는 호스트에서 구동하는 편이 더 편하기도 하다.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  config.vm.provision :shell, path: "bootstrap.sh"
  # vm의 8000포트를 host 4567로 포트포워딩
  config.vm.network :forwarded_port, guest: 8000, host: 4567
end
```

## 일시 중단, 정지, 제거

### 일시 중단

`vagrant suspend`

VirtualBox의 일시 정지와 같다. 시간이 멈춘듯 가만히 있다가 별도의 부팅 없이 그 상태 그대로 이어지는 것이다.

### 정지

`vagrant halt`

운영체제를 정상적으로 종료한다.

### 제거

`vagrant destroy`

vm을 강제 종료한 후 모든 자원을 제거한다.
