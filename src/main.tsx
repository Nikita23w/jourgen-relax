import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/cormorant-garamond/cyrillic-400.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/cyrillic-400-italic.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/manrope/cyrillic-400.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/cyrillic-500.css';
import '@fontsource/manrope/latin-500.css';
import { PHONE, moods, plans, secrets, drinks, reviews } from './data';
import hero from '../hero.jpg';
import dominant from '../dominant.jpg';
import playful from '../photo_3_2026-09-15_20-01-24.jpg';
import './style.css';

const photos: Record<string, string> = { hero, dominant, playful };
const links = [['Характер', 'character'], ['Тарифы', 'plans'], ['Секретное меню', 'secret'], ['Бар', 'bar'], ['О мастере', 'about']];
function Arrow() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function CallLink({className = ''}: {className?: string}) { return <a className={`button ${className}`} href={`tel:${PHONE.replace(/[\s-]/g, '')}`}>Позвонить Журженю <Arrow /></a>; }
function App() {
  const [menu, setMenu] = useState(false);
  const [mood, setMood] = useState(0);
  const [plan, setPlan] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('arrived'); observer.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); document.getElementById('menu-toggle')?.focus(); } };
    if (menu) window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  return <>
    <a className="skip" href="#main">Перейти к содержимому</a>
    <header className="header">
      <a className="brand" href="#home" aria-label="Журжень Relax — главная">Журжень<span>Relax</span></a>
      <button id="menu-toggle" className="menu-toggle" aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Закрыть' : 'Меню'}<span aria-hidden="true">{menu ? '−' : '+'}</span></button>
      <nav id="navigation" aria-label="Основная навигация" className={menu ? 'open' : ''}>{links.map(([name, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{name}</a>)}<a className="nav-cta" href="#booking" onClick={() => setMenu(false)}>Записаться <Arrow /></a></nav>
    </header>
    <main id="main">
      <section className="hero" id="home">
        <div className="hero-copy"><h1>Приватный массаж.<br/><em>Индивидуальный</em><br/>подход.</h1><p className="hero-subtitle">Один очень старательный мастер.</p><p className="hero-description">Когда спинка устала, ножки требуют жамка, а обычного массажа уже недостаточно — приходит Журжень.</p><CallLink/><div className="hero-details"><span>Только по предварительной записи</span><span>18+</span></div></div>
        <figure className="hero-photo"><img src={hero} alt="Журжень с мягкой улыбкой" fetchPriority="high"/><figcaption><span>Ваш вечер. Ваш мастер.</span><em>Ваш Журжень.</em></figcaption><span className="photo-mark">J / R</span></figure>
        <div className="hero-bottom"><span>ОДНА КЛИЕНТКА. ВСЁ ВНИМАНИЕ.</span><a href="#character">Познакомимся поближе <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="character section" id="character">
        <div className="section-heading reveal"><h2>Один Журжень.<br/><em>Четыре настроения.</em></h2><p>Вы выбираете не только процедуру,<br/>но и характер вашего вечера.</p></div>
        <div className="mood-layout"><figure className="mood-photo"><img src={photos[moods[mood].image]} alt={moods[mood].name} loading="lazy"/><figcaption>Характер меняется. Забота остаётся.</figcaption></figure><div className="mood-content"><h3 className="mood-label">Выберите своего Журженя</h3><div className="mood-options" role="group" aria-label="Настроение мастера">{moods.map((item, index) => <button key={item.name} aria-pressed={mood === index} onClick={() => setMood(index)}><span>{item.short}</span><span aria-hidden="true">{mood === index ? '↗' : '+'}</span></button>)}</div><div className="mood-description" aria-live="polite" key={mood}><h3>{moods[mood].lead}</h3><p>{moods[mood].description}</p></div><a className="text-link" href="#plans">Подобрать программу <Arrow/></a></div></div>
      </section>
      <section className="plans-section section" id="plans"><div className="section-heading reveal"><h2>Хорошо.<br/><em>Ещё лучше. Жамк.</em></h2><p>Четыре способа забыть о делах.<br/>И одна очень приятная валюта.</p></div><div className="plans">{plans.map((item, i) => <article key={item.name} className={`plan ${i === 3 ? 'premium' : ''}`}><p className="plan-subtitle">{item.subtitle}</p><h3>{item.name}</h3><div className="price">{item.price}</div><p className="price-note">{item.extra}</p><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul><a className="plan-button" href="#booking" onClick={() => setPlan(item.name)}>Выбрать программу <Arrow/></a>{i === 3 && <span className="premium-seal" aria-label="Особенная программа">JR</span>}</article>)}</div><p className="payment-note">Журжень принимает оплату поцелуями, объятиями, комплиментами и иными заранее согласованными способами.</p></section>
      <section className="secret section" id="secret"><div className="secret-intro reveal"><h2>Между нами.<br/><em>Секретное меню<br/>Журженя.</em></h2><p>Маленькие дополнения к большому удовольствию. Только если вам хочется.</p><span className="secret-note">Открывается по взаимному желанию</span></div><div className="secret-list">{secrets.map(([name, description]) => <details key={name}><summary>{name}<span aria-hidden="true">+</span></summary><p>{description}</p></details>)}</div></section>
      <section className="bar section" id="bar"><div className="bar-top"><h2>Бар Журженя<em>Ваше «как обычно»?</em></h2><svg className="wine-icon" viewBox="0 0 80 100" fill="none" aria-hidden="true"><path d="M23 8h34l5 33c2 18-12 25-22 25S16 59 18 41l5-33ZM40 66v25m-17 1h34M19 39h42" stroke="currentColor" strokeWidth="1.3"/></svg></div><div className="drink-list">{drinks.map(([name, description]) => <div key={name}><h3>{name}</h3><p>{description}</p></div>)}</div><p className="bar-note">Алкоголь — исключительно дополнение к атмосфере. Если кто-то заметно пьян, интимная часть программы переносится.</p></section>
      <section className="about section" id="about"><div className="about-copy reveal"><h2>Знакомьтесь —<br/><em>Журжень.</em></h2><p className="about-lead">Частный массажист.<br/>Специалист широкого жамкательного профиля.<br/>Эксперт по одной конкретной клиентке.</p><p>За годы практики Журжень освоил расслабляющий массаж, профессиональный жамк, работу с кремушком и целый ряд авторских методик, часть которых невозможно описать на главной странице сайта.</p><div className="stats">{[['100%', 'клиенток возвращаются'], ['1', 'постоянная клиентка'], ['0', 'отрицательных отзывов'], ['∞', 'желания совершенствоваться']].map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div></div><figure className="about-photo"><img src={playful} loading="lazy" alt="Игривый Журжень — специалист широкого жамкательного профиля"/><figcaption>Серьёзный подход.<br/><em>Несерьёзный человек.</em></figcaption></figure></section>
      <section className="reviews section"><h2>Говорят, у него <em>хорошие руки.</em></h2><div className="review-list">{reviews.map(([name, quote]) => <figure key={name}><div className="stars" aria-label="5 из 5 звёзд">★★★★★</div><blockquote>«{quote}»</blockquote><figcaption>{name}</figcaption></figure>)}</div></section>
      <section className="rules section"><h2>Несколько<br/><em>важных правил.</em></h2><div><p>Журжень Relax работает только по взаимному желанию.</p><p>Любую часть программы можно убрать, добавить или остановить в любой момент. Выбранный тариф не означает обязательство пройти программу целиком.</p><p className="main-rule">Главное правило салона:<br/><em>клиентке должно быть хорошо.</em></p></div></section>
      <section className="booking section" id="booking"><span className="booking-monogram" aria-hidden="true">JR</span><h2>Хотите записаться<br/><em>к Журженю?</em></h2><p>Журжень принимает одну клиентку одновременно.<br/>Поэтому свободные окна крайне ограничены.</p><div className="selection" aria-live="polite">{plan ? <>Ваш вечер: <strong>{plan}</strong> · {moods[mood].short}<button onClick={() => setPlan(null)} aria-label="Убрать выбранный тариф">×</button></> : <>Настроение вечера: {moods[mood].short}</>}</div><CallLink/><span className="phone">{PHONE}</span><p className="booking-note">Для постоянной клиентки возможна запись вне очереди.<br/>Очереди, впрочем, не существует.</p></section>
    </main><footer><a href="#home" className="brand">Журжень<span>Relax</span></a><p>Приватный SPA. Публичная любовь к своему делу.</p><span>Для взрослых партнёров · 18+</span></footer>
  </>;
}
createRoot(document.getElementById('root')!).render(<App/>);
