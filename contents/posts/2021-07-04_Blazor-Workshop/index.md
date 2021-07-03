---
public: true
category: "Post"
date: "2021-07-04T02:15:00+09:00"
title: "Blazor 핵심 정리"
description: "Blazor Workshop 과정 간에 Blazor 기능 핵심 정리"
primaryImage:
  source: ../../images/blazor.png
  alt: "Blazor"
tags:
  - "Blazor"
  - "Workshop"
  - "Authentication"
  - "Service Worker"
---

```toc

```

아래 내용은 [blazor-workshop](https://github.com/dotnet-presentations/blazor-workshop) 과정을 진행하면서 기능 위주로 간략하게 정리한 것이다. 각 제목 옆에 해당 세션에 대한 원본 링크를 추가하였다.

## get-started [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/00-get-started.md)

> Get bits installed and build your first Blazor app

### @page directive

```csharp
@page "/counter"
```

`@page` directive에 의해 웹브라우저가 `/counter` 페이지를 요청하였을 때 이 컴포넌트가 페이지에 그려진다.

### @onclick

```csharp
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
```

버튼을 클릭하였을 때 `@onclick`에 연결된 `IncrementCount` 메소드가 실행된다.

### [Parameter]

```csharp
@code {
    private int currentCount = 0;

    [Parameter]
    public int IncrementAmount { get; set; } = 1;

    private void IncrementCount()
    {
        currentCount += IncrementAmount;
    }
}
```

```csharp
<Counter IncrementAmount="10" />
```

Component의 Parameter를 구성하고 싶을 경우 Parameter Attribute로 꾸민 public property를 작성한다.

## components-and-layout [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/01-components-and-layout.md)

> Get started with components, create the app layout

### @code

```csharp
@code {
    List<PizzaSpecial> specials;
}
```

`@code` 안의 코드들은 컴포넌트 생성을 위한 클래스에 더해진다.

### @inject

```csharp
@inject HttpClient HttpClient
```

작성된 컴포넌트에 `HttpClient` 타입 인스턴스를 프로퍼티로 주입한다.
프로퍼티 생성은 별도의 Dependency Injection을 사용해주어야한다.

```csharp
public static async Task Main(string[] args)
{
    var builder = WebAssemblyHostBuilder.CreateDefault(args);
    builder.RootComponents.Add<App>("#app");
    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
    await builder.Build().RunAsync();
}
```

### OnInitializedAsync

`@code` 안의 `OnInitializedAsync` 메소드를 오버라이드하여 컴포넌트 라이프사이클 코드를 작성할 수 있다.

```csharp
@code {
    List<PizzaSpecial> specials;

    protected override async Task OnInitializedAsync()
    {
        specials = await HttpClient.GetFromJsonAsync<List<PizzaSpecial>>("specials");
    }
}
```

### Layout

레이아웃도 블레이저 컴포넌트이며, Body 프로퍼티를 가지는 `LayoutComponentBase`를 상속(`@inherits`)한다.

```csharp
@inherits LayoutComponentBase

<div class="content">
    @Body
</div>
```

### Router

기본 템플릿에서는 `App.razor`에서 Router 컴포넌트가 최상위로 감싸고 있다.

`RouterView` 컴포넌트의 `DefaultLayout` Parameter가 `MainLayout`으로 되어있기 때문에 별도로 layout을 적용하지 않으면 기본 레이아웃이 적용된다.

다른 레이아웃을 적용하려면 페이지 컴포넌트에 `@layout SomeOtherLayout`처럼 layout directive를 사용한다.

```csharp
<Router AppAssembly="typeof(Program).Assembly" Context="routeData">
    <Found>
        <RouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)" />
    </Found>
    <NotFound>
        <LayoutView Layout="typeof(MainLayout)">
            <div class="main">Sorry, there's nothing at this address.</div>
        </LayoutView>
    </NotFound>
</Router>
```

### NavLink

Blazor에 의해 제공되는 컴포넌트로, `anchor` 태그와 다를 것은 없으나 현재 URL과 일치하는 지에 따라 `active` 클래스가 활성화 된다.

`NavLinkMatch.All`은 전체 URL이 일치할 때에만 active 되는 것을 의미한다.

```csharp
<NavLink href="" class="nav-tab" Match="NavLinkMatch.All">
        <img src="img/pizza-slice.svg" />
        <div>Get Pizza</div>
</NavLink>
```

## customize-a-pizza [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/02-customize-a-pizza.md)

> Add customized pizzas to orders

### @ symbol

`@` 심볼은 razor 파일에서 C# 코드의 시작을 의미한다. 필요할 경우 C# 코드를 괄호로 감쌀 수도 있다.

### @onclick

연결할 DOM UI event에 C# delegate를 지정한다. Delegate는 인자를 받아도 되지만, 받지 않아도 된다.

```csharp
<li @onclick="@(() => ShowConfigurePizzaDialog(special))" style="background-image: url('@special.ImageUrl')">
```

### [Parameter]

컴포넌트 파라미터는 `[Parameter]` 프로퍼티가 입혀져야한다.

반드시 setter가 존재해야하며, 프레임워크에 의해 `get`, `set`이 사용되므로 `public`으로 선언되어야한다.

또한 프레임워크에 의해 렌더링 프로세스 과정에서만 `set` 되어야하므로 해당 프로퍼티를 비정상적으로 설정하지 말자.

```csharp
@code {
    [Parameter] public Pizza Pizza { get; set; }
}
```

### @if

razor에서 해당 조건을 만족시킬 때만 렌더링하고 싶다면 `@if`를 이용한다.

```csharp
@if (showingConfigureDialog)
{
    <ConfigurePizzaDialog Pizza="configuringPizza" />
}
```

### Data Binding (manaul, @bind)

직접 two-way binding을 구현하고 싶다면, `@onchange`에 값을 변경시키는 delegate를 적용한다.

```csharp
<input
    type="range"
    min="@Pizza.MinimumSize"
    max="@Pizza.MaximumSize"
    step="1"
    value="@Pizza.Size"
    @onchange="@((ChangeEventArgs e) => Pizza.Size = int.Parse((string) e.Value))" />
```

하지만 @bind를 이용하여 자동으로 two-way binding을 구현하는 편이 좋다.

어떤 이벤트를 기점으로 바인딩 값이 최신화되기를 바라면, `@bind:event`에 이벤트 이름을 써놓으면 된다.

```csharp
<input type="range" min="@Pizza.MinimumSize" max="@Pizza.MaximumSize" step="1" @bind="Pizza.Size" @bind:event="oninput" />
```

### @foreach

```csharp
@foreach (var topping in Pizza.Toppings)
    {
        <div class="topping">
            @topping.Topping.Name
            <span class="topping-price">@topping.Topping.GetFormattedPrice()</span>
            <button type="button" class="delete-topping" @onclick="@(() => RemoveTopping(topping.Topping))">x</button>
        </div>
    }
```

### @for

```csharp
@for (var i = 0; i < people.Length; i++)
{
    var person = people[i];
    <text>Name: @person.Name</text>
}
```

### Component Event

상하위 컴포넌트 간의 통신은 Component Event를 정의함으로써 가능하다.

Component Event는 하위 컴포넌트에 선언되는 Callback Parameter로 상위 컴포넌트에서 구독한다.

하위 컴포넌트의 Callback Parameter 설정

```csharp
[Parameter] public EventCallback OnCancel { get; set; }
[Parameter] public EventCallback OnConfirm { get; set; }
```

하위 컴포넌트의 Callback Parameter 사용

```csharp
<div class="dialog-buttons">
    <button class="btn btn-secondary mr-auto" @onclick="OnCancel">Cancel</button>
    <span class="mr-center">
        Price: <span class="price">@(Pizza.GetFormattedTotalPrice())</span>
    </span>
    <button class="btn btn-success ml-auto" @onclick="OnConfirm">Order ></button>
</div>
```

상위 컴포넌트의 Callback Parameter 설정

```csharp
<ConfigurePizzaDialog Pizza="configuringPizza" OnCancel="CancelConfigurePizzaDialog" />
```

일반 델리게이트 유형을 사용한 경우 컴포넌트가 렌더링되거나 업데이트 되지 않을 수 있는데, `EventCallback` 타입은 이벤트 핸들러가 컴포넌트에서 정상적으로 작동하기를 보장하기 위한 특별한 타입이다.

## show-order-status [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/03-show-order-status.md)

> Show order status

### @if/else

`@if/else`를 이용하여 조건부 렌더링을 작성할 수 있다.

```csharp
<div class="main">
    @if (ordersWithStatus == null)
    {
        <text>Loading...</text>
    }
    else if (!ordersWithStatus.Any())
    {
        <h2>No orders placed</h2>
        <a class="btn btn-success" href="">Order some pizza</a>
    }
    else
    {
        <text>TODO: show orders</text>
    }
</div>
```

### text element

`<text>`는 HTML element가 아니며, Blazor Component 또한 아니다. 컴파일 후에는 존재하지도 않는다.

razor에서 text는 C# 코드가 아닌 마크업 문자열로 다루기 원할 때 작성한다. 필요할 경우에 한해서만 쓰이기 때문에 찾아 쓸 필요는 없다.

```csharp
<text>TODO: show orders</text>
```

### href=""

웹브라우저는 기본으로 non-slash-prefixed URL에 대해서 `<base href="/">`를 적용한다.

### OnParametersSetAsync

`OnParametersSetAsync` 메소드는 컴포넌트의 파라미터나 프로퍼티가 변경될 때 발생한다.

### router paramerter

```csharp
@page "/myorders/{orderId:int}"
```

`string`을 받을 경우에는 `@page` directive에서 `{parameterName}`와 같이 사용하면 된다. 그리고 컴포넌트의 파라미터로 설정해주면 된다. 이때 파라미터는 대소문자와 관계없다.

하지만 `string`이 아닌 다른 타입으로 받을 경우 `{parameterName:int}`와 같이 파라미터 이름 뒤에 :타입을 붙여주면된다. `bool`, `datetime`, `guid` 등의 타입이 지원된다.

### Routing step-by-step

1. App.razor는 Router를 가지고 있다. Router는 브라우저의 클라이언트-사이드 navigation API와 인터렉션한다. navigation event handler를 등록하여 유저가 link를 클릭 할 때마다 알림을 받는다.
1. 유저가 link를 클릭하였을 때, Router는 destination URL이 현재 SPA 내에 위치하는 지를 확인한다. 위치하지 않는다면, 기존의 full-page navigation이 동작하고, 위치할 경우 Router가 처리한다.
1. Router는 @page URL 패턴에 맞는 컴포넌트를 찾는다.
   - 찾는다면, 그걸로 화면을 그린다
   - 맞는게 없다면, 서버에 위치해있다고 생각하고 full-page load한다
   - full-page load 했음에도 이전과 같은 client-side Blazor를 그린다면, 서버 클라이언트 모두 맞는 컴포넌트가 없다고 판단하여 `NotFound`를 그리게 된다.

### @using

기존 `.cs` 에서 사용한 using과 같다.

### OnParametersSet

컴포넌트 라이프사이클 중 하나로, 컴포넌트가 첫번째 초기화되었을 때와 파라미터들이 변경되는 매번 동작한다. Router Parameter를 변경하였을 때에도 파라미터가 변경되어 동작한다.

### async avoid

async avoid를 쓸 경우 예외가 상위로 전달되지 않는다. (이미 상위 caller는 종료했기 때문) 그때문에 trycatch를 통해 Exception을 잘 처리하는 것이 중요하다.

### StateHasChanged

Blazor 컴포넌트에 강제로 상태가 변화하였음을 알리는 방법이다. 이 메소드가 호출되면 컴포넌트를 다시 렌더링한다.

### @implements

해당 디렉티브를 가진 컴포넌트가 인터페이스를 구현함을 의미한다.

```csharp
@implements IDisposable
```

### Dispose

`IDisoposable`이 구현된 경우, 컴포넌트가 UI에서 사라지는 시점에 Framework는 `Dispose`를 자동으로 호출한다.

### NavigatorManager

프로그래밍 방식으로 Navigation 할 경우 `NavigataionManager`를 활용한다.

```cs
@inject NavigationManager NavigationManager
```

```cs
async Task PlaceOrder()
{
    var response = await HttpClient.PostAsJsonAsync("orders", order);
    var newOrderId = await response.Content.ReadFromJsonAsync<int>();
    order = new Order();
    NavigationManager.NavigateTo($"myorders/{newOrderId}");
}
```

## refactor-state-management [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/04-refactor-state-management.md)

> Refactor state management

### Service Register

Blazor의 서비스는 `program.cs` 의 `Main` 함수에서 이루어진다.

```cs
public static async Task Main(string[] args)
{
    var builder = WebAssemblyHostBuilder.CreateDefault(args);
    builder.RootComponents.Add<App>("#app");

    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
    builder.Services.AddScoped<OrderState>();

    await builder.Build().RunAsync();
}
```

Blazor에서 Singleton 서비스 라이프사이클은 all users를 의미하며, 이는 서버사이드 컴포넌트와 대칭을 이루기 위함이다. Scoped는 현재 unit-of-work를 의미한다.

### AppState pattern

DI를 이용하여 오브젝트 안에 상태를 넣은 후 관계된 컴포넌트끼리 공유하는 패턴이다. 이는 주입되는 오브젝트가 컴포넌트의 라이프사이클을 뛰어넘어 존재하기 때문에 가능하며, presentation(컴포넌트)과 business logic을 강력하게 분리할 수 있다는 장점을 제공한다.

### EventCallback with AppState

`EventCallback`은 Event Handler가 선언된 컴포넌트에 Event Notification을 보내고 컴포넌트를 렌더링한다.

만약 Event Handler가 컴포넌트가 아닌 곳에서 선언되었다면(일반 cs 파일 등), Event Handler와 연결된 컴포넌트로 대체된다. DI로 주입된 오브젝트에서 DI를 주입받은 컴포넌트로 대체되어, 해당 컴포넌트에 Event Notification을 보내고 렌더링하는 것이다.

### AppState pattern이 제공하는 것

- 컴포넌트들 밖에서 공유 상태를 제공함
- 컴포넌트는 상태를 바꾸기 위해 AppState의 메소드를 호출
- `EventCallback`은 change notification을 전달(dispatch)하는 것을 처리

### 렌더링과 이벤팅 복습

- 컴포넌트는 파라미터가 바뀌거나 이벤트를 받았을 때 재렌더링됨
- 이벤트의 전달은 이벤트 핸들러 delegate target에 의존함
- `EventCallback`을 사용함으로써 가장 유연하고 친숙하게 이벤트를 전달할 수 있음

## checkout-with-validation [🌐]()

> Checkout with validation

### Blazor Client-Side Validation

Blazor 클라이언트측 검증은 `EditContext`를 토대로 이루어진다.

`EditContext`는 편집 과정 상태를 추적하며, 따라서 어떤 필드가 수정되었는지, 어떤 데이터가 입력되었는지, 필드들이 valid한지 안한지를 파악한다. 다양한 built-in 컴포넌트가 EditContext에 의해 상태가 읽혀지고(validation 메시지를 보여주기), 쓰여지는 것(유저에 의해 작성된 데이터 채우기) 모두 관리된다.

### `EditForm` 사용하기

`EditForm`은 HTML form tag로 렌더링된다. 이와 동시에 `EditContext`를 통해 form 내부의 변화를 추적한다.

한 컴포넌트 안에 여러 `EditForm`을 쓰는 것은 가능하나, 겹쳐 쓸 수는 없다.(이는 HTML에서의 `form`에서도 마찬가지이다.)

Model 파라미터를 설정함으로써 `EditContext`에게 form이 submit될 때 validate 해야 할 개체를 알려준다.

### DataAnnotationsValidator

`DataAnnotationsValidator`는 `EditContext`의 이벤트에 연결되어 `DataAnnotation` 규칙을 실행시킨다.

```cs
<DataAnnotationsValidator />
```

### ValidationSummary

`ValidationSummary`는 ul 엘리먼트 안에 `EditContext`부터 받은 validation 메시지를 출력한다

```cs
<ValidationSummary />
```

### button type="submit" 사용하기

`button` 엘레먼트에 별도 이벤트를 설정하지 말고 `EditForm`의 `OnValidSubmit`으로 이벤트 핸들러를 옮기자.

`OnValidSubmit`는 form 안의 데이터가 valid함을 확인한 후에 작동한다.

```cs
<EditForm Model="OrderState.Order.DeliveryAddress" OnValidSubmit="PlaceOrder">
```

### ValidationMessage

각 데이터 부분별로 validation 메시지를 출력하기 위해서 `ValidationMessage` 컴포넌트를 사용할 수 있다.

```cs
<div class="form-field">
    <label>Name:</label>
    <div>
        <input @bind="Address.Name" />
        <ValidationMessage For="@(() => Address.Name)" />
    </div>
</div>
```

`For` 파라미터에는 람다식을 사용한다. 이는 프로퍼티의 실제 value를 평가하지 않고 프로퍼티의 메타데이터를 불러오기 위함이다.

별도의 ErrorMessage를 작성하려면 Required DataAnnotation에 ErrorMessage 파라미터에 추가한다.

### 더나은 UX를 위한 Blazor build-in Component InputText

Blazor built-in `InputText` 컴포넌트를 사용하면 value가 변경되는 순간에 `EditContext`에 즉시 알려주므로 validation 상태가 최신화된다. 또한 `EditContext`로부터 validity 정보를 받음으로 valid 정보를 유저가 수정함에 바로 보여줄 수 있다.

이 외에도 `InputCheckbox`, `InputDate`, `InputSelect` 등이 있다.

## authentication-and-authorization [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/06-authentication-and-authorization.md)

> Authenticate users and authorize access to order status

### Blazor built-in Authentication DI Service: AuthenticationStateProvider

Blazor는 `AuthenticationStateProvider`와 OpenID 기반의 데이터를 핸들링하는 컴포넌트와 서비스들을 제공한다.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication` 패키지에 포함되어있다.

[아래와 같은 기능을](https://docs.microsoft.com/ko-kr/aspnet/core/blazor/security/webassembly/?view=aspnetcore-5.0) 제공한다.

- 유저가 로그인하려고 하거나 보호된 리소스에 접근할 때, 로그인 페이지(`/authentication/login`)로 디다이렉트시킴.
- 로그인 페이지에서 앱은 구성된 ID 제공자의 권한 부여 끝점으로 리디렉션하기 위해 준비합니다. 끝점은 사용자가 인증되었는지 여부와 응답하여 하나 이상의 토큰을 발급하는 역할을 합니다. 앱에서 인증 응답을 받기 위한 로그인 콜백을 제공합니다.
  - 사용자가 인증되지 않은 경우 먼저 기본 인증 시스템(일반적으로 ASP.NET Core Identity)으로 리디렉션됩니다.
  - 사용자가 인증되면 인증 끝점이 적절한 토큰을 생성하고 브라우저를 다시 로그인 콜백 끝점(/authentication/login-callback)으로 리디렉션합니다.
- Blazor Web Assembly 앱이 로그인 콜백 끝점(/authentication/login-callback)을 로드하면 인증 응답이 처리됩니다.
  - 인증 프로세스가 성공적으로 완료되면 사용자가 인증되고 선택적으로 사용자가 요청한 원래 보호된 URL로 다시 전송됩니다.
  - 어떤 이유로든 인증 프로세스가 실패하면 로그인 실패 페이지(/authentication/login-failed)로 전송되고 오류가 표시됩니다.

### AddApiAuthorization

서비스를 활성화하려면 `AddApiAuthorization`를 `Program.cs`에서 호출한다.

```cs
public static async Task Main(string[] args)
{
    var builder = WebAssemblyHostBuilder.CreateDefault(args);
    builder.RootComponents.Add<App>("#app");

    builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
    builder.Services.AddScoped<OrderState>();

    // Add auth services
    builder.Services.AddApiAuthorization();

    await builder.Build().RunAsync();
}
```

### RemoteAuthenticatorView

인증 흐름을 조정하기 위해서 `Authentication` 컴포넌트를 Pages에 추가한다. 위에서 말했듯이 기본 경로를 사용한다.

```cs
@page "/authentication/{action}"

<RemoteAuthenticatorView Action="@Action" />

@code{
    [Parameter] public string Action { get; set; }
}
```

`RemoteAuthenticatorView`는 다양한 모든 인증 흐름(registerr, login, profile, logout)을 처리한다. `Action` 파라미터는 `{action}` route 파라미터를 활용한다. 자세한 내용은 [앱 경로 사용자 지정](https://docs.microsoft.com/ko-kr/aspnet/core/blazor/security/webassembly/additional-scenarios?view=aspnetcore-5.0#customize-app-routes)를 참고한다.

### CascadingAuthenticationState and Router

앱에 인증 상태 정보를 공유하기 위해서 `CascadingAuthenticationState` 컴포넌트로 `App.razor`의 `Router` 컴포넌트를 둘러싼다.

```cs
<CascadingAuthenticationState>
    <Router AppAssembly="typeof(Program).Assembly" Context="routeData">
        ...
    </Router>
</CascadingAuthenticationState>
```

이를 통해 cascading 파라미터를 모든 자손 컴포넌튼에 제공한다. cascading 파라미터는 수준 제한 없이 모든 자손에 전달되는 파라미터이다.

### AuthorizeView

```cs
@inject NavigationManager Navigation
@inject SignOutSessionStateManager SignOutManager

<div class="user-info">
    <AuthorizeView>
        <Authorizing>
            <text>...</text>
        </Authorizing>
        <Authorized>
            <img src="img/user.svg" />
            <div>
                <a href="authentication/profile" class="username">@context.User.Identity.Name</a>
                <button class="btn btn-link sign-out" @onclick="BeginSignOut">Sign out</button>
            </div>
        </Authorized>
        <NotAuthorized>
            <a class="sign-in" href="authentication/register">Register</a>
            <a class="sign-in" href="authentication/login">Log in</a>
        </NotAuthorized>
    </AuthorizeView>
</div>

@code{
    async Task BeginSignOut()
    {
        await SignOutManager.SetSignOutState();
        Navigation.NavigateTo("authentication/logout");
    }
}
```

`AuthorizeView`는 유저의 허가(AuthZ) 상황에 맞추어 다른 콘텐츠를 보여주는 built-in 컴포넌트이다. 위 코드는 허가(AuthZ) 조건을 별도로 설정하지 않았으므로 인증(AuthN)되었다면 `Authorized`로, 아닐 경우 `NotAuthorized`로 설정된다.

필요한 곳 어디서든지 `AuthorizeView`를 쓸 수 있다.

등록, 로그인 및 사용자 프로파일 확인 링크는 인증 구성 요소로 이동하는 일반 링크입니다. 로그아웃 링크는 버튼이며 **위조된 요청이 사용자를 로그아웃하지 못하도록 하는 추가적인 논리가 있습니다.** 버튼을 사용하면 사용자 작업에 의해서만 로그아웃이 트리거될 수 있으며, SignOutSession StateManager 서비스는 전체 로그아웃 흐름의 상태를 유지하여 전체 흐름이 사용자 작업으로 시작되도록 합니다.

### Request an access token

액세스 토큰을 받아 outbound 리퀘스트에 적용하려면 `HttpClient`에 `BaseAddressAuthorizationMessageHandler`를 연결해 사용한다. 이 메시지 핸들러는 built-in `IAccessTokenProvider` 서비스를 사용해 액세스 토큰을 받아오고 매 리퀘스트의 표준 `Authorization` 헤더에 입력한다. 만약 액세스 토큰이 없을 경우 유저를 로그인 페이지로 리다이렉트하여 새로운 액세스 토큰을 받게끔 하는 `AccessTokenNotAvailableException` 에러를 발생시킨다.

`BaseAddressAuthorizationMessageHandler`, `AccessTokenNotAvailableException` 모두 `Microsoft.AspNetCore.Components.WebAssembly.Authentication` 네임스페이스에 속해있다.

```cs
namespace BlazingPizza.Client
{
    public class OrdersClient
    {
        private readonly HttpClient httpClient;

        public OrdersClient(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<IEnumerable<OrderWithStatus>> GetOrders() =>
            await httpClient.GetFromJsonAsync<IEnumerable<OrderWithStatus>>("orders");


        public async Task<OrderWithStatus> GetOrder(int orderId) =>
            await httpClient.GetFromJsonAsync<OrderWithStatus>($"orders/{orderId}");


        public async Task<int> PlaceOrder(Order order)
        {
            var response = await httpClient.PostAsJsonAsync("orders", order);
            response.EnsureSuccessStatusCode();
            var orderId = await response.Content.ReadFromJsonAsync<int>();
            return orderId;
        }
    }
}
```

```cs
builder.Services.AddHttpClient<OrdersClient>(client => client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();
```

### Authorizing access to specific order details on Server-side

```cs
namespace BlazingPizza.Server
{
    [Route("orders")]
    [ApiController]
    [Authorize]
    public class OrdersController : Controller
    {
        ...
        [HttpPost]
        public async Task<ActionResult<int>> PlaceOrder(Order order)
        {
            ...
            order.UserId = GetUserId();
            ...
        }
        ...
        private string GetUserId()
        {
            return HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
```

서버 측의 Controller의 `HttpContext`의 `User`로부터 값을 가져온다.

ASP.NET Core Controller는 매 request마다 새로 만들어진다. Spring MVC의 Controller가 Singleton Lifecycle인 것과는 차이가 있다.

### Enforcing login on specific pages on Client-side

`App.razor`의 `RouterView`를 `AuthorizeRouterView`로 바꾼 후 Blazor 페이지 컴포넌트에 `AuthorizeAttribute`를 추가한다.

```csharp
@attribute [Authorize]
```

```csharp
<CascadingAuthenticationState>
    <Router AppAssembly="typeof(Program).Assembly" Context="routeData">
        <Found>
            <AuthorizeRouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)">
                <NotAuthorized>
                    <p>You are not authorized to access this resource.</p>
                </NotAuthorized>
                <Authorizing>
                    <div class="main">Please wait...</div>
                </Authorizing>
            </AuthorizeRouteView>
        </Found>
        <NotFound>
            <LayoutView Layout="typeof(MainLayout)">
                <div class="main">Sorry, there's nothing at this address.</div>
            </LayoutView>
        </NotFound>
    </Router>
</CascadingAuthenticationState>
```

### Redirect Component with returnUrl parameter

```cs
@inject NavigationManager Navigation
@code {
    protected override void OnInitialized()
    {
        Navigation.NavigateTo($"authentication/login?returnUrl={Navigation.Uri}");
    }
}
```

```
https://localhost:5001/Identity/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DBlazingPizza.Client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A5001%252Fauthentication%252Flogin-callback%26response_type%3Dcode%26scope%3DBlazingPizza.ServerAPI%2520openid%2520profile%26state%3D4f009a76ebdf482c894a67a834a19656%26code_challenge%3DXuCn2RXO8cKq2rXr4jwZyqZGFpJ_VrLEhRlk_9wGbd0%26code_challenge_method%3DS256%26response_mode%3Dquery
```

returnUrl를 이용하면, 리다이렉트된 로그인 페이지에서 로그인했을 때 returnUrl로 이동한다.

### Simple AuthorizeView

`AuthorizeView` 내에 별도 `Authorizing`, `Authorized`, `NotAuthorized` 없이 내부를 작성하면 `Authorized` 되었을 때만 보인다.

```cs
<AuthorizeView>
    <NavLink href="myorders" class="nav-tab">
        <img src="img/bike.svg" />
        <div>My Orders</div>
    </NavLink>
</AuthorizeView>
```

### Preserving state across the redirection flow

persisted하려는 데이터를 정해, `RemoteAuthenticationState`를 상속한 클래스에 추가한다. `RemoteAuthenticationState`는 returnURL과 같은 리다이렉트로부터 상태를 보존하기 위해 인증 시스템에서 사용된다.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication` 네임스페이스에 속해있다.

```cs
public class PizzaAuthenticationState : RemoteAuthenticationState
{
    public Order Order { get; set; }
}
```

기본 `RemoteAuthenticationState` 서비스를 대체하기 위해 `Program.cs`에서 해당 클래스를 서비스로 추가한다. `AddApiAuthorization`은 Auth 기능 활성화를 위해 맨처음 추가했던 서비스이다.

```cs
builder.Services.AddApiAuthorization<PizzaAuthenticationState>();
```

현재 상태를 persist하기 위한 로직 코드를 추가한다.

이를 위해 `@page "/authentication/{action}"`에 있는 Authenticator 페이지 컴포넌트가 `RemoteAuthenticatorView`가 아닌 `RemoteAuthenticatorViewCore`를 사용하도록 변경한다.

```cs
@page "/authentication/{action}"
@inject OrderState OrderState
@inject NavigationManager NavigationManager

<RemoteAuthenticatorViewCore
    TAuthenticationState="PizzaAuthenticationState"
    AuthenticationState="RemoteAuthenticationState"
    OnLogInSucceeded="RestorePizza"
    Action="@Action" />

@code{
    [Parameter] public string Action { get; set; }

    public PizzaAuthenticationState RemoteAuthenticationState { get; set; } = new PizzaAuthenticationState();

    protected override void OnInitialized()
    {
        if (RemoteAuthenticationActions.IsAction(RemoteAuthenticationActions.LogIn, Action))
        {
            // Preserve the current order so that we don't loose it
            RemoteAuthenticationState.Order = OrderState.Order;
        }
    }

    private void RestorePizza(PizzaAuthenticationState pizzaState)
    {
        if (pizzaState.Order != null)
        {
            OrderState.ReplaceOrder(pizzaState.Order);
        }
    }
}
```

`RemoteAuthenticatorViewCore`의 각 파라미터는 다음과 같다

- `TAuthenticationState`: `AuthenticationState의 타입
- `AuthenticationState`: 인증 작업 중에 유지 되는 인스턴스
- `OnLogInSucceeded`: 로그인 작업이 성공할 때 저장된 인증 상태를 사용하여 호출되는 이벤트 콜백
- `Action`: `RemoteAuthenticationActions` 구성 요소가 처리해야 하는 동작

미인증 상태에서 로그인 화면으로 들어가면 Local Storage에 Authentication State가 존재하는 것을 알 수 있다.

### Customizing the logout experience

Auth 서비스 추가 중에 옵션을 설정함으로써 로그아웃 되었을 때 리다이렉트될 페이지를 지정할 수 있다.

```cs
builder.Services.AddApiAuthorization<PizzaAuthenticationState>(options =>
{
    options.AuthenticationPaths.LogOutSucceededPath = "";
});
```

## javascript-interop [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/07-javascript-interop.md)

> Track order status on a real time map

### Using JSRuntime

```cs
@using Microsoft.JSInterop
@inject IJSRuntime JSRuntime

<div id="@elementId" style="height: 100%; width: 100%;"></div>

@code {
    string elementId = $"map-{Guid.NewGuid().ToString("D")}";

    [Parameter] double Zoom { get; set; }
    [Parameter] List<Marker> Markers { get; set; }

    protected async override Task OnAfterRenderAsync(bool firstRender)
    {
        await JSRuntime.InvokeVoidAsync(
            "deliveryMap.showOrUpdate",
            elementId,
            Markers);
    }
}
```

`IJSRuntime` 인스턴스를 DI되어 `InvokeVoidAsync` 혹은 `InvokeAsync<TResult>` 메소드를 사용한다. 이 메소드들의 첫번째 인자는 root window 오브젝트로부터의 함수 위치이며(콘솔창에서 접근할 때의 identity), 나머지 파라미터는 JSON serialized되어 해당 함수에 전달된다.

### \_Import.razor

`_Import.razor`에서 전역 using을 해주고 있으므로 다른 곳에서 다시 `@using` directive를 사용하지 않아도 된다.

## templated-components [🌐]()

> Create and use components with template parameters

### csproj for RazorClassLib

```xml
<Project Sdk="Microsoft.NET.Sdk.Razor">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components" Version="5.0.7" />
    <PackageReference Include="Microsoft.AspNetCore.Components.Web" Version="5.0.7" />
  </ItemGroup>

</Project>
```

### Writing a templated dialog

`LayoutComponentBase`가 Body 파라미터로 `RenderFragement`타입을 받는데, 이는 런타임이 별도로 핸들링하는 델리게이트 타입이다. 이 타입은 어떠한 컴포넌트에서도 파라미터로 사용할 수 있다.

```cs
@if (Show)
{
    <div class="dialog-container">
        <div class="dialog">
            @ChildContent
        </div>
    </div>
}

@code {
    [Parameter] public RenderFragment ChildContent { get; set; }
    [Parameter] public bool Show { get; set; }
}
```

이때 `ChildContent`라는 파라미터는 특별한 이름으로 하나의 콘텐츠 파라미터가 있을 때에 대한 컨벤션이다.

같은 솔루션 내의 다른 프로젝트에서 다음과 같이 프로젝트를 참조할 수 있다.

```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
  ...
  <ItemGroup>
    <ProjectReference Include="..\BlazingComponents\BlazingComponents.csproj" />
    <ProjectReference Include="..\BlazingPizza.ComponentsLibrary\BlazingPizza.ComponentsLibrary.csproj" />
    <ProjectReference Include="..\BlazingPizza.Shared\BlazingPizza.Shared.csproj" />
  </ItemGroup>
  ...
</Project>
```

위에 작성한 컴포넌트를 통해 다일로그 사용을 변경한다.

이전

```cs
@if (OrderState.ShowingConfigureDialog)
{
    <ConfigurePizzaDialog
        Pizza="OrderState.ConfiguringPizza"
        OnConfirm="OrderState.ConfirmConfigurePizzaDialog"
        OnCancel="OrderState.CancelConfigurePizzaDialog" />
}
```

이후

```cs
<TemplatedDialog Show="OrderState.ShowingConfigureDialog">
    <ConfigurePizzaDialog
        Pizza="OrderState.ConfiguringPizza"
        OnCancel="OrderState.CancelConfigurePizzaDialog"
        OnConfirm="OrderState.ConfirmConfigurePizzaDialog" />
</TemplatedDialog>
```

TemplatedDialog 내부의 컨텐츠가 RenderFragment 타입으로 ChildContent 파라미터에 전달된 것이다.

### @typeparam

제네릭 타입 컴포넌트를 만들기 위해 컴포넌트 최상단에 `@typeparam` directive를 사용한다.

```cs
@typeparam TItem
```

그 후 `@code`에서 제네릭을 사용하여 코드를 입력한다.

```cs
@code {
    IEnumerable<TItem> items;

    [Parameter] public Func<Task<IEnumerable<TItem>>> Loader { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        items = await Loader();
    }
}
```

### Multiple RenderFragment

여러 `RenderFragment`를 파라미터로 받을 때에는 `ChildContent` 대신 각각의 파라미터 이름을 작성한다.

RenderFragment가 파라미터를 받을 경우에는 제네릭을 활용해 파라미터 타입을 기재한다.

```cs
@typeparam TItem

@if (items == null)
{
    @Loading
}
else if (!items.Any())
{
    @Empty
}
else
{
    <div class="list-group @ListGroupClass">
        @foreach (var item in items)
        {
            <div class="list-group-item">
                @Item(item)
            </div>
        }
    </div>
}

@code {
    IEnumerable<TItem> items;

    [Parameter] public Func<Task<IEnumerable<TItem>>> Loader { get; set; }

    [Parameter] public RenderFragment Loading { get; set; }
    [Parameter] public RenderFragment Empty { get; set; }
    [Parameter] public RenderFragment<TItem> Item { get; set; }
    [Parameter] public string ListGroupClass { get; set; }

    protected override async Task OnParametersSetAsync()
    {
        items = await Loader();
    }
}
```

`@typeparam`으로 인해, 해당 타입을 파라미터로 넘길 수 있다.(옵션)

`Item` 파라미터는 파라미터를 받는 `RenderFragment<T>` 였다. 기본으로 이 파라미터는 `context`라고 불린다. `<Item></Item>` 안쪽에서는 `@context`를 통해 해당 파라미터를 참조할 수 있다. 이 내부 파라미터의 이름을 `Context` 파라미터를 이용하여 바꿀 수 있다.

```cs
<TemplatedList Loader="@LoadOrders" TItem="OrderWithStatus">
    <Loading>
        Loading...
    </Loading>
    <Empty>
        <h2>No orders placed</h2>
        <a class="btn btn-success" href="">Order some pizza</a>
    </Empty>
    <Item Context="item">
        <div class="col">
            <h5>@item.Order.CreatedTime.ToLongDateString()</h5>
            Items:
            <strong>@item.Order.Pizzas.Count()</strong>;
            Total price:
            <strong>£@item.Order.GetFormattedTotalPrice()</strong>
        </div>
        <div class="col">
            Status: <strong>@item.StatusText</strong>
        </div>
        <div class="col flex-grow-0">
            <a href="myorders/@item.Order.OrderId" class="btn btn-success">
                Track &gt;
            </a>
        </div>
    </Item>
</TemplatedList>
```

## progressive-web-app [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/09-progressive-web-app.md#progressive-web-app-pwa-features)

> Progressive Web App (PWA) features

### Adding a service worker

PWA의 거의 모든 기능들은 [서비스 워커](https://developers.google.com/web/fundamentals/primers/service-workers)라는 것을 필요로한다. 이는 Javascript 파일로 보통 작다. 어플리케이션 컨텍스트 밖에서의 이벤트 핸들러가 작성되는 공간이다.

.NET 기반인 Blazor의 경우에도 서비스 워커는 Javascript로 작성되어야한다. 왜냐하면 어플리케이션 밖에서 동작하기 때문이다. 기술적으로 .NET 코드로 작성할 수 있으나, 비지니스 코드보다 .NET에서 동작하기 위한 코드를 더 많이 작성해야하기 때문에 합리적이지는 않다.

서비스 워커를 추가하고 싶다면, `wwwroot` 폴더 내에 `service-worker.js` 파일을 추가한다. 파일에 아래 내용을 입력한다.

```javascript
self.addEventListener("install", async (event) => {
  console.log("Installing service worker...")
  self.skipWaiting()
})

self.addEventListener("fetch", (event) => {
  // You can add custom logic here for controlling whether to use cached data if offline, etc.
  // The following line opts out, so requests go directly to the network as usual.
  return null
})
```

위 코드는 아무것도 하지않는다. 스스로를 설치하며, 브라우저가 자신의 도메인으로 fetch 이벤트를 발생할 때에도 아무것도 하지 않는다. 필요하다면 이 파일에 오프라인 지원과 같은 기능들을 추가할 수 있다.

이 서비스 워커 파일을 등록하려면, `index.html`에 `<body>` 안에 script를 입력한다.

```html
<script>
  navigator.serviceWorker.register("service-worker.js")
</script>
```

### Making your app installable

`wwwroot`에 `manifest.json` 파일을 작성한다.

```json
{
  "short_name": "Blazing Pizza",
  "name": "Blazing Pizza",
  "icons": [
    {
      "src": "img/icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#860000",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#860000"
}
```

작성한 파일은 `index.html`의 `<head>` 안에서 등록한다.

```html
<link rel="manifest" href="manifest.json" />
```

이렇게 한 후 사이트에 접속하면 웹브라우저에서 앱을 설치할 수 있다는 표시가 나타나게 된다.

### Sending push notifications

Push Notification을 보내기 위해선, 유저의 허가를 받아야한다. 동의를 받고나면, 브라우저는 `subscription`을 생성하게 된다. `subscription`은 토큰들로 유저에게 notification을 route할 때 사용할 수 있다.

`JSRuntime`을 주입해서 `blazorPushNotifications.requestSubscription` 함수를 실행하여 허가를 받는다.

```cs
protected override void OnInitialized()
{
    // In the background, ask if they want to be notified about order updates
    _ = RequestNotificationSubscriptionAsync();
}


async Task RequestNotificationSubscriptionAsync()
{
    var subscription = await JSRuntime.InvokeAsync<NotificationSubscription>("blazorPushNotifications.requestSubscription");
    if (subscription != null)
    {
        try
        {
            await OrdersClient.SubscribeToNotifications(subscription);
        }
        catch (AccessTokenNotAvailableException ex)
        {
            ex.Redirect();
        }
    }
}
```

`SubscribeToNotifications`는 다음과 같이 서버에 구독을 요청한다.

```cs
public async Task SubscribeToNotifications(NotificationSubscription subscription)
{
    var response = await httpClient.PutAsJsonAsync("notifications/subscribe", subscription);
    response.EnsureSuccessStatusCode();
}
```

### Sending Notification

notification을 보내는 작업은 서버 쪽에 여러 복잡한 암호화 작업이 필요하지만, `WebPush` NuGet 패키지를 이용하여 쉽게 구현할 수 있다.

```cs
[HttpPost]
public async Task<ActionResult<int>> PlaceOrder(Order order)
{
    ...

    // In the background, send push notifications if possible
    var subscription = await _db.NotificationSubscriptions.Where(e => e.UserId == GetUserId()).SingleOrDefaultAsync();
    if (subscription != null)
    {
        _ = TrackAndSendNotificationsAsync(order, subscription);
    }

    return order.OrderId;
}
```

```cs
private static async Task SendNotificationAsync(Order order, NotificationSubscription subscription, string message)
{
    // For a real application, generate your own
    var publicKey = "BLC8GOevpcpjQiLkO7JmVClQjycvTCYWm6Cq_a7wJZlstGTVZvwGFFHMYfXt6Njyvgx_GlXJeo5cSiZ1y4JOx1o";
    var privateKey = "OrubzSz3yWACscZXjFQrrtDwCKg-TGFuWhluQ2wLXDo";

    var pushSubscription = new PushSubscription(subscription.Url, subscription.P256dh, subscription.Auth);
    var vapidDetails = new VapidDetails("mailto:<someone@example.com>", publicKey, privateKey);
    var webPushClient = new WebPushClient();
    try
    {
        var payload = JsonSerializer.Serialize(new
        {
            message,
            url = $"myorders/{order.OrderId}",
        });
        await webPushClient.SendNotificationAsync(pushSubscription, payload, vapidDetails);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine("Error sending push notification: " + ex.Message);
    }
}
```

```cs
private static async Task TrackAndSendNotificationsAsync(Order order, NotificationSubscription subscription)
{
    // In a realistic case, some other backend process would track
    // order delivery progress and send us notifications when it
    // changes. Since we don't have any such process here, fake it.
    await Task.Delay(OrderWithStatus.PreparationDuration);
    await SendNotificationAsync(order, subscription, "Your order has been dispatched!");

    await Task.Delay(OrderWithStatus.DeliveryDuration);
    await SendNotificationAsync(order, subscription, "Your order is now delivered. Enjoy!");
}
```

```cs
private static async Task SendNotificationAsync(Order order, NotificationSubscription subscription, string message)
{
    // For a real application, generate your own
    var publicKey = "BLC8GOevpcpjQiLkO7JmVClQjycvTCYWm6Cq_a7wJZlstGTVZvwGFFHMYfXt6Njyvgx_GlXJeo5cSiZ1y4JOx1o";
    var privateKey = "OrubzSz3yWACscZXjFQrrtDwCKg-TGFuWhluQ2wLXDo";

    var pushSubscription = new PushSubscription(subscription.Url, subscription.P256dh, subscription.Auth);
    var vapidDetails = new VapidDetails("mailto:<someone@example.com>", publicKey, privateKey);
    var webPushClient = new WebPushClient();

    try
    {
        var payload = JsonSerializer.Serialize(new
        {
            message,
            url = $"myorders/{order.OrderId}"
        });
        await webPushClient.SendNotificationAsync(pushSubscription, payload, vapidDetails);
    }
    catch(Exception ex)
    {
        Console.Error.WriteLine("Error sending push notification: " + ex.Message);
    }
}
```

### Displaying notifications

`service-worker.js`에 notification을 보여주는 코드를 작성한다.

```js
self.addEventListener("push", (event) => {
  const payload = event.data.json()
  event.waitUntil(
    self.registration.showNotification("Blazing Pizza", {
      body: payload.message,
      icon: "img/icon-512.png",
      vibrate: [100, 50, 100],
      data: { url: payload.url },
    }),
  )
})
```

### Handling clicks on notifications.

`service-worker.js`에서 `notificationclick` 이벤트를 추가한다.

```js
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
```

## publish-and-deploy [🌐](https://github.com/dotnet-presentations/blazor-workshop/blob/master/docs/10-publish-and-deploy.md)

> Deploy your app to Azure

Azure 사용법이라 따로 적지 않음.
