# Next.js-13version-weekly-process
Next.js 13버전을 이용하여 기존의 프로젝트를 업그레이드 하기 위해 짧은 기간 진행한 레포입니다.
---
# Next.js 13 버전 업그레이드 프로세스

Next.js 13버전을 활용하여 현재 프로젝트를 업그레이드하기 위한 주간 진행 내용을 담은 레포입니다.

## 📌 Process 1: Next.js 13 사전조사

---

### **1. 렌더링 종류 이해하기**

- **SSR (Server Side Rendering) - 서버 사이드 렌더링**
    - **정의**: 사용자가 요청할 때마다 서버에서 완전한 페이지를 생성하여 클라이언트로 보내줍니다.
    - **장점**:
        - 초기 페이지 로드 시간이 짧습니다.
        - SEO 최적화에 좋습니다.
    - **단점**:
        - 서버 부하가 크기 때문에 대량의 트래픽에 취약할 수 있습니다.
        - 페이지를 업데이트하려면 서버에서 새롭게 렌더링해야 합니다.
- **CSR (Client Side Rendering) - 클라이언트 사이드 렌더링**
    - **정의**: 초기 페이지 로드 시에는 비어있는 페이지나 로더만 보여주고, 필요한 데이터를 가져온 후에 클라이언트에서 JavaScript로 렌더링합니다.
    - **장점**:
        - 동적인 데이터나 사용자 상호작용에 더 유연합니다.
        - 한번 페이지를 로드한 후에는 빠르게 페이지 간 이동이 가능합니다.
    - **단점**:
        - 초기 로드 시간이 길 수 있습니다.
        - SEO 최적화가 복잡할 수 있습니다.
- **SSG (Static Site Generation) - 정적 사이트 생성**
    - **정의**: 빌드 타임에 모든 페이지를 미리 생성하여, 사용자가 요청할 때마다 이미 생성된 정적 페이지를 제공합니다.
    - **장점**:
        - 서버 부하가 최소화됩니다.
        - CDN에 쉽게 캐싱되어 전 세계 어디에서나 빠르게 제공될 수 있습니다.
        - 보안성이 좋습니다.
        - SEO 최적화에 매우 유리합니다.
    - **단점**:
        - 동적 데이터나 사용자 상호작용에는 제한적입니다.
        - 사이트나 컨텐츠를 업데이트하려면 전체 사이트를 다시 빌드해야 합니다.

### 2. **Next.js 13 업데이트 요약 및 예시 코드**

**1. 서버 사이드 컴포넌트의 도입**

- 13버전부터 모든 React 컴포넌트는 기본적으로 서버사이드 컴포넌트로 동작합니다.

**2. 새로운 'app' 디렉토리 구조**

- `pages` 폴더 대신 `app/` 디렉토리를 사용합니다.
- v12에서는 **`pages`** 폴더 아래의 모든 파일이 경로로 동작했으나, v13에서는 **`app/`** 디렉토리가 도입되었습니다.
- 이를 통해 디렉토리 구조가 더 깔끔해지며, 새로운 기능들인 layout, React 서버 컴포넌트, 스트리밍을 사용할 수 있습니다.

```jsx
// app/Home.page.tsx

export default function Home() {
  return <div>Welcome to Next.js 13</div>;
}

```

**3. Layout 및 Head 구조의 변화**

- **`layout.tsx`**는 기존 **`_app.tsx`** 및 **`_document.tsx`**의 역할을 합니다.
- **`head.tsx`**로 각 페이지마다의 meta 정보나 title을 설정할 수 있습니다.
- `layout.tsx` 및 `head.tsx` 사용 예시입니다.

```jsx
// app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}

// app/head.tsx

export default function Head() {
  return (
    <>
      <title>My Next.js 13 App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  );
}

```

**4. Data Fetching의 변화**

- React Suspense를 기반으로 새롭게 구현된 데이터 fetching 방식이 도입되었습니다.
- **`getServerSideProps`** 및 **`getStaticProps`**의 대안으로 새로운 fetch 옵션이 추가되었습니다.
- 새로운 fetch 옵션 예시입니다.

```jsx
// app/SomePage.page.tsx

export default function SomePage({ data }) {
  return <div>{data}</div>;
}

// 데이터를 가져올 때
fetch(URL, { cache: 'force-cache' }); // 기본적으로 캐시 사용
fetch(URL, { cache: 'no-store' });    // 항상 새로운 데이터 요청
fetch(URL, { next: { revalidate: 10 } }); // 10초마다 새로운 데이터 요청

```

**5. Turbopack 번들러의 도입**

- 별도의 설정 없이 기본적으로 Rust 기반의 새로운 번들러인 Turbopack가 번들링을 수행합니다.
- 기존의 webpack에 비해 700배 빠르며, vite에 비해 10배 빠르다고 주장됩니다.

**6. Font 최적화 (next/font)**

- 글꼴을 자동으로 최적화하여 성능 향상 및 개인 정보 보호가 가능합니다.
- 구글 폰트 및 커스텀 폰트 모두 지원하며, 자동 호스팅과 캐싱을 통한 성능 향상을 지원합니다.
- 구글 폰트 및 커스텀 폰트 사용 예시입니다.

```jsx
// app/someComponent.tsx

import { Inter } from '@next/font/google';
const inter = Inter();

function Component() {
  return <div className={inter.className}>Hello with Inter font!</div>;
}

// 커스텀 폰트 사용
import localFont from '@next/font/local';
const myFont = localFont({ src: './my-font.woff2' });

function AnotherComponent() {
  return <div className={myFont.className}>Hello with my custom font!</div>;
}

```

**7. next/link의 변화**

- v12에서는 **`<Link>`** 태그 내에 **`<a>`** 태그가 포함되어야 했지만, 
v13에서는 **`<Link>`** 태그 자체가 **`<a>`** 태그를 렌더링합니다.
- `<Link>` 사용 예시입니다.

```jsx
// app/anotherComponent.tsx

import Link from 'next/link'

function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

```

### 3. Next.js의 폴더 라우팅 및 API Routes

**Next.js 폴더 라우팅**

Next.js는 파일 기반 라우팅 시스템을 가지고 있습니다. 즉, 파일 또는 폴더의 구조가 그대로 웹사이트의 URL 구조로 변환됩니다.

- `app` 디렉토리: Next.js 13부터 도입된 새로운 폴더 구조입니다. 이 디렉토리 내부의 `.page.tsx` 혹은 `.page.js` 파일은 웹 페이지로 자동 변환됩니다.
- `pages` 디렉토리: 이 디렉토리 내의 모든 파일은 웹 페이지로 자동 변환됩니다. 예를 들어, `about.tsx` 또는 `about.js` 파일은 `/about` 경로로 접근할 수 있습니다.

**동적 라우팅**:

- 대괄호([])를 사용하여 파일 또는 폴더 이름을 감싸면 동적 라우팅을 생성할 수 있습니다. 예를 들어 `pages/posts/[id].tsx`는 `/posts/1`, `/posts/2` 등으로 접근할 수 있습니다.

**API Routes**

Next.js는 API 라우팅 기능을 제공하여 서버 사이드 로직을 쉽게 구현할 수 있습니다.

- `pages/api` 디렉토리: 이 디렉토리 내의 모든 파일은 API 라우트로 자동 변환됩니다.
- 함수의 형태를 가진 파일을 작성하여 API 로직을 처리할 수 있습니다.

**예시**:

`pages/api/hello.js` 파일을 생성하면, `/api/hello` 경로로 API 호출이 가능합니다.

```jsx
// pages/api/hello.js
export default (req, res) => {
  res.status(200).json({ text: 'Hello' });
}

```

**주의**:

- `pages/api` 디렉토리 내의 파일은 프론트엔드에서 직접 접근하거나 임포트해서는 안 됩니다. 이는 API 라우트 전용 파일입니다.

이것이 Next.js 13의 폴더 라우팅 및 API 라우트에 관한 기본적인 설명입니다. Next.js는 이 외에도 다양한 고급 라우팅 기능을 제공하며, 공식 문서에서 자세한 정보를 확인할 수 있습니다.

### 4. Next.js의 인기 요인

Next.js는 수많은 웹 개발자와 기업들 사이에서 인기를 얻고 있는 프레임워크입니다. 그 인기의 주된 이유는 다음과 같습니다:

1. **향상된 개발 경험**:
    - **핫 리로딩**: 변경사항을 저장하면 페이지가 자동으로 새로고침 없이 업데이트됩니다.
    - **에러 리포팅**: 명확한 에러 메시지를 통해 문제를 쉽게 해결할 수 있습니다.
2. **빠르고 최적화된 프로덕션 빌드**:
    - 자동 코드 분할, 최적화, 레이지 로딩 등을 포함하여 최상의 성능을 달성합니다.
3. **서버 사이드 렌더링 (SSR)**:
    - 초기 페이지 로드 시간을 단축시키고 SEO 최적화에도 기여합니다.
4. **정적 사이트 생성 (SSG)**:
    - 빌드 시점에 페이지를 생성하여 배포 시에는 서버 요청 없이 페이지를 로드할 수 있습니다.
5. **API 라우트**:
    - API 생성이 간편하게 되어 백엔드와 프론트엔드 개발을 동일한 프로젝트 내에서 할 수 있습니다.
6. **확장성**:
    - 커스텀 웹 서버 설정, 다양한 백엔드와의 통합 등 다양한 확장 옵션이 제공됩니다.
7. **커뮤니티 및 지원**:
    - 강력한 커뮤니티 지원과 Vercel 같은 회사의 지원을 받으며, 다양한 플러그인과 라이브러리가 활발히 개발되고 있습니다.
8. **모듈러 구조**:
    - 앱의 크기와 복잡성에 따라 필요한 기능만 선택하여 사용할 수 있습니다.
9. **TypeScript 지원**:
    - Next.js는 기본적으로 TypeScript를 지원하므로, 강력한 타입 검사와 함께 개발할 수 있습니다.
10. **향상된 성능 최적화 도구**:
- 이미지 최적화, 국제화 지원, 환경 변수 설정 등 많은 편의 기능을 제공하여 웹 사이트의 성능과 사용성을 향상시킵니다.

이런 요소들 덕분에, Next.js는 현대 웹 애플리케이션 개발에 최적화된 프레임워크로 여겨지며 전 세계적으로 많은 인기를 얻고 있습니다.

## 📌 References

[https://velog.io/@jeromecheon/프론트엔드라면-반드시-알아야-할-Rendering과-세가지-개념-CSR-SSR-SSG](https://velog.io/@jeromecheon/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EB%9D%BC%EB%A9%B4-%EB%B0%98%EB%93%9C%EC%8B%9C-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-Rendering%EA%B3%BC-%EC%84%B8%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-CSR-SSR-SSG)

[https://velog.io/@sseung-i/Next.js-13으로-공부-시작-렌더](https://velog.io/@sseung-i/Next.js-13%EC%9C%BC%EB%A1%9C-%EA%B3%B5%EB%B6%80-%EC%8B%9C%EC%9E%91-%EB%A0%8C%EB%8D%94)

https://pozafly.github.io/nextjs/about-modularizing-api-routes-code-in-nextjs/

https://torimaru.tistory.com/42

https://nextjs.org/blog/next-13
