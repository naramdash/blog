---
public: true
category: "Post"
date: "2021-12-26T21:20:00+09:00"
title: "C# 패턴 매칭 7.0부터 10.0까지 알아보기"
description: "쓰면 쓸 수록 이쁘고 가독성 높은 C# 패턴매칭 문법, 그 시작부터 현재까지 시간 순서대로 알아보기!"
primaryImage:
  source: ../../images/csharp.png
  alt: "Csharp"
tags:
  - "CSharp"
  - "Pattern Matching"
  - "Basic Introduction"
  - "FSharp"
  - "Haskell"
---

최근 입사하고 난 후 C# 코드 컨벤션으로 패턴매칭을 제안했던 나는 패턴매칭에 대한 세미나를 업무로 받게되었다. 이번 포스트는 그 발표 내용을 간결하고 쉽게 다듬은 것이다.

대부분의 내용은 `docs.microsoft.com`을 참조하였다.

[Patterns (C# reference)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/patterns)

```toc

```

## 패턴 매칭이란?

> Pattern matching is a technique where you test an expression to determine if it has certain characteristics.
>
> 패턴 매칭이란 표현식에 특정한 특성들이 있는지 확인하는 기법이다.
>
> [Pattern matching overview](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/pattern-matching)

패턴 매칭을 간단하게 설명하자면, 원하는 타입의 패턴을 작성한 후 데이터에 대입하여 패턴에 부합하는지를 **boolean 값**으로 확인하는 것이다.

### C# 7.0 이전의 `is`

[Type-testing operators](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/type-testing-and-cast)

`is`: 런타임 시점에 값이 타입과 호환 가능한지 체크

```csharp
// record class from C# 9
// record struct from C# 10
public abstract record Person(string FirstName, string LastName);
public record Teacher(string FirstName, string LastName, Guid id): Person(FirstName, LastName);
public record Student(string FirstName, string LastName, int Grade): Person(FirstName, LastName);

Object teacher = new Teacher("Nancy", "Davolio", Guid.NewGuid());
Console.WriteLine($"1. {nameof(teacher)} is {nameof(Object)} {teacher is Object}");
Console.WriteLine($"2. {nameof(teacher)} is {nameof(Person)} {teacher is Person}");
Console.WriteLine($"3. {nameof(teacher)} is {nameof(Teacher)} {teacher is Teacher}");
Console.WriteLine($"4. {nameof(teacher)} is {nameof(Student)} {teacher is Student}");

Console.WriteLine();

Object student = new Student("Juho", "Kim", 3);
Console.WriteLine($"A. {nameof(student)} is {nameof(Object)} {student is Object}");
Console.WriteLine($"B. {nameof(student)} is {nameof(Person)} {student is Person}");
Console.WriteLine($"C. {nameof(student)} is {nameof(Teacher)} {student is Teacher}");
Console.WriteLine($"D. {nameof(student)} is {nameof(Student)} {student is Student}");
```

## C# 7.0 (.net core all)

[C# 7.0 feature specification > Pattern Matching for C# 7](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-7.0/pattern-matching)

- 선언 패턴 (Declaration pattern)
- 상수 패턴 (Constant pattern)
- var 패턴 (var pattern)
- switch 문 (switch statement)

### 선언 패턴 (Declaration pattern)

선언 패턴은 아래를 만족하는 지 체크한다.

- 값의 타입이 T
- 값의 타입이 T를 상속 (class)
- 값의 타입이 T를 구현 (interface)
- 값의 타입이 T로 암시적 참조 변환을 지원 [Implicit reference conversions](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/conversions#implicit-reference-conversions)
- 값의 타입이 nullable value T? 일때 T 혹은 null
- 값의 타입이 boxing 혹은 unboxing을 통해 T 타입으로 변경 가능

```csharp
// switch expression (C# 8.0)
string GetSourceLabel<T>(IEnumerable<T> source) => source switch
{
  Array array => "Array",
  ICollection<T> collection => "Collection",
  _ => "Otherwise",
};

var numbers = new int[] { 10, 20, 30 };
Console.WriteLine(GetSourceLabel(numbers));

var letters = new List<char> { 'a', 'b', 'c', 'd' };
Console.WriteLine(GetSourceLabel(letters));
```

```csharp
int? xNullable = 7;
// int? xNullable = null; // 이 경우에는?
int y = 23;
object yBoxed = y;
if (xNullable is int a && yBoxed is int b)
{
    // Console.WriteLine(xNullable + yBoxed);
    Console.WriteLine(a + b);
}
else if (xNullable is null)
{
    Console.WriteLine($"{nameof(xNullable)} is null");
}
```

선언 패턴은 타입 체킹을 함과 동시에, 명시적인 캐스팅 없이도 해당 타입의 값을 사용할 수 있게 해준다.

### 상수 패턴 (Constant pattern)

지원되는 리터럴과 일치 비교

- [Integral numeric types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types) and [Floating-point numeric types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)
- `string`, `char`
- `bool`
- `enum`
- `const`
- `null`

```csharp
// numeric
var intVal = int.MaxValue;
Console.WriteLine($"{nameof(intVal)} {intVal is 1000000}");

// string
char[] chars = {'w', 'o', 'w'};
var stringVal = new string(chars);
Console.WriteLine($"{nameof(stringVal)} {stringVal is "wow"}");

// bool
var boolVal = bool.Parse(bool.FalseString);
Console.WriteLine($"{nameof(boolVal)} {boolVal is false}");

// enum
enum Color { Red, Blue, White = 1000, Black }
var colorVal = Color.Black;
Console.WriteLine($"{nameof(colorVal)} {colorVal is Color.Blue}");

// const
var numVal = 2147483647;
Console.WriteLine($"{nameof(numVal)} {numVal is Int32.MaxValue}");

// null
string stringNullVal = null;
Console.WriteLine($"{nameof(stringNullVal)} {stringNullVal is null}");
```

```csharp
const string EmptyStringConst = "";
static readonly string EmptyStringReadonly = "";

if("123" is EmptyStringConst) // Ok
// if("123" is EmptyStringReadonly) // Error
// if("123" is string.Empty) // Error <= static readonly string string.Empty
{
  Console.WriteLine("is it works?");
}
// https://docs.microsoft.com/ko-kr/dotnet/api/system.string.empty?view=net-5.0
```

### var 패턴 (var pattern)

값을 그대로 패턴으로 받은 후 해당 스코프 내에서 재사용

불필요한 선언을 줄인다는 점에서 Kotlin의 let scope function과 유사한 용도

```csharp
bool isLengthBetween<T>(IEnumerable<T> list, int start, int end)
  => list.Count() is var count && count > start && count < end;
  // 모든 패턴에 일치하므로 ~ is var ~ 의 결과는 true 이다.

bool isLengthBetweenWithoutVarPattern<T>(IEnumerable<T> list, int start, int end)
{
  var count = list.Count();
  return count > start && count < end;
}

var listVar = Enumerable.Range(100, 10).Select(id => id);
Console.WriteLine($"{listVar.First()} to {listVar.Last()}");
Console.WriteLine(isLengthBetween(listVar, 2, 8));
```

### switch 문 (switch statement)

```antlr
switch_label
    : 'case' complex_pattern case_guard? ':'
    | 'case' constant_expression case_guard? ':'
    | 'default' ':'
    ;

case_guard
    : 'when' expression
    ;
```

switch 문: 값을 반환하지 않는 `문`

C# 6 이전에는 `char`, `string`, `bool`, `intergral numeric type`, `enum` 타입만 `case`에 사용할 수 있었다

C# 7 부터는 패턴과의 비교를 할 수 있게 된 것이다

```csharp
// switch statement
void DisplayMeasurements(int a, int b)
{
    // positional pattern(C# 8.0) recursive
    switch ((a, b))
    {
        // case guard (https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements#case-guards)
        // positional pattern (C# 8.0)
        // relational pattern (C# 9.0)
        case (> 0, > 0) when a == b:
            Console.WriteLine($"Both measurements are valid and equal to {a}.");
            break;
        case (> 0, > 0):
            Console.WriteLine($"First measurement is {a}, second measurement is {b}.");
            break;
        default:
            Console.WriteLine("One or both measurements are not valid.");
            break;
    }
}

DisplayMeasurements(3, 4);
DisplayMeasurements(5, 5);
```

```csharp
enum Color { Red, Blue }

// object도 switch 문에 인수가 될 수 있다
void SpeakColor(object color)
{
  switch (color)
  {
    case Color.Red:
      Console.WriteLine("red");
      break;
    case Color.Blue:
      Console.WriteLine("blue");
      break;
    case "123":
      Console.WriteLine("123");
      break;
    case null:
      Console.WriteLine("null");
      break;
    default:
      Console.WriteLine("what?");
      break;
  }
}

SpeakColor("123");
SpeakColor(new { PropertyA = "open me"});
```

## C# 8.0 (>= .net core 3.0)

[C# 8.0 feature specification > Recursive Pattern Matching](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-8.0/patterns)

- switch 식 (switch expression)
- 속성 패턴 (Property pattern) `Recursive`
- 위치 패턴 (Positional pattern) `Recursive`
- 버림 패턴 (Discard pattern)

### switch 식 (switch expression)

[switch expression (C# reference)](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)

여러 후보 패턴 중에 하나를 선택하여 평가한 값을 반환하는 식

식은 값으로 치환되므로 더 깔끔한 코드를 작성할 수 있다.

```csharp
record Point(int X, int Y);

Point Transform(Point point) => point switch
{
    // property pattern (C# 8.0)
    { X: 0, Y: 0 }                    => point,
    // var pattern (C# 7.0)
    // case guard in switch expression
    { X: var x, Y: var y } when x < y => new Point(x + y, y),
    { X: var x, Y: var y } when x > y => new Point(x - y, y),
    { X: var x, Y: var y }            => new Point(2 * x, 2 * y),
};

Console.WriteLine(Transform(new Point(0,0)));
Console.WriteLine(Transform(new Point(1,0)));
Console.WriteLine(Transform(new Point(0,3)));
Console.WriteLine(Transform(new Point(6,6)));
```

### 속성 패턴 (Property pattern)

속성 패턴이 일치하는지 평가

```csharp
// bool IsHorribleDay(DateTime date) => date is DateTime { Day: 13, DayOfWeek: DayOfWeek.Friday };
bool IsHorribleDay(DateTime date) => date is { Day: 13, DayOfWeek: DayOfWeek.Friday };

Console.WriteLine(IsHorribleDay(DateTime.Now));
```

```csharp
string TakeFive(object input) => input switch
{
    // declartion pattern (C# 7.0) + property pattern (C# 8.0) + relational pattern (C# 9.0)
    string { Length: >= 5 } s => s.Substring(0, 5),
    string s => s,
    // using case guard before property pattern
    ICollection<char> symbols when symbols.Count >= 5 => new string(symbols.Take(5).ToArray()),
    ICollection<char> symbols => new string(symbols.ToArray()),
    null => throw new ArgumentNullException(nameof(input)),
    _ => throw new ArgumentException("Not supported input type."),
};

Console.WriteLine(TakeFive("Hello, world!"));  // output: Hello
Console.WriteLine(TakeFive("Hi!"));  // output: Hi!
Console.WriteLine(TakeFive(new[] { '1', '2', '3', '4', '5', '6', '7' }));  // output: 12345
Console.WriteLine(TakeFive(new[] { 'a', 'b', 'c' }));  // output: abc
```

```csharp
record Point(int X, int Y);
record Segment(Point Start, Point End);

bool IsAnyEndOnXAxis(Segment segment) =>
    // nested property pattern (C# 8.0) in logical pattern (C# 9.0)
    // this noisy code will be improved at C# 10, Extended property pattern
    segment is { Start: { Y: 0 } } or { End: { Y: 0 } };

Console.WriteLine(IsAnyEndOnXAxis(new Segment(new Point(0,0), new Point(0,0))));
Console.WriteLine(IsAnyEndOnXAxis(new Segment(new Point(4,2), new Point(1,2))));
```

### 위치 패턴 (Positional pattern)

표현식을 분해하기 위한 패턴

```csharp
// deconstruct tuple

string Classify((int, int) point) => point switch
{
    (0, 0) => "Origin",
    (1, 0) => "positive X basis end",
    (0, 1) => "positive Y basis end",
    _ => "Just a point",
};

Console.WriteLine(Classify((0, 0)));
Console.WriteLine(Classify((1, 0)));
Console.WriteLine(Classify((0, 1)));
Console.WriteLine(Classify((5, 10)));
```

```csharp
// deconstruct tuple - 2

(int Sum, int Count) SumAndCount(IEnumerable<int> numbers) => (numbers.Sum(), numbers.Count());

var numbers = new List<int> { 1, 2, 3 };
// positional pattern (C# 8.0) + var pattern (C# 7.0) + relational pattern (C# 9.0)
if (SumAndCount(numbers) is (Sum: var sum, Count: > 0))
{
    Console.WriteLine($"Sum of [{string.Join(", ", numbers)}] is {sum}");
}
```

```csharp
// positional record
// https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#positional-syntax-for-property-definition

abstract record Point;
record Point2D(int X, int Y): Point;
record Point3D(int X, int Y, int Z): Point;

bool AreAllCoordinatesPositive(Point point) => point switch
{
    Point2D (> 0, > 0) p => true,
    Point3D (> 0, > 0, > 0) p => true,
    _ => false,
};

Console.WriteLine(AreAllCoordinatesPositive(new Point2D(-1, 1)));
Console.WriteLine(AreAllCoordinatesPositive(new Point2D(5, 4)));
Console.WriteLine(AreAllCoordinatesPositive(new Point3D(-1, 1, -12)));
Console.WriteLine(AreAllCoordinatesPositive(new Point3D(6, 76, 1)));
```

### 버림 패턴 (Discard pattern)

null을 포함한 모든 표현식과 일치하는 패턴

표현식을 추가로 활용하지 않을 때 사용

```csharp
decimal GetDiscountInPercent(DayOfWeek? dayOfWeek) => dayOfWeek switch
{
    DayOfWeek.Monday => 0.5m,
    DayOfWeek.Tuesday => 12.5m,
    DayOfWeek.Wednesday => 7.5m,
    DayOfWeek.Thursday => 12.5m,
    DayOfWeek.Friday => 5.0m,
    DayOfWeek.Saturday => 2.5m,
    DayOfWeek.Sunday => 2.0m,
    _ => 0.0m,
};

Console.WriteLine(GetDiscountInPercent(DayOfWeek.Friday));
Console.WriteLine(GetDiscountInPercent(null));
Console.WriteLine(GetDiscountInPercent((DayOfWeek)10));
```

```csharp
(int Sum, int Count) SumAndCount(IEnumerable<int> numbers) => (numbers.Sum(), numbers.Count());

var numbers = new List<int> { };
// discard pattern (C# 8.0) + positional pattern (C# 8.0)
var (_, count) = SumAndCount(numbers);
if(count == 0)
{
  Console.WriteLine("Empty!");
  // Console.WriteLine(_); // Error
}
```

```csharp
// user-defined class deconstruction with discard
// https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/deconstruct#user-defined-type-with-discards

public class Person
{
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string City { get; set; }
    public string State { get; set; }

    public Person(string fname, string mname, string lname,
                  string cityName, string stateName)
    {
        FirstName = fname;
        MiddleName = mname;
        LastName = lname;
        City = cityName;
        State = stateName;
    }

    // Return the first and last name.
    public void Deconstruct(out string fname, out string lname)
    {
        fname = FirstName;
        lname = LastName;
    }

    public void Deconstruct(out string fname, out string mname, out string lname)
    {
        fname = FirstName;
        mname = MiddleName;
        lname = LastName;
    }

    public void Deconstruct(out string fname, out string lname, out string city, out string state)
    {
        fname = FirstName;
        lname = LastName;
        city = City;
        state = State;
    }
}

var person = new Person("주호", "미들", "김", "경기", "안양");
var (name, _, _, state) = person;
Console.WriteLine($"{name}는 {state}에 산다.");
```

## C# 9.0 (>= .net 5)

[C# 9.0 feature specification > Pattern-matching changes for C# 9.0](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/patterns3)

- 타입 패턴 (Type pattern)
- 관계 패턴 (Relation pattern)
- 논리 패턴 (Logical pattern) `Recursive`
- 괄호 패턴 (Parenthesized pattern)

### 타입 패턴 (Type pattern)

선언 패턴(declaration pattern, C# 7.0)의 단축형

패턴 매칭 이전의 `is` 문법과 용도가 같다.

타입의 지원여부에만 관심이 있고 표현식을 해당하는 패턴으로 사용하지 않을 때 유용

```csharp
abstract class Vehicle {}
class Car: Vehicle {}
class Taxi: Car {}
class Truck: Vehicle {}
class Motorcycle: Vehicle {}

// using declaration pattern without type pattern
static decimal CalculateTollDeclarationPattern(this Vehicle vehicle) => vehicle switch
{
    Car _ => 2.00m,
    Truck _ => 7.50m,
    null => throw new ArgumentNullException(nameof(vehicle)),
    _ => throw new ArgumentException("Unknown type of a vehicle", nameof(vehicle)),
};

// using type pattern
static decimal CalculateTollTypePattern(this Vehicle vehicle) => vehicle switch
{
    Car => 2.00m,
    Truck => 7.50m,
    null => throw new ArgumentNullException(nameof(vehicle)),
    _ => throw new ArgumentException("Unknown type of a vehicle", nameof(vehicle)),
};

Console.WriteLine(new Car().CalculateTollTypePattern());
Console.WriteLine(new Taxi().CalculateTollTypePattern());
Console.WriteLine(new Truck().CalculateTollTypePattern());
Console.WriteLine(new Motorcycle().CalculateTollTypePattern()); // success if error occured
```

### 관계 패턴 (Relation pattern)

[integer](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/integral-numeric-types), [floating-point](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types), [char](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char), [enum](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) 타입에 대해서 `>`, `<`, `<=`, `>=` 관계 연산자를 이용하여 패턴의 일치 비교

```csharp
string GetCalendarSeason(DateTime date) => date.Month switch
{
    // relation pattern (C# 9.0) + logical pattern (C# 9.0)
    >= 3 and < 6 => "spring",
    >= 6 and < 9 => "summer",
    >= 9 and < 12 => "autumn",
    // relation pattern (C# 9.0) + logical pattern (C# 9.0) + parenthesized pattern (C# 9.0)
    12 or (>= 1 and < 3) => "winter",
    _ => throw new ArgumentOutOfRangeException(nameof(date), $"Date with unexpected month: {date.Month}."),
};

Console.WriteLine(GetCalendarSeason(new DateTime(2021, 3, 14)));  // output: spring
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 7, 19)));  // output: summer
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 2, 17)));  // output: winter
```

### 논리 패턴 (Logical pattern)

[Pattern combinator](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/patterns3#pattern-combinators)

`not`, `and`, `or` 패턴 콤비네이터를 이용하여 여러 패턴을 하나의 패턴으로 압축

```csharp
// `and` has a higher parsing priority than `or`
bool IsLetter(char c) => c is >= 'a' and <= 'z' or >= 'A' and <= 'Z';

Console.WriteLine(IsLetter('a'));
Console.WriteLine(IsLetter('Z'));
Console.WriteLine(IsLetter('g'));
```

```csharp
// use parenthesized pattern (C# 9.0) to make precedence explicit
bool IsLetter(char c) => c is (>= 'a' and <= 'z') or (>= 'A' and <= 'Z');

Console.WriteLine(IsLetter('a'));
Console.WriteLine(IsLetter('Z'));
Console.WriteLine(IsLetter('g'));
```

```csharp
// pattern combinator can be extended to any number of patterns by the repeated use of combinator
bool NotCrazyCompute(bool b) => b is not not not not not not not not not not not not not not true;
bool AndCrazyCompute(bool b) => b is not ((not false) and (false or true or false) and (not not not not true or false));
// bool NotCompiledCrazyCompute(object b) => (not false) and (false or true) or (false or true); // pattern!;

Console.WriteLine(NotCrazyCompute(true));
Console.WriteLine(AndCrazyCompute(true));
```

### 괄호 패턴 (parenthesized pattern)

논리 패턴의 순서를 강조하거나 변경하기 위해 괄호를 사용

```csharp
object input = "i am string";

if (input is not (float or double))
{
  Console.WriteLine("I am not float nor double");
}
else
{
  Console.WriteLine("I am float or double");
}
```

## C# 10.0 (>= .net 6)

[C# 10 feature specification > Extended property patterns](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-10.0/extended-property-patterns)

[What's new in C# 10](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-10)

- 확장 속성 패턴 (Extended property pattern)

### 확장 속성 패턴 (Extended property pattern)

재귀 속성 패턴이 가독성에 나쁜 영향을 주기 때문에 도입

```csharp
// not working in .net notebook
// test this in https://dotnetfiddle.net/
using System;

// record struct from C# 10
record struct Point(int X, int Y);
record struct Segment(Point Start, Point End);

public class Program
{
	static bool IsAnyEndOnXAxis(Segment segment) =>
    	segment is { Start.Y: 0 } or { End.Y: 0 };
	public static void Main()
	{
		Console.WriteLine("Hello World");
		Console.WriteLine(IsAnyEndOnXAxis(new Segment(new Point(4,2), new Point(1,2))));
	}
}
```

## `is` in Typescript

[User-Defined Type Guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)

자체구현 타입 판별함수 반환타입에 사용

[More about Type Guard > Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

```typescript
// test this at https://www.typescriptlang.org/play
// 1. type and type guard

type Fish = { swim: () => void }
type Bird = { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

// 2. usages

function getSmallPet(): Fish | Bird {
  const [randomNumber] = window.crypto.getRandomValues(new Uint8Array(1))
  return randomNumber % 2 === 0
    ? {
        swim() {
          console.log("Fish swims!")
        },
      }
    : {
        fly() {
          console.log("Bird flies!")
        },
      }
}

function doPetPlay(pet: Fish | Bird) {
  // pet.swim();
  // error with
  // Property 'swim' does not exist on type 'Fish | Bird'.
  // Property 'swim' does not exist on type 'Bird'.

  if (isFish(pet)) {
    pet.swim()
  } else {
    pet.fly()
  }
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()]
zoo.forEach(doPetPlay)
```

## Haskell의 패턴매칭

[Syntax in Functions > Pattern matching](http://learnyouahaskell.com/syntax-in-functions)

Haskell의 함수 선언할 때, 인자 값에 따라 함수를 나누어 선언할 수 있다

```haskell
// pattern matching in function declaration
// test at https://www.tutorialspoint.com/compile_haskell_online.php

data Algorithm = HMAC | RSA | ECDSA

decodeJwt :: Algorithm -> String -> String
decodeJwt HMAC jwt = "DECODED: HMAC"
decodeJwt RSA jwt = "DECODED: RSA"
decodeJwt ECDSA jwt = "DECODED: ECDSA"

main = putStrLn . decodeJwt ECDSA $ "encoded"
```

## F#의 패턴매칭

[Pattern matching in F#](https://docs.microsoft.com/ko-kr/dotnet/fsharp/language-reference/pattern-matching)

[Discriminated Union](https://docs.microsoft.com/ko-kr/dotnet/fsharp/language-reference/discriminated-unions) 값에 따라 패턴 매칭을 할 수 있다.

```fsharp
type MyOption<'a> =
  | Some of 'a
  | None


let sayHiTo name personInFrontOfMe =
  match personInFrontOfMe with
  | Some(s) when s = name -> printfn $"\"Hi, {name}\""
  | Some(s) -> printfn $"'That is {s}'"
  | None -> printfn "..."

[Some("Juho"); Some("Jason"); None] |> List.iter (sayHiTo "Juho")
```

[Active Pattern](https://docs.microsoft.com/ko-kr/dotnet/fsharp/language-reference/active-patterns)

타입 데이터의 패턴을 미리 선언 해놓고, 나중에 미리 선언 해놓은 패턴을 사용할 수 있다.

```fsharp
let (|Negative|Zero|Positive|) num =
  match num with
  | num when num > 0 -> Positive
  | num when num = 0 -> Zero
  | otherwise -> Negative

let (|Even|Odd|Neither|) num =
  match num with
  | Positive when num % 2 = 0 -> Even
  | Positive -> Odd
  | _ -> Neither

let isEven num =
  match num with
  | Even -> true
  | _ -> false

[-81 .. 15] |> List.filter isEven
```

```fsharp
open System.Drawing

let (|RGB|) (col : System.Drawing.Color) =
     ( col.R, col.G, col.B )

let (|HSB|) (col : System.Drawing.Color) =
   ( col.GetHue(), col.GetSaturation(), col.GetBrightness() )

let printRGB (col: System.Drawing.Color) =x
   match col withz
   | RGB(r, g, b) -> printfn " Red: %d Green: %d Blue: %d" r g b

let printHSB (col: System.Drawing.Color) =
   match col with
   | HSB(h, s, b) -> printfn " Hue: %f Saturation: %f Brightness: %f" h s b

let printAll col colorString =
  printfn "%s" colorString
  printRGB col
  printHSB col

printAll Color.Red "Red"
printAll Color.Black "Black"
printAll Color.White "White"
printAll Color.Gray "Gray"
printAll Color.BlanchedAlmond "BlanchedAlmond"
```
