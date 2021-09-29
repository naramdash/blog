---
public: true
category: "Post"
date: "2021-09-29T23:15:00+09:00"
title: "커맨드로 보는 도커"
description: "커맨드로 대충 내가 원하는 기능 다시 리마인드하고 잊지 말기! - Docker"
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "review"
tags:
  - "Book Review"
  - "Docker"
  - "Command"
  - "완벽한 IT 인프라 구축을 위한 Docker"
  - "구름 쿠버네티스 전문가 양성 과정"
---

![구름 쿠버네티스 전문가 양성 과정(필자는 1기)](./goorm_kubernetes.png)

필자는 최근 교육을 통해 `Kubernetes` 교육을 받고 있다. 근데 왠걸, `Docker와` `Kubernetes만` 배우는 것이 아니라 `Linux`, `AWS`, `Ansible도` 돌다리 두드리며 지나가고 있는 것이다. 하지만 오히려 좋다. 그동안 눈길 주지 않았던 기술들과 정면으로 마주하여 극복해야할 좋은 순간인 것이다. 특히나 `Linux`는 좋은 강사분들에게 심도있게 배울 수 있어 더욱 좋았다.

다만, 내가 기초부터 배웠던 내용들은 다른 사람들도 어디선가 다들 배울 내용일테고, 좋은 글들이 많으니 내가 다시 올려도 의미 없지 싶었다. <del>하지만 안올리면 내가 배웠다는 것을 증명할 수 없으니...</del> 그래서 하나의 글에 과목별 모든 내용을 담아서 까먹거나 복습하고 싶을 때 다시 리마인드하기 좋게 해보려고 한다.

앞으로 아래 내용을 올리려고 하며,

1. `Linux`
2. `Ansible`
3. `Docker`
4. `Kubernetes`

이번 포스팅은 그중 첫번째인 **Docker**이다. Linux부터 올리려고 했는데, 내용이 너무 많아서... `Docker`부터 올린다.

`Docker` 수업은 [완벽한 IT 인프라 구축을 위한 Docker](https://book.naver.com/bookdb/book_detail.naver?bid=13987575) 책과 같이 읽었으므로 참고바란다. 내가 필요로 하던 것만 알아쓰던 도커였는데, 이 책을 통해 기초 지식을 습득하며 배울 수 있어서 좋았다. 다만, 다른 책과 과정을 통해 `Kubernetes`를 배울 것을 상정하였으므로 멀티 호스트와 클라우드에 관한 챕터인 8, 9, 10장은 진행하지 않았다.

![책 표지](http://image.yes24.com/goods/64728692/XL)

```toc
to-heading: 3
```

## docker 환경 구성

CentOS 7 기준

### 설치

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
# docker-ce : 도커를 만들고 삭제하고 등등.
# docker-ce-cli : 커맨드라인 인터페이스
# containerd.io : 도커를 실제로 돌려주는 서비스 데몬
```

### 서비스 설정

```bash
# 서비스 설정
sudo systemctl start docker.service
sudo systemctl enable docker.service
```

### 현재 유저를 docker 그룹에 추가

```bash
# 현재 유저($USER)에 도커 그룹 설정
# 그러면 user가 더이상 sudo 안써도 됨
sudo usermod -aG docker $USER
# id로 확인 = print real and effective user and group IDs
id
```

## docker 명령어

아래에 상위 명령어를 기준으로 다시 하위 명령어와 옵션을 정리하였다. 다만, 모든 명령어가 포함된 것은 아니므로 찾는 명령어가 없을 시에는 [Docker Docs](https://docs.docker.com/engine/reference/commandline/docker/)를 참고하도록 하자.

또한 길어질 수 있으나 체계화된 명령어만 표시했으므로 단축 명령어는 필요에 따라 직접 확인해보자! 처음 배우거나, 다른 사람과 내용을 공유해야할 때는 가독성이 높은 방향으로 작성해야한다고 생각한다.

### [docker search🌐](https://docs.docker.com/engine/reference/commandline/search/)

레지스트리에서 이미지 검색

### [docker login🌐](https://docs.docker.com/engine/reference/commandline/login/)

레지스트리에 로그인

### [docker logout🌐](https://docs.docker.com/engine/reference/commandline/logout/)

레지스트리에서 로그아웃

### [docker system🌐](https://docs.docker.com/engine/reference/commandline/system/)

- `prune` = 사용하지 않는 이미지, 컨테이너, 볼륨 네트워크를 일괄적으로 삭제할 수 있음

### [docker image🌐](https://docs.docker.com/engine/reference/commandline/image/)

- `pull` = 이미지 가져오기
- `push` = 이미지 레지스트리에 올리기
- `ls` = 로컬에 깔린 이미지 리스트
- `rm` = 로컬에 깔린 이미지 삭제
- `inspect` = 이미지 상세 정보 확인
- `tag` = 이미지에 대해서 새로운 태그 붙이기
- `prune` = 사용하지 않는 이미지 모두 삭제
- `import` = `tar` 파일로부터 이미지를 작성
  - `cat export.tar | docker image import - import-test:latest`
  - 파일로 부터 가져오게 되면 이미지 레이어가 1개로 합쳐짐
  - `cmd`: null로 자동 지정되어서, 그냥 돌리면 아무것도 안돌아감
- `save` = 도커 이미지를 `tar`로 저장
  - `-o` 파일 이름
  - `container commit`과는 내용이 많이 다르다. 레이어의 구조나 도커의 구조에 따라 잘 구조화되어 저장되어 있음
- `load` = `save`로 만든 `tar`로 부터 이미지 로드
- `build`
  - `-` = 표준 입력으로 빌드
    - 하나의 파일만 입력 가능하므로 `Dockerfile` 혹은 `Dockerfile`과 다른 파일을 같이 넣어놓은 `tar` 파일을 입력으로 넣어야함
    - `docker build - < Dockerfile`
  - `-t 이미지명` = 태그, `—tag`
  - 경로 (필수, 자주 실수)

### [docker container🌐](https://docs.docker.com/engine/reference/commandline/container/)

- `ls` = 로컬에 있는 컨테이너 리스트
- `stats` = 현재 돌고 있는 컨테이너들을 top 처럼 보여줌
  - 코어 하나당 100% 두개 할당되면 200% 나올 수 있음
  - `--no-stream` = 한번만 출력
- `top` 컨테이너 = 컨테이너 내에서 가동되는 프로세스들을 보여줌
- `port` 컨테이너 = 컨테이너가 사용하는 포트 확인
- `rename` 컨테이너 = 컨테이너의 이름 바꾸기
- `cp` 컨테이너:파일경로 호스트경로 or cp 호스트경로 컨테이너:파일경로
  - 컨테이너 안의 파일을 호스트로 복사 혹은 호스트 파일을 컨테이너로
- `diff` = 기반 이미지와 달라진 점을 확인
- `commit` = 컨테이너로부터 이미지를 작성
- `export` = 컨테이너를 tar 파일로 출력
  - `-o` 옵션으로 파일을 지정하거나 `>` stdout redirect로 파일지정해야함
  - 컨테이너의 파일시스템의 모든 것들이 파일로 들어가있음
- `create` = 스냅샷과 같이 시작되지 않은 컨테이너 시작
- `start` = `create`, `stop된` 컨테이너를 `detached` 모드에서 시작
- `run` = `create` 된 컨테이너 없이도 이미지에서 바로 시작가능
  - 컨테이너 터미널 접속할 때에는 `-it` 옵션을 사용
  - 나중에 다시 터미널 접속하기 위해서는 `-dit` 옵션을 사용
  - `ctrl + p + q` = 컨테이너 터미널 밖으로 나올때
  - `—attach -a`
  - `—detach -d`
  - `—interactive -i`
  - `—tty -t`
  - `—name -n`
  - `—user -u`
  - `—restart` = 결과에 따라 재시작
    - `no`
    - `on-failure`
    - `on-failure:n`
    - `always`
    - `unless-stopped`
  - `—rm` = 명령 실행 완료 후에 컨테이너 자동 삭제
  - `—add-host=[host명:ip주소]` = `hosts` 파일 설정
  - `—dns`: dns 서버ip 설정
  - `—expose` =호스트의 포트를 컨테이너에 풀로 할당 (하지만 p,P 옵션을 주지 않으면 접속할 수 없다)
  - `—publish, -p [host_port_#]:[conatiner_port_#]` = 호스트와 컨테이너의 포트를 매핑
    - `docker container ls`의 결과창에서의 순서도 같다. `[호스트포트] [컨테이너포트]`
  - `—publish-all`, `-P` = 랜덤 할당
    - `0.0.0.0:49153->80/tcp, :::49153->80/tcp`
  - `—link container_name[:alias]` = 컨테이너 이름으로 `add-host` 설정해버림
  - `—cpu-shares`, `-c` = `cpu` 사용 배분 (기본값 1024) 낮추고 싶으면 적게, 높이고 싶으면 많이
  - `—cpus n` = cpu n개를 쓰겠다. (0.1, 1, 2...)
  - `—memory`, `-m` = 메모리 크기 제한
  - `—volume=[호스트 디렉토리]:[컨테이너 디렉토리]`, `-v`
    - 일단 `mount` 옵션으로 대체할 수 있으면 대체하자
    - 마지막에`:Z`를 넣으면 `SELinux` 문제 해결
    - 마지막에 `:ro`를 넣으면 읽기전용으로 마운트 시킬 수 있다.
  - `—env 환경변수:값`, `-e` = 컨테이너 내의 환경변수 설정
  - `—env-file 파일명` = `ini` 느낌의 환경변수 설정
  - 이미지
  - 명령
- `stop` = `start`, `run` 된 컨테이너를 실행
- `kill` = not graceful shutdown
- `pause` = 컨테이너 안의 프로세스가 중단(메모리 할당 해제 되지 않음)
- `unpause` = 컨테이너 안의 프로세스 중단 해제
- `restart`
- `rm` = `stop` 된 컨테이너를 삭제
- `attach` = 컨테이너의 실행중인 프로세스에 접속할 때
  - 붙었다가 나올 때 `ctrl c` 방식으로 나오게 되면 컨테이너 자체가 `stop` 될 수 있음
- `exec` = 컨테이너에 다른 프로세스를 생성할 때

### [docker volume🌐](https://docs.docker.com/engine/reference/commandline/volume/)

- `create` = 볼륨 만들기
- `ls` = 볼륨 리스트
- `inspect` = 볼륨 자세히 보기
- `prune` = 사용하지 않는 볼륨 삭제

#### 볼륨 마운트 유형

문서에 있는 사진을 보면 이해하기 쉽다.

1. [Bind mounts](https://docs.docker.com/storage/bind-mounts/) = 초창기 구현, 리눅스 파일-디렉토리를 그대로 박아넣음
2. [Volumes](https://docs.docker.com/storage/volumes/) = OS 독립적 도커 구현, 도커엔진을 통해 볼륨 생성
3. [tmpfsmount](https://docs.docker.com/storage/tmpfs/) = 컨테이너와 생명주기가 같은 휘발성 메모리

EXAMPLES

```bash
# 볼륨
docker run -d --name devtest --mount source=myvol2,target=/app nginx:latest
docker run -d --name devtest -v myvol2:/app nginx:latest

# 바인드 마운트
docker run -d -it --name devtest --mount type=bind,source="$(pwd)"/target,target=/app nginx:latest
docker run -d -it --name devtest -v "$(pwd)"/target:/app nginx:latest

# tmpfs 마운트
docker run -d -it --name tmptest --mount type=tmpfs,destination=/app nginx:latest
docker run -d -it --name tmptest --tmpfs /app nginx:latest
```

### [docker network🌐](https://docs.docker.com/engine/reference/commandline/network/)

- `ls`
- `create`
  - `—drive` `-d`
  - `—ip-range`
  - `—subnet`
  - `—ipv6`
  - `-label`
- `rm` = 도커 네트워크 삭제
- `inspect`
- `connect` [옵션] 네트워크 컨테이너 = 컨테이너에 도커 네트워크 추가
- `prune` = 사용하지 않는 네트워크 지우기

EXAMPLE

```
docker network create --driver macvlan  --subnet 192.168.100.0/24 --gateway 192.168.100.2 --ip-range 192.168.100.64/26 -o parent=enp0s8 macvlantest
```

#### `driver` 종류

- `host` = 컨테이너가 호스트의 네트워크(IP)를 그대로 사용함
- `bridge`(기본값) = 컨테이너끼리 소통 가능한 별도의 망 생성 (oracle vm의 nat과 비슷)
- `null` = 네트워크를 사용하지 않음
- `overlay` =
- `macvlan` = 호스트의 NIC에서 직접 컨테이머마다의 MAC을 할당한다
  - 호스트와 같은 수준의 네트워크를 공유할 수 있음(같은 서브넷에서 ip를 할당 받는다)
  - 호스트 NIC에서 컨테이너행 패킷을 버리지 않도록 무차별 모드를 켜줘야한다.
  - `sudo ip link set enp0s8 promisc on`
    호스트와 연결된 인터페이스
    VirtualBox 쓰고 있으면 가상머신 네트워크 설정에서도 무작위 모드 설정할 것

### 그 외

#### quiet

Suppress the build output and print image ID on success

```bash
# stopped된 컨테이너를 삭제할 때
docker container rm `docker container ls --quiet`
```

## Dockerfile

[공식 문서](https://docs.docker.com/engine/reference/builder/)

Dockerfile은 여러 명령으로 이루어지는데, 그에 따라 이미지 레이어가 과도하게 생성될 수 있으니 주의하자.

또한 **멀티스테이지 빌드**를 통해 빌드 환경과 런타임 환경을 나누어 구성할 수 있으니 적극 활용하자. 이때 `FROM` 명령어 마지막에 `AS [스테이지 이름]`가 붙으며, 런타임 이미지에 `COPY --from=[스테이지 이름] ...` 으로 결과물을 복사한다.

### FROM

베이스 이미지 설정

`FROM ubuntu:latest`

멀티스테이지 빌드를 위한 이미지 임시 이름 부여
`FROM golang:1.8.4-jessie AS builder`

### RUN

이미지를 작성

1. shell 형식 기술
   - 해당 명령어를 쉘에서 실행하는 방식
   - `RUN apt install -y nginx`
1. exec 형식 기술
   - 쉘을 경유하지 않고 바로 실행
   - `RUN ["/bin/bash", "-c", "apt-get install -y nginx"]`

### CMD

생성된 이미지를 바탕으로 이미지 실행시에 명령 실행

다만, 여러개를 지정하더라도 마지막 CMD만 유효하다.

`RUN`과 마찬가지로 `shell`, `exec` 방식으로 호출할 수 있다. 결국은, `ENTRYPOINT + CMD` 로 명령이 실행되므로 `Dockerfile` 작성시에 `CMD`에 기본 인수 값을 지정할 수 있다. 다만, 두 명령어가 다른 방식으로 호출되면 기본쉘 호출 명령어가 중간에 작성될 수 있으니 같은 방식으로 작성하도록 하자

`CMD ["nginx", "-g", "daemon off;"]`

### ENTRYPOINT

생성된 이미지를 바탕으로 이미지 실행시에 명령 실행

`ENTRYPOINT + CMD` 명령이 컨테이너 시작 시에 동작하므로 잘 응용할 수 있다.

```dockerfile
ENTRYPOINT ["top"]
CMD ["-d", "10"]
# CMD를 위에 적는다고 해서 순서가 바뀌는 것이 아니다.

# top -d 10
```

### ONBUILD

이번에 작성한 이미지를 기반으로 하는 이미지 빌드 중에 실행되는 명령

회사의 베이스 이미지와 같이 기반 산출물으로써 역할할 때 쓸 수 있다.

`ONBUILD [dockerfile 명령]`

`ONBUILD ADD website.tar /var/www/html`

### USER

아래 작업부터 적용할 사용자

`USER [username, uid]`

### WORKDIR

작업 디렉토리 경로 설정이다. `cd` 명령과 같다고 보면 되고, 절대경로, 상대경로 둘 다 사용 가능하다.

`WORKDIR [작업 디렉토리 경로]`

### ARG

`Dockerfile` 내에서 활용되는 변수를 설정할 때 사용, 이미지 실행 시에는 관계 없어진다.

```dockerfile
ARG [이름]=[기본값]`

ARG NAME="juho"
RUN echo $NAME
```

빌드시에 --build-arg 옵션을 이용하여 덮어쓸 수 있다.

### LABEL

이미지의 메타데이터를 작성할 때 사용

`LABEL [KEY] value`

`LABEL [KEY]=value`

### EXPOSE

이미지가 공개하고 싶은 포트 번호를 지정

`EXPOSE [포트 번호]`

이 명령만으로 이미지 동작이 바뀌는 것은 아니지만, 이 정보 자체를 확인하거나, 랜덤 포트포워딩에 활용할 수 있다.

### ENV

이미지 내에 환경변수를 선언

```dockerfile
ENV [key] [value] # 한개만 선언할 때
ENV [key]=[value] [key]=[value] ... # 여러 개를 선언할 때
```

### SHELL

명령에 사용할 기본 쉘을 설정

`SHELL ["쉘의 경로", "파라미터"]`

### ADD

이미지에 파일 추가

```dockerfile
ADD [파일경로] [이미지 파일 경로]
ADD ["파일경로", "이미지 파일 경로"]
```

원격에서 추가한 파일일 경우 퍼미션이 `600`으로 설정되므로 추가 설정을 고려하자

압축 파일의 경우 호스트 파일의 경우 압축이 풀리며 추가되고, 원격 파일의 경우 풀리지 않고 추가된다

`.gitignore`과 유사하게 `.dockerignore` 파일을 이용하여 원하는 파일을 빌드에서 제외할 수 있다

### COPY

호스트 파일이나 디렉토리를 복상할 때 사용 (`ADD` 열화판)

```dockerfile
COPY [호스트 파일경로] [이미지 파일 경로]
COPY ["호스트 파일경로", "이미지 파일 경로"]
```

단순히 카피 기능이 필요할 때 사용하자

### VOLUME

이미지에 볼륨을 할당

`VOLUME ["/마운트포인트"]`

## docker-compose 환경 구성

CentOS 7 기준

[공식 문서](https://docs.docker.com/compose/install/)

### 설치

```bash
# 다운로드 후 설치
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### 실행권한 부여

```bash
# 실행 권한 부여
sudo chmod +x /usr/local/bin/docker-compose
```

### root 유저도 사용할 수 있게 설정

```bash
# root 유저도 docker-compose 명령어 사용 가능하게끔 설정
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## docker-compose 명령어

- `up` = 컴포즈 시작
  - `-f` = 특정 위치 컴포즈yml 실행
  - `-d` = detach 옵션
  - `—no-deps` = 의존성을 무시하고 컴포즈 내의 특정 컨테이너만 실행하기
  - `—scale` 서비스이름:숫자 = 각 컨테이너 별 scaleout 숫자 설정
  - `[서비스명]` = 의존성과 함께 해당 서비스를 실행
- `ps` = 컴포즈로 돌린 컨테이너들을 표시
- `logs` = 컴포즈 컨테이너들의 로그 표시
  - `[컨테이너 이름]` = 해당 컨테이너 로그 확인
- `run` = `docker exec` 같은거임
  - `run 컨테이너이름 명령어~~`
- `start` = `docker start`
  - `[컨테이너 이름]` = 해당 컨테이너만
- `stop` = 컴포즈 컨테이너들 정지, ctrl + c 와 같음
  - `[컨테이너 이름]` = 해당 컨테이너만
- `restart` = `docker restart`
  - `[컨테이너 이름]` = 해당 컨테이너만
- `pause` = `docker pause`
- `unpause` = `docker unpause`
- `rm` = 컴포즈로 돌린 컨테이너들 삭제
- `kill` = 컴포즈로 돌린 실행중인 컨테이너들 강제 종료
- `down` = `kill + rm`

## docker-compose.yml

더 많은 속성은 [공식 문서](https://docs.docker.com/compose/compose-file/)를 확인하자

```yml
version: "3.3" # docker compose의 버전

services: # 각 컨테이너에 대해 기술
  webserver:
    build: . # Dockerfile 경로
    image: ubuntu # 이미지, 태그를 지정하지 않으면 latest 활용
    ports: # 공개포트 지정
      - "443" # 외부 포트는 랜덤으로 지정된다
      - "80:80" # 호스트:컨테이너 포트포워딩
    networks:
      - webnet
    entrypoint: # ENTRYPOINT 덮어쓰기
      - php
    cmd: # CMD 덮어쓰기
      - -d
      - memory_limit=-1
    links: # 아래 컨테이너를 링크
      - redis:myredis # 컨테이너 이름을 사용하지 않고 별도의 엘리어스를 활용하여 링크
    depends_on: # 컨테이너 간의 의존 관계 표현
      - redis # 다만, redis 내의 프로세스가 사용가능할 때까지 대기하는 것은 아니다.
  redis:
    build: # Dockerfile 경로와 파일이름 지정
      context: /data
      dockerfile: my-Dockerfile
    image: redis
    networks:
      - webnet
    expose: # 링크 기능을 사용하여 해당 컨테이너에만 포트를 공개할 경우 사용
      - "6379"
    environment: # 컨테이너 환경 변수 설정
      FOO: Bar
    volumes:
      - /var/lib/mysql # 컨테이너쪽 마운트 포인트만 지정
      - cache/:/tmp/cache # 호스트:컨테이너 마운트 지정

networks:
  webnet:

volumes:
  data-volume:
```
