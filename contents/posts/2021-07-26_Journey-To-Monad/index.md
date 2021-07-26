---
public: true
category: "Post"
date: "2021-07-26T18:30:00+09:00"
title: "Monad까지의 여정 정리"
description: '"Learn You a Haskell for Great Good!"을 중심으로 한 Monad 이해 과정의 정리'
primaryImage:
  source: ../../images/haskell.jpg
  alt: "Haskell"
tags:
  - "Haskell"
  - "Functor"
  - "Applicative Functor"
  - "Monoid"
  - "Monad"
---

현재 [Learn You a Haskell for Great Good!](http://learnyouahaskell.com/)을 통해 Haskell을 배우고 있는데(사실 Haskell이 목적이 아닌 Monad가 목적인 불순한 놈이다), 후반부에 Monad를 배우기 위한 단계단계가 잘 머리에 새겨놓지 않으면 모래성같이 다시 흩어질 수 있어 이를 막기 위해 포스트로 정리하여 남긴다.

[GitHub 레포에 ipynb 파일](https://github.com/naramdash/learning/tree/master/Learn%20You%20a%20Haskell%20for%20Great%20Good)로 작성하였으나, 다시보기 용으로는 그닥 도움이 되지 않는듯하다.

책과 같은 순서로 Functor, Applicative Functor, Monoid, Monad 순으로 정리한다.

[**A monad is just a monoid in the category of endofunctors, what's the problem?**](https://stackoverflow.com/questions/3870088/a-monad-is-just-a-monoid-in-the-category-of-endofunctors-whats-the-problem)를 이해하기 위해 짱구를 열심히 돌려보자!

```toc

```

## Functor

### Functor란

```haskell
class Functor (f :: * -> *) where
    fmap :: (a -> b) -> f a -> f b
    -- 이때 f는 type 생성자이다. (Maybe 같은 것)
    -- 함수와 f a타입 값을 받아 f b타입 값을 돌려주는 것
    -- ex> (Int -> String) -> Maybe Int -> Maybe String
```

Functor는 매핑될 수 있는 것을 의미한다.

Functor 값을 컨텍스트(Context)가 추가된 값으로 볼 수 있다.

`Maybe`, `Either`, `[]`, `IO`, `(->) r`(함수) 등이 Functor에 속한다.

### `fmap`

Functor 클래스에 선언된 `fmap`을 아래 2가지로 이해할 수 있다.

- 함수와 펑터 값을 받아 그 펑터 값에 함수를 매핑하는 함수
  - `fmap (+3) (Just 3)`
  - (`Just 3` 에 `(+3)` 해서 `Just 6`가 됨)
- 함수를 받아서 그 함수를 올리는(lift) 함수, 즉 펑터 값에서 동작
  - `fmap (+3) (\*5)`
  - `(*5)` 함수에 `(+ 3)`를 해서 `(\x -> (x * 5) + 3)`가 됨

### Functor 규칙

1. 펑터값에 ID 함수를 매핑하면 돌려받은 펑터값은 원본 펑터값과 동일해야한다
   - `fmap id == id`
1. 두개의 함수를 합친 다음에 합한 함수를 펑터에 매핑하는 것은 펑터에 하나의 함수를 먼저 매핑한 다음에 다른 함수를 매핑하는 것과 동일해야한다.
   - `fmap (f.g) = fmap f . fmap g`

위는 하스켈에 의해 자동으로 적용되지 않기 때문에, 사용자가 직접 테스트해야한다.

### 관련 링크

- [LYAH | The Functor Typeclass](https://github.com/naramdash/learning/blob/master/Learn%20You%20a%20Haskell%20for%20Great%20Good/13-monad.ipynb)
- [LYAH 노트북 정리 | Functor Introduction](https://github.com/naramdash/learning/blob/master/Learn%20You%20a%20Haskell%20for%20Great%20Good/07-type-and-typeclass.ipynb)
- [LYAH | Functors redux](http://learnyouahaskell.com/functors-applicative-functors-and-monoids#functors-redux)
- [Wikipedia | Functor](<https://ko.wikipedia.org/wiki/%ED%95%A8%EC%9E%90_(%EC%88%98%ED%95%99)>)

## Applicative Functor

### Applicative Functor란?

```haskell
class Functor f => Applicative (f :: * -> *) where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
  GHC.Base.liftA2 :: (a -> b -> c) -> f a -> f b -> f c
```

Applicative는 Functor이어야하며, 펑터값 간의 결합을 지원한다. Applicative는 실용적인, 응용적인 이라는 뜻이다.

`Maybe`, `[]`, `IO`, `(-> r)`, `ZipList` 등이 Applicative에 속한다.

> Applicative functors allow for functorial computations to be sequenced (unlike plain functors), but don't allow using results from prior computations in the definition of subsequent ones (unlike monads).

fmap(<$>)의 결과값이 Functor라서 줄줄이 이어 쓰지 못하는 Functor와 달리 Applicative는 Functor들의 computation들을 sequencing 할 수 있다.

다만, Monad에서 do notation의 이전 바인딩을 참조하는 것과 같은 행동을 Applicative는 하지 못한다.

```haskell
[1,2,3] >>= (\x -> [x..x+3] >>= (\y -> pure (x,y)))
```

### `pure`

모든 타입 값에 디폴트 컨텍스트를 씌운다.

### `<*>`

1. 컨텍스트(f)로 씌워진 함수(a -> b)와 2) 컨텍스트(f)로 씌워진 값(a)을 받아 3) 값을 함수에 적용한 후 컨텍스트를 씌워 반환한다.

### Applicative Functor 규칙

0. `pure f <*> x` = `fmap f x`
1. **Identity**: `pure id <*> v` = `v`
2. **Composition**: `pure (.) <*> u <*> v <*> w` = `u <*> (v <*> w)`
3. **Homomorphism**: `pure f <*> pure x` = `pure (f x)`
4. **Interchange**: `u <*> pure y` = `pure ($ y) <*> u`

### 관련 링크

- [LYAH | Applicative Functors](http://learnyouahaskell.com/functors-applicative-functors-and-monoids#applicative-functors)
- [LYAH 노트북 정리](https://github.com/naramdash/learning/blob/master/Learn%20You%20a%20Haskell%20for%20Great%20Good/11-applicative-functor.ipynb)
- [Wikipedia | Applicative Functor](https://en.wikipedia.org/wiki/Applicative_functor)

## Monoid

### Monoid란?

```haskell
class Semigroup a => Monoid a where
  mempty :: a
  mappend :: a -> a -> a
  mconcat :: [a] -> a
```

> 모노이드(영어: monoid)는 항등원(identity element)을 갖는, 결합 법칙을 따르는 이항 연산을 갖춘 대수 구조이다. 군의 정의에서 역원(inverse element)의 존재를 생략하거나, 반군의 정의에서 항등원의 존재를 추가하여 얻는다.

> 반군(半群, 영어: semigroup)은 결합법칙(associated law, 연산 순서에 관계 없이 결과 같음)을 따르는 하나의 이항 연산(binary operator)이 부여된 대수 구조이다.

`[]`, `Product`, `Sum`, `Any`, `All`, `Ordering`, `Maybe`, `First`, `Last` 등이 해당한다.

### `mempty`

모노이드의 항등원. 다형성 상수이다.

### `mappend`

모노이드 두가지를 받아 모노이드를 반환하는 이진 함수이다.

### `mconcat`

모노이드 값의 리스트를 받아서 요소 간에 `mappend`를 통해 하나의 모노이드 값으로 바꾸는 함수이다.

### Monoid 규칙

1. mempty mappend x = x
2. x mappend mempty = x
3. (x mappend y) mappend z = x mappend (y mappend z)

1,2번 규칙은 mempty가 항등원이라는 것을 의미하며, 3번 규칙은 결합 법칙이 성립함을 의미한다.

### 관련 링크

- [LYAH | Monoids](http://learnyouahaskell.com/functors-applicative-functors-and-monoids#applicative-functors)
- [LYAH 노트북 정리](https://github.com/naramdash/learning/blob/master/Learn%20You%20a%20Haskell%20for%20Great%20Good/12-monoid.ipynb)
- [Wikipedia | Semigroup](https://ko.wikipedia.org/wiki/%EB%B0%98%EA%B5%B0)
- [Wikipedia | Monoid](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%85%B8%EC%9D%B4%EB%93%9C)

## Monad

### Monad란?

```haskell
class Applicative m => Monad (m :: * -> *) where
  (>>=) :: m a -> (a -> m b) -> m b
  (>>) :: m a -> m b -> m b
  return :: a -> m a
  fail :: String -> m a
```

> 범주론에서, 모나드(영어: monad)는 내부 함자 범주의 모노이드 대상이다.

> 수학에서, 자기 사상(自己寫像, 영어: endomorphism 엔도모피즘)은 그 정의역과 공역이 같은 사상이다.

### `return`

인자 값에 최소 디폴트 컨텍스트를 씌운다는 점에서 Applicative 타입의 `pure` 함수와 동일하다.

### `fail`

모나드를 위한 구문 구조의 실패를 가능하기 위해 하스켈에 의해 사용된다.

가령, 런타임에서 패턴매칭에 실패하였을 때 error를 발생하여 프로그램을 충돌시키지 않고, 실패 컨텍스트를 반환하게 할 수 있다.

### `>>=`

바인딩이라고 부른다. 모나드 값과 일반값을 받아 모나드 값을 반환하는 함수를 받아 모나드 내부 값에 함수를 적용하여 반환한다.

### `>>`

두 개의 모나드 값을 받아, 첫번째 모나드 값의 컨텍스트에 따라 두번째 모나드 값 혹은 실패 컨텍스트를 반환한다.

### do 표기법

모나드를 쉽게 활용하기 위해서 하스켈에서는 do 표기법을 활용한다. 아래 식은 모두 동일하다.

모나드를 위한 let in 식이라고 생각할 수 있다.

```haskell
Just 3 >>= (\x -> Just "!" >>= (\y -> pure (show x ++ y)))

do
    x <- Just 3
    y <- Just "!"
    return (show x ++ y)
```

### Monad 규칙

1. 좌항등원
   - `return x >>= f` = `f x`
1. 우항등원
   - `m >>= return` = `m`
1. 결합 법칙
   - `(m >>= f) >>= g` = `m >>= (\x -> f x >>= g)`
   - `>>= g` 입장에서는 컨텍스트 값을 받아야 하므로 우항과 같은 표현이 됨
   - 또한 `m >>=` 입장에서는 함수를 받아야하므로 우항과 같은 표현이 됨

모노이드 법칙과 같은 것을 알 수 있다.

[`<=<`](https://hackage.haskell.org/package/base-4.15.0.0/docs/Control-Monad.html#v:-60--61--60-) 는 `.` 용법과 같이 두 모나드 반환 함수를 합치는 데 사용된다.

### 관련 링크

- [LYAH | A Fistful of Monads](http://learnyouahaskell.com/a-fistful-of-monads)
- [LYAH 노트북 정리](https://github.com/naramdash/learning/blob/master/Learn%20You%20a%20Haskell%20for%20Great%20Good/13-monad.ipynb)
- [Wikipedia | Monad](<https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%82%98%EB%93%9C_(%EB%B2%94%EC%A3%BC%EB%A1%A0)>)
- [Wikipedia | 자기 사상](https://ko.wikipedia.org/wiki/%EC%9E%90%EA%B8%B0_%EC%82%AC%EC%83%81)
