---
public: true
category: "Post"
date: "2021-10-10T23:15:00+09:00"
title: "커맨드로 보는 리눅스"
description: "커맨드로 대충 내가 원하는 기능 다시 리마인드하고 잊지 말기! - Linux"
primaryImage:
  source: ../../images/Book-Review.jpg
  alt: "review"
tags:
  - "Book Review"
  - "Linux"
  - "Cent OS"
  - "Command"
---

이번 포스팅은 교육 과정간에 학습한 **Linux**이다.

다만, 필자는 Cent OS 7을 기반으로 학습하였으므로 아무래도 Ubuntu와 같은 특정 플랫폼에 대한 내용이 없을 수 있다. 현재 [Cent OS가 레드헷에 의해 장기 지원이 끊겼으므로](https://changwoo.xyz/hacks/2020/12/09/end-of-centos.html) [Oracle Linux](https://linux.oracle.com/switch/centos/)도 좋은 대안이 될 것이다!

리눅스 터미널을 헤쳐나가기에 앞서 알아야할 것은, **원하는 결과를 얻기 위해서 사용할 수 있는 명령어는 수도 없이 많으며 다른 사람과 다르다 하더라도 자신이 틀린 것이 아니라는 것이다!** 모든 명령어는 관계 없는 사람끼리 필요에 의해 만든 바이너리 프로그램에 지나지 않는다. 똑같은 기능을 하는 수십가지의 명령어 중의 하나만 보고 그것이 정답이다, 꼭 외워야하는 리눅스의 명령어 이렇게 생각할 필요가 없다. 어떤 명령어는 옵션을 넣을때 -n 이렇게 써도 되고 --number 이렇게 써도 되고 N 이렇게 써도 되네? 싶은 것은 여러 관습들을 한 명령어에서 지원하기 위해 우겨넣기 때문에 발생한 것이다. 그렇기 때문에 결과 객체 중심으로 명령어를 연결하는 powershell과 달리 리눅스의 경우 grep과 같은 텍스트 기반 파이프라인으로 상황을 해결한다. 만약 A 배포판 리눅스에서 잘 쓰던 명령어가 B 배포판 리눅스에서는 없는가? B 배포판 리눅스에서는 안 넣기로 했나보다~ 이렇게 생각하면 된다. 나로써는 리눅스 명령어 세트를 Powershell과 같은 일관된 환경으로 생각했기 때문에 리눅스 쉘 환경을 받아들이기 더 힘들었던 것 같다.

```toc
to-heading: 3
```

## 터미널

- <kbd>ctrl</kbd> + <kbd>a</kbd> : <kbd>Home</kbd>
- <kbd>ctrl</kbd> + <kbd>e</kbd> : <kbd>End</kbd>
- <kbd>ctrl</kbd> + <kbd>u</kbd> : 커서 앞쪽 삭제
- <kbd>ctrl</kbd> + <kbd>e</kbd> : 커서 뒤쪽 삭제
- <kbd>esc</kbd> + <kbd>.</kbd> : 마지막 명령어
- <kbd>ctrl</kbd> + <kbd>l</kbd> : `clear`

## man

`man [command]`: 일치하는 커맨드에 대한 메뉴얼 페이지

페이지 내부에서는 `less` 커맨드의 명령어를 사용한다.

## su

`su [options] [-] [user]`: 해당하는 유저로 로그인

중간의 `-` 옵션을 써야 로그인하려는 유저의 설정으로 쉘이 구성된다.

## sudo

`sudo [command]`: sudoer로써 커맨드 실행

`/etc/sudoers.d` 내에 새로운 sudoer를 추가할 수 있다.

## 작업 디렉토리

### cd

- `cd -`: 뒤로가기
- `cd ~`: 현재 사용자 홈디렉토리

### pwd

현재 작업 디렉토리 확인

## 주요 디렉토리 목록

디렉토리에 파일과 폴더만 있는것이 아니라 장치도 있고... 리눅스의 구성요소들이 다 디렉토리 내에 연결되어 있다고 보면 된다.

- `/bin` (=>`/usr/bin`): 명령어
- `/boot`: 부팅 설정 파일
- `/etc`: 사용자 설정 & 서버 환경 설정
- `/home`: 사용자 홈 디렉토리 모음
- `/root`: 루트 사용자 홈 디렉토리
- `/run`: 마지막 부팅 이후 시작된 프로세스의 런타임 데이터
- `/sbin` (=> `/usr/sbin`): 시스템 관리 명령어
- `/tmp` (=> `/var/tmp`): 임시 저장 파일
- `/usr`: 설치된 소프트웨어 및 라이브러리 포함
- `/var`: 시스템 고유의 가변 데이터 (DB, cache, log 등)
- `/dev`: 하드웨어에 액세스 하기 위해 시스템이 사용하는 특수 장치파일 포함

## 파일 보기

### head

`head -n [lines] file`: 지정한 만큼 처음부터 읽어 출력

### tail

`tail -n [lines] file`: 지정한 만큼 뒤에서부터 읽어 출력

### more

`more [file]`: 위에서 아래로만 읽을수 있는 파일 뷰어

- <kbd>Enter</kbd>: 한 줄
- <kbd>Space</kbd>: 한 페이지

### less

`more`보다 많이 좋은 파일 뷰어

화살표 위아래, 페이지 업다운 가능

- `/pattern`: 검색
- `n`: 아래로 검색
- `N`: 위로 검색
- `-i`: ignore case 검색 기능 토글
- `숫자`: 행으로 이동

### cat

`cat [file]`: 파일 전체 내용을 화면에 출력

## grep (egrep, fgrep)

`grep [options] pattern [file]`

- `-e`: 한번에 여러개를 검색하려고 할 때
- `-i`: ignore case 대소문자 구분 안할 때
- `-v`: 매칭되지 않는 것만 보여준다.
- `-w`: 단어로만(공간이나 특수문자로 구분되어 있는 경우) 되어있는 경우만 검색
- `-r`: 내가 지정한 디렉토리에 대해서 내부 파일/디렉토리 재귀적으로 계속 검색
- `-A (lines)`: After
- `-B (lines)`: Before
- `-C (lines)`: 전체

### 패턴

- `[123]`: 1, 2, 3 중 하나
- `[^123]`: 1, 2, 3이 아닌 것
- `^처음과 끝$`
- `.` 혹은 `?`: 아무 글자
- `?`: 0 ~ 1
- `*`: 0 ~ n
- `+`: 1 ~ n
- `{n}`

''는 문자열 그자체를 매칭하고 싶을때

""는 변수를 사용할 때, 이스케이프 문자를 사용해야할 때

## 파일 생성 삭제

### mkdir

`mkdir [directory]`

패턴 적용안됨

### rmdir

`rmdir [pattern]`

패턴 적용됨

### mv

`mv [files...] [to]`

이름 바꿀 때도 쓴다.

### cp

`cp [patterns...] [to]`

디렉토리를 복사할 경우에는 `-r` 옵션을 주어야한다.

### rm

`rm [patterns...]`

디렉토리를 삭제할 경우에는 `-r` 옵션을 주어야한다.

### touch

`touch [file]`: 파일의 수정 시각을 현재로 바꾼다.

보통 빈 파일을 만들 때 많이 쓴다.

- `touch file{a,b,c}`: filaa filab filc 생성됨
- `touch file{1..9}`: file1 ... file9 생성됨

### ln

- `ln -s [target] [dest]`: 심볼릭 링크 생성
- `ln -P [target] [dest]`: 하드 링크 생성

심볼릭 링크의 개수는 `ls -al`에서 권한 다음에 확인할 수 있다.

### file

`file [file]`

파일의 타입을 출력

## 검색

### which

`which [command]`

해당 명령어의 위치를 알 수 있다.

### locate

`locate [OPTION]... PATTERN...`

데이터베이스 기반 파일 이름 검색

### find

`find [기본옵션] [검색할위치] [검색방식] [검색대상에 대한 처리 방식: output을 어떻게 할 것인가?]`

- `find /tmp -name core -type f -print | xargs /bin/rm -f`
- `find /tmp -name core -type f -print0 | xargs -0 /bin/rm -f`
- `find . -type f -exec file '{}' \\;`

## vim

### command (기본 상태)

`esc`로 진입

#### 1타

- `d.`: 잘라내기 (Detach로 외우자)
- `y.`: 복사 (copY로 외우자)
- `p`: 커서 뒤에 붙여넣기
- `P`: 커서 앞에 붙여넣기
- `gg`: 문서 처음으로 이동
- `G`: 문서 마지막 줄로 이동
- `/pattern`: 검색 (`less`와 비슷)

#### 2타

- `x`: 글자
- `w`: 단어
- `d`: 라인
- `^`: 커서 기준 앞
- `$`: 커서 기준 뒤
- `gg`: 문서 처음까지
- `G`: 문서 마지막까지

### edit

- `a`: 커서 한글자 뒤에서 편집 시작
- `i`: 커서에서 편집 시작
- `o`: 커서 다음줄을 생성한 후 다음줄에서 편집 시작

### visual

블록 복사할 때 사용

### extend

`:`로 진입

- `set nu[mber]` 행 숫자 표시
- `w [name]`: 저장
- `q`: 나가기
- `!`: force

## redirection

### <

표준 입력 재지정

### >

표준 출력 재지정

`>` 는 덮어쓰기

`>>` 는 이어쓰기

`cat > fileA`: 간단하게 fileA 내용 덮어쓰기

### 2>

표준 에러 재지정

`2>` 는 덮어쓰기

`2>>` 는 이어쓰기

### &>

표준 출력&에러 재지정

`&>` 는 덮어쓰기

`&>>` 는 이어쓰기

# /dev/null

출력 버리기용으로 쓰는 출력 기계

## 다중 명령어

### ;

앞 명령어의 수행여부와 상관없이 다음 명령어 진행

### &&

앞 명령어가 성공했을 때 다음 명령어 실행

### ||

앞 명령어가 실패했을 때 다음 명령어 실행

### &

앞 명령어를 백그라운드에서 실행

### |

앞 명령어의 결과를 다음 명령어에 전달

### | tee

앞 명령어의 결과를 사용하고 다음 명령어에 앞 명령어의 결과를 전달

## 압축

### tar

- `tar cf [tar-file-name] [files...]`: 아카이브 생성
- `tar cfz [tar-file-name] [files...]`: gzip으로 압축된 아카이브 생성
- `tar cfj [tar-file-name] [files...]`: bzip2로 압축된 아카이브 생성
- `tar cfJ [tar-file-name] [files...]`: xz로 압축된 아카이브 생성
- `tar xf [압축풀 파일]`: 아카이브 풀기
- `tar xf [압축풀 파일] -C [위치]`: 지정한 위치에 아카이브 풀기
- `tar tvf [아카이브 파일]`: 아카이브 파일 목록 보기

`v`는 verbose 옵션이다.

### zip / unzip

`zip [zip-file-name] [files]`: zip 압축하기

`unzip [zip-file]`: zip 파일 압축풀기

## 프로세스

### &

앞 명령어를 백그라운드에서 실행

곧바로 `[job-number] process-id-number`를 출력해준다.

### jobs

& 커맨드를 통해 돌리고 있는 프로세스를 나타냄

### ctrl + z

포그라운드에서 동작 중인 프로세스를 백그라운드 Stopped 상태로 이전

### fg

`fg [job number]`: 백그라운드 프로세스를 포그라운드로 이동하여 실행

### bg

`bg [job number]`: 백그라운드에서 멈추어있는 프로세스를 resume 시킴

### ctrl + c

강제 중단

### ps

현재 프로세스 리스트를 순간적으로 확인

`-e`: 모든 프로세스

### pgrep

프로세스에 대한 grep

`pgrep -l [pattern]`

### top

프로세스 리스트를 실시간으로 확인

### uptime

시스템 동작 시간 확인

load average를 통해 차후 프로세스의 리소스 할당 대기 정도를 파악할 수 있다 (top에도 있음)

### lscpu

cpu에 대한 정보 조회

### kill

`kill [-s signal] pid`: pid 기반 시그널 전송

`kill [-s signal] %jobnumber`: jobspec 기반 시그널 전송

#### 주요 Signal

`kill -l`: 시그널 리스트를 출력

- 9 KILL: 즉시 종료
- 15 TERM: graceful 종료
- 18 CONT: resume
- 19 STOP: 동작 정지

### killall

killall

### pkill

pgrep + kill

패턴에 맞는 프로세스에 시그널을 전달

### pstree

프로세스를 부모-자식 관계로 그래픽하게 표현

`pstree [사용자이름]`: 사용자로 프로세스 필터링

## 프로세스별 우선순위

top의 테이블 헤더 중에 NI가 nice를 표현한 것이다.

컴퓨터의 자원들은 여러 프로세스가 돌아가면서 활용하는데, nice 값이 작을수록 더 빈번하게 자원을 할당받을 수 있다.(스타크래프트의 공격 주기가 이와 같이 표현한다고 한다.) nice 값은 직접 설정할 수 없고 상대적으로만 가중치를 줄 수 있다. 다만, root는 값을 낮출 수 있으나 일반 사용자는 nice 값을 증가만 시킬 수 있다.

### nice

`nice [-n niceness] [command......]`

커맨드를 실행할 때 niceness를 조정

### renice

`renice [-n] priority [[-p] pid ...] [[-g] pgrp ...] [[-u] user ...]`

실행하고 있는 프로세스의 nice를 조정

## 튜닝 프로파일

사용 중인 리눅스 시스템을 목적에 맞는 추천하는 프리셋으로 설정하여 최적화할 수 있다. (마치 그래픽 카드 소프트웨어에 들어가면 게임, 방송, 녹화 설정하듯이)

### tuned-adm

`tuned-adm list`: 사용 가능한 프로필 리스트를 출력

`tuned-adm active`: 현재 사용중인 프로필 출력

`tuned-adm profile [profile_name]`: 해당하는 프로필로 변경, 권한 필요

## 권한과 소유

`ls -l`을 통해서 출력되는 내용의 앞부분은 다음과 같다.

```sh
[type] permis.. [owner] [group] [all] [s] [symb] owner [user] [group]
d               rwx     r-x     r-x   .   2            study  study
```

권한의 대상이 파일인지 디렉토리인지에 따라 영향을 받는 커맨드들이 다르다. 디렉토리의 경우 `x` 권한이 없으면 해당 디렉토리를 작업 디렉토리로 지정할 수 없으므로 `x` 권한이 사실상 필수이다.

|     | 파일          | 디렉토리 |
| --- | ------------- | -------- |
| r   | cat more head | ls       |
| w   | vim redirect  | cp mv rm |
| x   | 실행          | cd       |

### chmod

### chown

## 사용자와 그룹

/etc/passwd

/etc/group

## 고급 권한

## 작업 스케줄링

## 디스크 관리

## 파일시스템과 스왑 메모리

## 논리 볼륨

## Systemd

## 로그

## 리눅스 부트 프로세스

## RPM과 YUM

## 네트워크 관리

## OpenSSH

## NTP

## 방화벽

## SELinux

## DNS

## DHCP

## FTP

## SMB

## Apache HTTP 서버

## MariaDB
