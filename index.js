// 라우트 테이블: path -> view 함수(HTML 문자열 반환)
const routes = {
  '/': () => `
    <section class="section">
      <h1>Home</h1>
      <p>해시 기반 라우터로 동작하는 홈 화면입니다. 위/아래로 갈라지는 인트로 애니메이션이 라우트 전환 시 재생됩니다.</p>
    </section>
    <section class="section">
      <h1>Intro Demo</h1>
      <p>상단 이미지가 0.5초 뒤에 서서히 나타나는 효과가 들어가 있습니다.</p>
    </section>
  `,
  '/about': () => `
    <section class="section">
      <h1>About</h1>
      <p>이 페이지는 리액트 없이 해시(#) 라우팅으로 구현되었습니다. 서버 설정 없이 GitHub Pages 등 정적 호스팅에서도 잘 동작합니다.</p>
    </section>
  `,
  '/gallery': () => `
    <section class="section">
      <h1>Gallery</h1>
      <p>여기에 이미지 그리드를 넣거나, 라우트 전환 애니메이션과 함께 콘텐츠를 구성할 수 있습니다.</p>
    </section>
  `,
  '/contact': () => `
    <section class="section">
      <h1>Contact</h1>
      <p>문의나 연락처 정보를 배치하세요. 이 예시는 SPA처럼 동작하지만 실제로는 단일 HTML + 해시 라우팅입니다.</p>
    </section>
  `,
};

// 현재 해시에서 경로 추출
function getPathFromHash() {
  const h = location.hash || '#/';
  const path = h.replace(/^#/, '');
  return path || '/';
}

// 네비 활성화 표시
function updateActiveNav(path) {
  document.querySelectorAll('.nav a').forEach(a => {
    const target = a.getAttribute('href').replace(/^#/, '');
    a.classList.toggle('active', target === path);
  });
}

// 인트로 오버레이 재생: 템플릿을 클론해서 붙이고, 일정 시간 후 제거
function playIntroOverlay() {
  const tpl = document.getElementById('introTpl');
  if (!tpl) return;

  const intro = tpl.content.firstElementChild.cloneNode(true);
  document.body.appendChild(intro);

  // 총 지속시간: 선 1.2s + 패널 1.5s = 2.7s
  // 약간의 버퍼를 두고 제거
  const total = 2800; // ms
  setTimeout(() => {
    intro.remove();
  }, total);
}

// 라우트 렌더링
function render() {
  const path = getPathFromHash();
  const view = routes[path] ? routes[path]() : `<section class="section"><h1>404</h1><p>페이지를 찾을 수 없습니다.</p></section>`;
  const app = document.getElementById('app');
  app.innerHTML = view;

  // 접근성/UX: 스크롤 상단으로
  app.scrollTo({ top: 0, behavior: 'instant' });

  // 내비게이션 활성화
  updateActiveNav(path);

  // 인트로 애니메이션 재생 (컨텐츠가 이미 그려진 상태에서 오버레이가 열림)
  playIntroOverlay();
}

// 초기 진입
window.addEventListener('load', () => {
  // 해시 없으면 홈으로
  if (!location.hash) location.replace('#/');
  render();
});

// 라우트 변경
window.addEventListener('hashchange', render);
