import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, u as unescapeHTML, F as Fragment, d as addAttribute, m as maybeRenderHead, e as renderHead, f as renderSlot, s as spreadAttributes } from '../astro.js';
import { valid, parse, HTMLElement } from 'node-html-parser';
import urlJoin from 'url-join';
import classNames from 'classNames';
import { s as scssVariables } from '../index.js';
import 'html-escaper';

const ru = {
	"@common.join": "Присоединиться",
	"@common.privacyPolicy": "Политика конфиденциальности",
	"@common.proceed": "Приступить",
	"@common.signup": "Зарегистрироваться",
	"@common.startNow": "Начать сейчас",
	"@common.step": "Шаг",
	"@common.@socials.mail": "Почта",
	"@common.@socials.telegramChannel": "Телеграм канал",
	"@common.@socials.telegramChat": "Телеграм чат",
	"@common.@socials.youtube": "YouTube",
	"@common.watchVideo": "Смотреть видео",
	"@landing.@aboutNeural.title": "Собственная разработка компании Arbitroom — <0>нейросеть для крипто арбитража</0>",
	"@landing.@aboutNeural.description1": "Проверенный множеством сделок, готовый продукт компании, который точно настраивается на интересующие торговые пары, а так же на крипто площадки, которые необходимо отслеживать.",
	"@landing.@aboutNeural.description2": "Нейросеть ищет арбитражное окно и автоматически покупает и продает пару подходящую под заданные параметры. Торговые циклы производятся до тех пор, пока это рентабельно.",
	"@landing.@aboutNeural.description3": "Также присудствует точечная настройка под большинство топовых бирж и реализована интеграция с холодными кошельками.",
	"@landing.@faq.title": "Часто задаваемые вопросы",
	"@landing.@footer.title": "<0>Получай прибыль</0> уже сейчас независимо от тренда",
	"@landing.@guide.title": "Совершите несколько простых шагов",
	"@landing.@guide.signUp": "Пройти регистрацию на сайте",
	"@landing.@guide.replenish": "Пополнить баланс личного кабинета",
	"@landing.@guide.depositFunds": "Внести средства в пул ликвидности",
	"@landing.@guide.getPercents": "Внести средства в пул ликвидности",
	"@landing.@guide.withdrawFunds": "В любой момент вывести средства с пула",
	"@landing.@menu.advantagesOfNeuralNetwork": "Преимущества нейросети",
	"@landing.@menu.clientsAboutUs": "Что говорят наши клиенты?",
	"@landing.@menu.howCashGenerated": "Как генерируется прибыль?",
	"@landing.@menu.whatFirst": "С чего начать?",
	"@landing.@neuralAdvantages.title": "Преимущество нейросети",
	"@landing.@neuralAdvantages.scanner": "Сканер",
	"@landing.@neuralAdvantages.scannerDescription": "ПО (сканер) в реальном времени отслеживает и уведомляет о доходной арбитражной ситуации",
	"@landing.@neuralAdvantages.accounts": "Аккаунты",
	"@landing.@neuralAdvantages.accountsDescription": "В распоряжении находятся верифицированные аккаунты с возможностью дополнительного подтверждения личности",
	"@landing.@neuralAdvantages.balance": "Баланс",
	"@landing.@neuralAdvantages.balanceDescription": "Исходя из прибыльности арбитражной ситуации правильно подбирается баланс комиссии и проскальзывания на DEX биржах для закрытия прибыльной сделки",
	"@landing.@neuralAdvantages.automatation": "Автоматизация",
	"@landing.@neuralAdvantages.automatationDescription": "Недлительное окно арбитражной ситуации возможно в реализации только за счет автоматизации, так как совершать сделки вручную занимает много времени",
	"@landing.@neuralAdvantages.income": "Прибыль",
	"@landing.@neuralAdvantages.incomeDescription": "Удержание средств на счетах биржи влечет за собой риски, поэтому важно быстрое перемещение средств с холодных и горячих кошельков на внутребиржевые (автоматически)",
	"@landing.@neuralAdvantages.analysis": "Анализ",
	"@landing.@neuralAdvantages.analysisDescription": "Глубокий анализ перспективных проектов индустрии для поиска арбитражных ситуаций",
	"@landing.@profits.abilityToCashOut": "Возможность вывода актива в любой момент",
	"@landing.@profits.availableSum": "Доступная сумма актива от 100 USDT",
	"@landing.@profits.profitPerMonth": "Ежемесячная прибыль от 20% до 25% ",
	"@landing.@profits.title": "Получай пассивную прибыль ежедневно",
	"@landing.@reviews.title": "Что говорят наши клиенты?",
	"@landing.@reviews.satisfiedClients": "Довольных <1 />клиентов",
	"@landing.@reviews.arbitroomUser": "Пользователь Arbitroom",
	"@landing.@welcome.description": "Любой пользователь может зарабатывать на арбитраже криптовалют с минимум затраченных усилий и экономией  личного времени с помощью автоматизированных инструментов анализа рынка.",
	"@landing.@welcome.title": "Заработай на крипто арбитраже"
};

const rawT = (tKey) => {
  return ru[tKey] || tKey;
};
const t = (tKey) => {
  const value = ru[tKey] || tKey;
  return value.replace(/<[^>]*>/g, "");
};
const i18next = {
  language: "ru"
};

const splitHTML = (html) => {
  const separator = "_12%39#1$f";
  return html.split("<").join(separator + "<" + separator).split(">").join(separator + ">" + separator).split(separator);
};
const interpolate = (key, referenceString) => {
  const originalString = rawT(key);
  const referenceParts = splitHTML(referenceString);
  const originalParts = splitHTML(originalString);
  if (referenceParts.length !== originalParts.length) {
    throw Error(`String: 

"${referenceString.trim()}"

 cannot be interpolated with key "${key}"`);
  }
  let insideTag = false;
  const interpolatedParts = referenceParts.map((part, index) => {
    if (part === "<") {
      insideTag = true;
      return part;
    }
    if (part === ">") {
      insideTag = false;
      return part;
    }
    if (insideTag) {
      return part;
    } else {
      return originalParts[index] || part || "";
    }
  });
  const interpolatedString = interpolatedParts.join("");
  if (!valid(`<div>${interpolatedString}</div>`)) {
    throw Error(`String: 

"${referenceString}"

 cannot be interpolated with key "${key}"`);
  }
  return interpolatedString;
};

const $$Astro$x = createAstro();
const $$Trans = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$x, $$props, $$slots);
  Astro2.self = $$Trans;
  const { i18nKey } = Astro2.props;
  const referenceString = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(interpolate(i18nKey, referenceString))}` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/utils/i18next/Trans.astro");

const routeWithFragments = (route, fragments) => {
  return {
    ...route,
    pathWithFragment: (fragmentName) => urlJoin(route.path, "/#" + fragments[fragmentName]),
    fragments
  };
};
const indexRoute = routeWithFragments(
  {
    path: "/"
  },
  {
    howCashGenerated: "howCashGenerated",
    advantagesOfNeuralNetwork: "advantagesOfNeuralNetwork",
    whatFirst: "whatFirst",
    clientsAboutUs: "clientsAboutUs"
  }
);
const routes = {
  index: indexRoute
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$w = createAstro();
const $$PageLoader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$w, $$props, $$slots);
  Astro2.self = $$PageLoader;
  const { className } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", "<div", ' id="pageLoader">\n    <svg class="page-loader__spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#000" viewBox="0 0 24 24">\n        <g class="page-loader__circle-wrapper">\n            <circle cx="50%" cy="50%" r="10" fill="none" stroke-width="2" stroke="url(#paint0_radial_108_307)"></circle>\n        </g>\n        <defs>\n            <radialGradient xmlns="http://www.w3.org/2000/svg" id="paint0_radial_108_307" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-6.5 -23.5) rotate(59.1279) scale(53.5934 50.1283)">\n                <stop stop-color="#20FFFA"></stop>\n                <stop offset="0.716998" stop-color="#FF20FF"></stop>\n                <stop offset="1" stop-color="#FF741A"></stop>\n            </radialGradient>\n        </defs>\n    </svg>\n</div>\n\n<style>\n    .page-loader {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: var(--color-background-upper1);\n\n        display: flex;\n        flex-direction: column;\n        gap: 1.5rem;\n        align-items: center;\n        justify-content: center;\n        z-index: var(--z-index-page-loader);\n        opacity: 1;\n        transition: opacity 0.25s 0.25s, top 0s 0.5s;\n    }\n    .page-loader__spinner {\n        width: 2.5rem;\n        height: 2.5rem;\n        transition: all 0.25s;\n    }\n\n    .page-loader__circle-wrapper {\n        transform-origin: center;\n        animation: spinner_zKoa 2s linear infinite;\n    }\n\n    .page-loader__circle-wrapper > circle {\n        stroke-linecap: round;\n        animation: spinner_YpZS 1.5s ease-in-out infinite;\n    }\n\n    /* hidden state */\n\n    .page-loader.hidden {\n        top: -200%;\n        opacity: 0;\n    }\n\n    .page-loader.hidden > .page-loader__spinner {\n        opacity: 0;\n        transform: scale(0.8) rotate(90deg);\n    }\n\n    @keyframes spinner_zKoa {\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n    @keyframes spinner_YpZS {\n        0% {\n            stroke-dasharray: 0 150;\n            stroke-dashoffset: 0;\n        }\n        47.5% {\n            stroke-dasharray: 42 150;\n            stroke-dashoffset: -16;\n        }\n        95%,\n        100% {\n            stroke-dasharray: 42 150;\n            stroke-dashoffset: -59;\n        }\n    }\n</style>\n\n<script>\n    (() => {\n        const MIN_LOADER_TIME = 0;\n\n        const pageLoader = document.getElementById("pageLoader");\n        const timeBefore = performance.now();\n\n        window.addEventListener("load", () => {\n            const timeAfter = performance.now();\n\n            const loadTime = timeAfter - timeBefore;\n            if (loadTime > MIN_LOADER_TIME) {\n                pageLoader.classList.add("hidden");\n            } else {\n                setTimeout(() => {\n                    pageLoader.classList.add("hidden");\n                }, MIN_LOADER_TIME - loadTime);\n            }\n        });\n    })();\n<\/script>'])), maybeRenderHead(), addAttribute(classNames(className, "page-loader"), "class"));
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/common/PageLoader.astro");

const $$Astro$v = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$v, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html${addAttribute(i18next.language, "lang")}>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">

		<meta name="generator"${addAttribute(Astro2.generator, "content")}>

		<title>${title}</title>

		<!-- import fonts -->
		<link rel="stylesheet" href="/_layout-assets/css/fonts.css">
	${renderHead()}</head>
	<body>
		${renderComponent($$result, "PageLoader", $$PageLoader, {})}
		${renderSlot($$result, $$slots["default"])}
	</body></html>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/layouts/BaseLayout.astro");

const $$Astro$u = createAstro();
const $$Logo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$u, $$props, $$slots);
  Astro2.self = $$Logo;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(classNames(className, "logo"), "class")}${addAttribute(routes.index.path, "href")}>
    <img src="/_layout-assets/images/logo.svg" alt="">
</a>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/common/Logo.astro");

const $$Astro$t = createAstro();
const $$AppBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$t, $$props, $$slots);
  Astro2.self = $$AppBar;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "app-bar"), "class")}>${renderSlot($$result, $$slots["default"])}</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/AppBar.astro");

const $$Astro$s = createAstro();
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$s, $$props, $$slots);
  Astro2.self = $$Container;
  const { as: As = "div", className, id, attrs } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "As", As, { "class": classNames(className, "container"), "id": id, ...attrs }, { "default": ($$result2) => renderTemplate`
    ${renderSlot($$result2, $$slots["default"])}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Container.astro");

const $$Astro$r = createAstro();
const $$Backdrop = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$r, $$props, $$slots);
  Astro2.self = $$Backdrop;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "backdrop"), "class")}>
    ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Backdrop.astro");

const $$Astro$q = createAstro();
const $$Drawer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$q, $$props, $$slots);
  Astro2.self = $$Drawer;
  const { className, side = "right", id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames("drawer", side), "class")}${addAttribute(id, "id")}>
    ${renderComponent($$result, "Backdrop", $$Backdrop, { "className": "drawer__backdrop" })}
    ${renderComponent($$result, "Container", $$Container, { "className": classNames(className, "drawer__body") }, { "default": ($$result2) => renderTemplate`
        ${renderSlot($$result2, $$slots["default"])}
    ` })}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Drawer/Drawer.astro");

const $$Astro$p = createAstro();
const $$DrawerTrigger = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$p, $$props, $$slots);
  Astro2.self = $$DrawerTrigger;
  const { as: As = "div", className, drawerId, attrs } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "As", As, { "class": classNames(className, "drawer-trigger"), "data-drawer-id": drawerId, ...attrs }, { "default": ($$result2) => renderTemplate`
    ${renderSlot($$result2, $$slots["default"])}
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Drawer/DrawerTrigger.astro");

const $$Astro$o = createAstro();
const $$LinearGradient = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$LinearGradient;
  const { id, hidden } = Astro2.props;
  return renderTemplate`${!hidden && renderTemplate`${maybeRenderHead()}<linearGradient${addAttribute(id, "id")} x1="2.49336" y1="-6.06126" x2="15.991" y2="12.9623" gradientUnits="userSpaceOnUse">
            <stop stop-color="#20FFFA"></stop>
            <stop offset="0.716998" stop-color="#FF20FF"></stop>
            <stop offset="1" stop-color="#FF741A"></stop>
        </linearGradient>`}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Icon/LinearGradient.astro");

const $$Astro$n = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$Icon;
  const {
    iconName,
    className,
    color = "inherit",
    fontSize = "24px"
  } = Astro2.props;
  const svgAttrs = {
    class: classNames(className, "icon", {
      ["color-text-primary"]: color === "text-primary"
    }),
    ["data-icon-name"]: iconName,
    ...fontSize !== void 0 && {
      style: `font-size: ${fontSize}`
    }
  };
  const gradientProps = {
    id: "icon__gradient-primary__123",
    hidden: color !== "gradient-primary"
  };
  const pathAttrs = {
    ...color === "gradient-primary" && {
      fill: `url(#${gradientProps.id})`
    }
  };
  return renderTemplate`

${iconName === "play" && renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.98079 5.30869C6.71861 4.58469 5.69531 5.1778 5.69531 6.63238V17.3666C5.69531 18.8226 6.71861 19.415 7.98079 18.6917L17.363 13.311C18.6256 12.5867 18.6256 11.4133 17.363 10.6892L7.98079 5.30869Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "star" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path d="M9.10433 2.89923C9.47114 2.15598 10.531 2.15599 10.8978 2.89923L12.8282 6.81073L17.1448 7.43797C17.9651 7.55715 18.2926 8.56513 17.699 9.14366L14.5755 12.1883L15.3129 16.4875C15.453 17.3044 14.5956 17.9274 13.8619 17.5417L10.0011 15.5119L6.14018 17.5417C5.40655 17.9274 4.54913 17.3044 4.68924 16.4875L5.4266 12.1883L2.30308 9.14366C1.70956 8.56512 2.03708 7.55715 2.8573 7.43797L7.17389 6.81073L9.10433 2.89923Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "star-half" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="20" height="20" viewBox="0 0 20 20">
            <path d="M9.10433 2.89923C9.28789 2.5273 9.64499 2.34149 10.002 2.3418C10.3583 2.34211 10.7145 2.52792 10.8978 2.89923L12.8282 6.81073L17.1448 7.43797C17.9651 7.55715 18.2926 8.56513 17.699 9.14366L14.5755 12.1883L15.3129 16.4875C15.453 17.3044 14.5956 17.9274 13.8619 17.5417L10.0011 15.5119L6.14018 17.5417C5.40655 17.9274 4.54913 17.3044 4.68924 16.4875L5.4266 12.1883L2.30308 9.14366C1.70956 8.56512 2.03708 7.55715 2.8573 7.43797L7.17389 6.81073L9.10433 2.89923ZM10.002 14.5119C10.1615 14.512 10.321 14.5503 10.4664 14.6267L14.3273 16.6565L13.5899 12.3574C13.5343 12.033 13.6418 11.702 13.8775 11.4722L17.001 8.42757L12.6844 7.80034C12.3587 7.75301 12.0772 7.54844 11.9315 7.2533L10.002 3.3436V14.5119Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "star-empty" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="20" height="20" viewBox="0 0 20 20">
            <path d="M9.10433 2.89923C9.47114 2.15598 10.531 2.15599 10.8978 2.89923L12.8282 6.81073L17.1448 7.43797C17.9651 7.55715 18.2926 8.56513 17.699 9.14366L14.5755 12.1883L15.3129 16.4875C15.453 17.3044 14.5956 17.9274 13.8619 17.5417L10.0011 15.5119L6.14018 17.5417C5.40655 17.9274 4.54913 17.3044 4.68924 16.4875L5.4266 12.1883L2.30308 9.14366C1.70956 8.56512 2.03708 7.55715 2.8573 7.43797L7.17389 6.81073L9.10433 2.89923ZM10.0011 3.3418L8.07062 7.25329C7.92496 7.54844 7.6434 7.75301 7.31769 7.80034L3.00109 8.42757L6.12461 11.4722C6.3603 11.702 6.46784 12.033 6.41221 12.3574L5.67484 16.6565L9.53572 14.6267C9.82705 14.4736 10.1751 14.4736 10.4664 14.6267L14.3273 16.6565L13.5899 12.3574C13.5343 12.033 13.6418 11.702 13.8775 11.4722L17.001 8.42757L12.6844 7.80034C12.3587 7.75301 12.0772 7.54844 11.9315 7.25329L10.0011 3.3418Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "social-telegram" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM12.43 8.859C11.263 9.344 8.93 10.349 5.432 11.873C4.864 12.099 4.566 12.32 4.539 12.536C4.493 12.902 4.951 13.046 5.573 13.241C5.658 13.268 5.746 13.295 5.836 13.325C6.449 13.524 7.273 13.757 7.701 13.766C8.09 13.774 8.524 13.614 9.003 13.286C12.271 11.079 13.958 9.964 14.064 9.94C14.139 9.923 14.243 9.901 14.313 9.964C14.383 10.026 14.376 10.144 14.369 10.176C14.323 10.369 12.529 12.038 11.599 12.902C11.309 13.171 11.104 13.362 11.062 13.406C10.968 13.503 10.872 13.596 10.78 13.685C10.21 14.233 9.784 14.645 10.804 15.317C11.294 15.64 11.686 15.907 12.077 16.173C12.504 16.464 12.93 16.754 13.482 17.116C13.622 17.208 13.756 17.303 13.887 17.396C14.384 17.751 14.831 18.069 15.383 18.019C15.703 17.989 16.035 17.688 16.203 16.789C16.6 14.663 17.382 10.059 17.563 8.161C17.574 8.00341 17.5673 7.84509 17.543 7.689C17.5285 7.56293 17.4671 7.44693 17.371 7.364C17.228 7.247 17.006 7.222 16.906 7.224C16.455 7.232 15.763 7.473 12.43 8.859Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "social-mail" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17 14.375V10.304L12.174 12.832C12.1203 12.8601 12.0606 12.8748 12 12.8748C11.9394 12.8748 11.8797 12.8601 11.826 12.832L7 10.304V14.375L7.0025 14.467C7.026 14.8814 7.20718 15.2711 7.50888 15.5562C7.81059 15.8412 8.20993 16 8.625 16H15.375L15.467 15.9975C15.8814 15.974 16.2711 15.7928 16.5562 15.4911C16.8412 15.1894 17 14.7901 17 14.375ZM16.465 8.41963C16.1662 8.1495 15.7778 7.99995 15.375 8H8.625L8.532 8.0025C8.14584 8.02459 7.78022 8.1837 7.50087 8.45123C7.22153 8.71876 7.04676 9.07716 7.008 9.462L12 12.077L16.992 9.462C16.9516 9.06124 16.7638 8.68977 16.465 8.41963Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "social-youtube" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37256 18.6274 0 12 0C5.37259 0 0 5.37256 0 12C0 18.6274 5.37259 24 12 24ZM17.3673 8.62109C17.55 8.79419 17.6824 9.01367 17.7503 9.25586C17.9295 10.1638 18.0133 11.0884 18.0003 12.0139C18.0063 12.9358 17.9224 13.856 17.7498 14.7615C17.6821 15.0039 17.5499 15.2234 17.3673 15.3965C17.1794 15.575 16.9492 15.7026 16.6983 15.7676C15.1376 15.9419 13.5676 16.0203 11.9973 16.0024C11.9973 16.0024 8.25381 16.0024 7.30231 15.7554C7.04831 15.688 6.81732 15.5605 6.63181 15.384C6.44632 15.2075 6.31281 14.989 6.24432 14.7495C6.07581 13.8425 5.99432 12.9231 6.00031 12.0024C5.99445 11.0811 6.07614 10.1614 6.24432 9.25537C6.3143 9.01489 6.4483 8.79541 6.6333 8.61743C6.82159 8.43774 7.05139 8.30713 7.30231 8.23755C8.86102 8.06323 10.429 7.98462 11.9973 8.00244C11.9973 8.00244 15.7593 8.00244 16.6983 8.25C16.9492 8.3147 17.1794 8.44238 17.3673 8.62109ZM13.9313 12.0029L10.8013 10.291V13.7146L13.9313 12.0029Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "burger" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M21.1875 3.75H2.8125C2.70937 3.75 2.625 3.83437 2.625 3.9375V5.4375C2.625 5.54063 2.70937 5.625 2.8125 5.625H21.1875C21.2906 5.625 21.375 5.54063 21.375 5.4375V3.9375C21.375 3.83437 21.2906 3.75 21.1875 3.75ZM21.1875 18.375H2.8125C2.70937 18.375 2.625 18.4594 2.625 18.5625V20.0625C2.625 20.1656 2.70937 20.25 2.8125 20.25H21.1875C21.2906 20.25 21.375 20.1656 21.375 20.0625V18.5625C21.375 18.4594 21.2906 18.375 21.1875 18.375ZM21.1875 11.0625H2.8125C2.70937 11.0625 2.625 11.1469 2.625 11.25V12.75C2.625 12.8531 2.70937 12.9375 2.8125 12.9375H21.1875C21.2906 12.9375 21.375 12.8531 21.375 12.75V11.25C21.375 11.1469 21.2906 11.0625 21.1875 11.0625Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "close" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path d="M26 7.75L24.25 6L16 14.25L7.75 6L6 7.75L14.25 16L6 24.25L7.75 26L16 17.75L24.25 26L26 24.25L17.75 16L26 7.75Z"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></path>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}

${iconName === "big-circle" && renderTemplate`<svg${spreadAttributes(svgAttrs, "svgAttrs", { "class": "astro-3UWQUQH2" })} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" rx="10"${spreadAttributes(pathAttrs, "pathAttrs", { "class": "astro-3UWQUQH2" })}></rect>
            ${renderComponent($$result, "LinearGradient", $$LinearGradient, { ...gradientProps })}
        </svg>`}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Icon/Icon.astro");

const $$Astro$m = createAstro();
const $$Text = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$Text;
  const {
    className,
    as: Tag = "div",
    attrs,
    variant,
    color,
    disableMobileAdaptive,
    disableAdaptive
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": classNames(className, "text", variant, {
    ["color-text-secondary"]: color === "text-secondary",
    ["color-secondary-gradient"]: color === "secondary-gradient",
    ["color-inherit"]: color === "inherit",
    ["disable-mobile-adaptive"]: disableMobileAdaptive,
    ["disable-adaptive"]: disableAdaptive
  }), ...attrs }, { "default": ($$result2) => renderTemplate`
    ${renderSlot($$result2, $$slots["default"])}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Text.astro");

const $$Astro$l = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$Header;
  const { className, menuItems, sideMenuId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "as": "header", "className": classNames(className, "header"), "id": "header" }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "AppBar", $$AppBar, { "className": "header__content" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Logo", $$Logo, { "className": "header__logo" })}
        ${maybeRenderHead()}<div class="header__nav">
            <div class="header__menu">
                ${menuItems.map((menuItem) => renderTemplate`${renderComponent($$result3, "Text", $$Text, { "variant": "body2", "className": "header__menu-item", "as": "a", "attrs": {
    ["href"]: menuItem.href,
    ["data-key"]: menuItem.id
  } }, { "default": ($$result4) => renderTemplate`${menuItem.label}` })}`)}
            </div>
            <div class="header__actions">
                ${renderSlot($$result3, $$slots["actions"])}
            </div>
            ${renderComponent($$result3, "DrawerTrigger", $$DrawerTrigger, { "className": "header__burger", "drawerId": sideMenuId }, { "default": ($$result4) => renderTemplate`
                ${renderComponent($$result4, "Icon", $$Icon, { "iconName": "burger" })}
            ` })}
        </div>
    ` })}
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/common/Header.astro");

const $$Astro$k = createAstro();
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Button;
  const { size = "medium", color } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(classNames("button", {
    ["large"]: size === "large",
    ["color-primary-dim"]: color === "primary-dim"
  }), "class")}>
    ${renderSlot($$result, $$slots["default"])}
</button>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Button.astro");

const socials = [
  {
    iconName: "social-telegram",
    tkey: "@common.@socials.telegramChannel",
    href: "https://t.me/arbitroom_io"
  },
  {
    iconName: "social-telegram",
    tkey: "@common.@socials.telegramChat",
    href: "https://t.me/+Z0XUvV93_RUyODli"
  },
  {
    iconName: "social-mail",
    tkey: "@common.@socials.mail",
    href: "mailto:support@arbitroom.io"
  },
  {
    iconName: "social-youtube",
    tkey: "@common.@socials.youtube",
    href: "https://youtube.com/channel/UCVmzaOzDoPOwIHs3nIQbEwg"
  }
];

const $$Astro$j = createAstro();
const $$SideMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$SideMenu;
  const { className, menuItems, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Drawer", $$Drawer, { "className": classNames(className, "side-menu"), "id": id, "side": "right" }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "AppBar", $$AppBar, { "className": "side-menu__header" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "Logo", $$Logo, {})}
        ${renderComponent($$result3, "DrawerTrigger", $$DrawerTrigger, { "className": "side-menu__close", "drawerId": id }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Icon", $$Icon, { "iconName": "close" })}
        ` })}
    ` })}
    ${maybeRenderHead()}<div class="side-menu__body">
        <div class="side-menu__actions">
            ${renderSlot($$result2, $$slots["actions"])}
        </div>
        <div class="side-menu__items">
            ${menuItems.map((menuItem) => renderTemplate`${renderComponent($$result2, "DrawerTrigger", $$DrawerTrigger, { "as": "a", "drawerId": id, "className": "side-menu__item", "attrs": {
    ["href"]: menuItem.href,
    ["data-key"]: menuItem.id
  } }, { "default": ($$result3) => renderTemplate`
                        ${renderComponent($$result3, "Text", $$Text, { "variant": "body2", "color": "inherit" }, { "default": ($$result4) => renderTemplate`${menuItem.label}` })}
                    ` })}`)}
        </div>
    </div>
    <div class="side-menu__footer">
        <div class="side-menu__socials">
            ${socials.map((social) => renderTemplate`${renderComponent($$result2, "Text", $$Text, { "as": "a", "variant": "body2", "className": "side-menu__social", "attrs": {
    href: social.href
  } }, { "default": ($$result3) => renderTemplate`${t(social.tkey)}` })}`)}
        </div>
        <div class="side-menu__meta">
            ${renderComponent($$result2, "Text", $$Text, { "variant": "body2", "className": "side-menu__copyright" }, { "default": ($$result3) => renderTemplate`
                © ${( new Date()).getFullYear()} Arbitroom. All rights reserved.
            ` })}
            ${renderComponent($$result2, "Text", $$Text, { "as": "a", "variant": "body2", "className": "side-menu__private-policy", "attrs": { href: "#" } }, { "default": ($$result3) => renderTemplate`${t("@common.privacyPolicy")}` })}
        </div>
    </div>
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/common/SideMenu.astro");

const $$Astro$i = createAstro();
const $$WithAOS = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$WithAOS;
  const {
    animation,
    offset,
    duration,
    easing,
    delay,
    anchor,
    anchorPlacement,
    once = true,
    adaptive
  } = Astro2.props;
  const html = await Astro2.slots.render("default");
  const dom = parse(html);
  dom.childNodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      node.setAttribute("data-aos", animation);
      if (adaptive) {
        const defaultAttrs = {
          animation,
          offset,
          duration,
          easing,
          delay,
          anchor,
          anchorPlacement,
          once
        };
        const _adaptive = [
          ...adaptive,
          { attrs: defaultAttrs }
        ];
        node.setAttribute("data-aos-adaptive", JSON.stringify(_adaptive));
      }
      if (offset)
        node.setAttribute("data-aos-offset", "" + offset);
      if (duration)
        node.setAttribute("data-aos-duration", "" + duration);
      if (easing)
        node.setAttribute("data-aos-easing", easing);
      if (delay)
        node.setAttribute("data-aos-delay", "" + delay);
      if (anchor)
        node.setAttribute("data-aos-anchor", "" + anchor);
      if (anchorPlacement)
        node.setAttribute("data-aos-anchorPlacement", "" + anchorPlacement);
      if (once)
        node.setAttribute("data-aos-once", "" + once);
    }
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(dom.toString())}` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/utils/WithAOS.astro");

const $$Astro$h = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Footer;
  const { className, menuItems } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "as": "footer", "className": classNames(className, "footer"), "id": "footer" }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead()}<div class="footer__main">
        ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right" }, { "default": ($$result3) => renderTemplate`
            ${renderComponent($$result3, "Text", $$Text, { "className": "footer__title", "variant": "h3" }, { "default": ($$result4) => renderTemplate`
                ${renderComponent($$result4, "Trans", $$Trans, { "i18nKey": "@landing.@footer.title" }, { "default": ($$result5) => renderTemplate`
                    ${renderComponent($$result5, "Text", $$Text, { "as": "span", "color": "secondary-gradient" }, { "default": ($$result6) => renderTemplate`
                        Получай прибыль
                    ` })} уже сейчас независимо от тренда
                ` })}
            ` })}
        ` })}
        ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 100 }, { "default": ($$result3) => renderTemplate`
            <div>
                ${renderComponent($$result3, "Button", $$Button, { "size": "large" }, { "default": ($$result4) => renderTemplate`${t("@common.join")}` })}
            </div>
        ` })}
    </div>
    ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "zoom-in", "delay": 150 }, { "default": ($$result3) => renderTemplate`
        <div class="footer__img-wrapper">
            <img class="footer__img" src="/_layout-assets/images/image-for-footer.png" alt="">
        </div>
    ` })}
    ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 200, "offset": 0 }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "AppBar", $$AppBar, { "className": "footer__nav" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Logo", $$Logo, {})}
            <div class="footer__menu">
                ${menuItems.map((menuItem) => renderTemplate`${renderComponent($$result4, "Text", $$Text, { "variant": "body2", "className": "footer__menu-item", "as": "a", "attrs": {
    ["href"]: menuItem.href,
    ["data-key"]: menuItem.id
  } }, { "default": ($$result5) => renderTemplate`${menuItem.label}` })}`)}
            </div>
        ` })}
    ` })}
    ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 200, "offset": -50 }, { "default": ($$result3) => renderTemplate`
        <div class="footer__links">
            <div class="footer__socials">
                ${socials.map((social) => renderTemplate`${renderComponent($$result3, "Text", $$Text, { "as": "a", "attrs": { href: social.href, target: "_blank" }, "variant": "body1", "className": "footer__social" }, { "default": ($$result4) => renderTemplate`
                            ${renderComponent($$result4, "Icon", $$Icon, { "iconName": social.iconName })}
                            ${t(social.tkey)}` })}`)}
            </div>
            <div class="footer__meta">
                ${renderComponent($$result3, "Text", $$Text, { "as": "a", "attrs": { href: "#" }, "variant": "body2", "className": "footer__private-policy" }, { "default": ($$result4) => renderTemplate`${t("@common.privacyPolicy")}` })}
                ${renderComponent($$result3, "Text", $$Text, { "variant": "body2", "className": "footer__copyright" }, { "default": ($$result4) => renderTemplate`
                    © ${( new Date()).getFullYear()} Arbitroom. All rights reserved.
                ` })}
            </div>
        </div>
    ` })}
    <div class="footer__glow"></div>
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/common/Footer.astro");

const $$Astro$g = createAstro();
const $$LandingLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$LandingLayout;
  const { title, menuActionButton, menuItems } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title }, { "default": ($$result2) => renderTemplate`
    
    ${renderComponent($$result2, "SideMenu", $$SideMenu, { "menuItems": menuItems, "id": "sideMenu" }, { "actions": ($$result3) => renderTemplate`${maybeRenderHead()}<a${addAttribute(menuActionButton.href, "href")}>
            ${renderComponent($$result3, "Button", $$Button, {}, { "default": ($$result4) => renderTemplate`${menuActionButton.label}` })}
        </a>` })}
    
    ${renderComponent($$result2, "Header", $$Header, { "menuItems": menuItems, "sideMenuId": "sideMenu" }, { "actions": ($$result3) => renderTemplate`<a${addAttribute(menuActionButton.href, "href")}>
            ${renderComponent($$result3, "Button", $$Button, {}, { "default": ($$result4) => renderTemplate`${menuActionButton.label}` })}
        </a>` })}
    
    <div class="welcome-wrapper">
        ${renderSlot($$result2, $$slots["welcome"])}
    </div>
    
    ${renderSlot($$result2, $$slots["default"])}
    
    ${renderComponent($$result2, "Footer", $$Footer, { "menuItems": menuItems })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/layouts/LandingLayout.astro");

const $$Astro$f = createAstro();
const $$WelcomeImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$WelcomeImage;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "welcome-image"), "class")}>
    <div class="welcome-image__glow"></div>
    <img class="welcome-image__monitor" src="/_layout-assets/images/welcome/monitor.svg">
    <div class="welcome-image__window1">
        <img src="/_layout-assets/images/welcome/window-inner1.png">
    </div>
    <div class="welcome-image__window2">
        <img src="/_layout-assets/images/welcome/window-inner2.svg">
    </div>
    <div class="welcome-image__window3">
        <img src="/_layout-assets/images/welcome/window-inner3.svg">
    </div>
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/WelcomeImage.astro");

const $$Astro$e = createAstro();
const $$Welcome = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Welcome;
  const { className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className, "welcome") + " astro-MMC7OTGS" }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead()}<div class="welcome__main-content astro-MMC7OTGS">
        ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-MMC7OTGS" }, { "default": ($$result3) => renderTemplate`
            <div class="welcome__title astro-MMC7OTGS">${t("@landing.@welcome.title")}</div>
        ` })}
        ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 100, "class": "astro-MMC7OTGS" }, { "default": ($$result3) => renderTemplate`
            ${renderComponent($$result3, "Text", $$Text, { "className": "welcome__description astro-MMC7OTGS", "variant": "h5" }, { "default": ($$result4) => renderTemplate`${t("@landing.@welcome.description")}` })}
        ` })}
        ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 200, "class": "astro-MMC7OTGS" }, { "default": ($$result3) => renderTemplate`
            <div class="welcome__actions astro-MMC7OTGS">
                ${renderComponent($$result3, "Button", $$Button, { "size": "large", "class": "astro-MMC7OTGS" }, { "default": ($$result4) => renderTemplate`${t("@common.startNow")}` })}
                ${renderComponent($$result3, "Button", $$Button, { "size": "large", "color": "primary-dim", "class": "astro-MMC7OTGS" }, { "default": ($$result4) => renderTemplate`
                    ${renderComponent($$result4, "Icon", $$Icon, { "iconName": "play", "class": "astro-MMC7OTGS" })}
                    ${t("@common.watchVideo")}` })}
            </div>
        ` })}
    </div>
    ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "zoom-in", "delay": 100, "class": "astro-MMC7OTGS" }, { "default": ($$result3) => renderTemplate`
        <div class="welcome__image-wrapper astro-MMC7OTGS">
            ${renderComponent($$result3, "WelcomeImage", $$WelcomeImage, { "className": "welcome__image astro-MMC7OTGS" })}
        </div>
    ` })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/Welcome.astro");

const $$Astro$d = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Section;
  const { className, gutterSize, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "section", {
    ["gutter-large"]: gutterSize === "large"
  }), "class")}${addAttribute(id, "id")}>
  ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Section.astro");

const $$Astro$c = createAstro();
const $$Paper = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Paper;
  const {
    className,
    variant = "default",
    backgroundColor = "background-upper2"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "paper", {
    ["flat"]: variant === "flat",
    ["background-color-upper3"]: backgroundColor === "background-upper3"
  }), "class")}>
    ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Paper.astro");

const variables = {
  desktop: parseFloat(scssVariables["desktop"]),
  smallDesktop: parseFloat(scssVariables["small-desktop"]),
  laptop: parseFloat(scssVariables["laptop"]),
  smallLaptop: parseFloat(scssVariables["small-laptop"]),
  tablet: parseFloat(scssVariables["tablet"]),
  smallTablet: parseFloat(scssVariables["small-tablet"]),
  mobile: parseFloat(scssVariables["mobile"])
};

const $$Astro$b = createAstro();
const $$Profits = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Profits;
  const { className } = Astro2.props;
  const profitCards = [
    {
      iconSrc: "/_layout-assets/images/card-icons/wallet.svg",
      title: t("@landing.@profits.availableSum")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/trend-up.svg",
      title: t("@landing.@profits.profitPerMonth")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/money-hand.svg",
      title: t("@landing.@profits.abilityToCashOut")
    }
  ];
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className) + " astro-5WOLBYVX" }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Section", $$Section, { "className": "profits astro-5WOLBYVX" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-5WOLBYVX" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Text", $$Text, { "className": "profits__title astro-5WOLBYVX", "variant": "h3" }, { "default": ($$result5) => renderTemplate`${t("@landing.@profits.title")}` })}
        ` })}
        ${maybeRenderHead()}<div class="profits__cards astro-5WOLBYVX">
            ${profitCards.map((data, index) => renderTemplate`${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-up", "delay": index * 100 + 200, "adaptive": [
    {
      maxWidth: variables.smallTablet,
      attrs: {
        animation: "fade-right",
        delay: index * 50 + 200
      }
    }
  ], "class": "astro-5WOLBYVX" }, { "default": ($$result4) => renderTemplate`
                        <div class="astro-5WOLBYVX">
                            ${renderComponent($$result4, "Paper", $$Paper, { "className": "profit-card astro-5WOLBYVX" }, { "default": ($$result5) => renderTemplate`
                                <div class="profit-card__icon-wrapper astro-5WOLBYVX">
                                    <img${addAttribute(data.iconSrc, "src")} class="astro-5WOLBYVX">
                                    <img${addAttribute(data.iconSrc, "src")} class="astro-5WOLBYVX">
                                </div>
                                ${renderComponent($$result5, "Text", $$Text, { "className": "profit-card__title astro-5WOLBYVX", "variant": "h5" }, { "default": ($$result6) => renderTemplate`${data.title}` })}
                            ` })}
                        </div>
                    ` })}`)}
        </div>
    ` })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/Profits.astro");

const $$Astro$a = createAstro();
const $$AboutNeuralImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$AboutNeuralImage;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "about-neural-image") + " astro-OQM6QFFU", "class")}>
    <svg class="about-neural-image__main astro-OQM6QFFU" xmlns="http://www.w3.org/2000/svg" width="748" height="644" viewBox="0 0 748 644" fill="none">
        <g class="about-neural-image__core astro-OQM6QFFU" filter="url(#filter0_b_422_468)">
            <rect x="290" y="247" width="147" height="147" rx="73.5" fill="url(#paint0_linear_422_468)" fill-opacity="0.2" class="astro-OQM6QFFU"></rect>
            <path d="M312.999 312H315.399V317.76H322.199V312H324.599V326H322.199V319.84H315.399V326H312.999V312ZM332.395 326.22C331.688 326.22 331.021 326.113 330.395 325.9C329.768 325.673 329.215 325.34 328.735 324.9C328.268 324.447 327.895 323.88 327.615 323.2C327.335 322.52 327.195 321.72 327.195 320.8V320.4C327.195 319.52 327.328 318.753 327.595 318.1C327.861 317.447 328.221 316.907 328.675 316.48C329.141 316.04 329.675 315.713 330.275 315.5C330.875 315.287 331.515 315.18 332.195 315.18C333.808 315.18 335.041 315.613 335.895 316.48C336.761 317.347 337.195 318.587 337.195 320.2V321.32H329.435C329.448 321.867 329.535 322.333 329.695 322.72C329.868 323.093 330.088 323.4 330.355 323.64C330.635 323.867 330.948 324.033 331.295 324.14C331.655 324.247 332.021 324.3 332.395 324.3C333.155 324.3 333.708 324.18 334.055 323.94C334.415 323.7 334.661 323.387 334.795 323H336.995C336.781 324.053 336.255 324.853 335.415 325.4C334.588 325.947 333.581 326.22 332.395 326.22ZM332.295 317.1C331.921 317.1 331.561 317.147 331.215 317.24C330.881 317.333 330.581 317.487 330.315 317.7C330.061 317.9 329.855 318.167 329.695 318.5C329.535 318.82 329.448 319.213 329.435 319.68H334.995C334.981 319.187 334.901 318.773 334.755 318.44C334.621 318.107 334.435 317.84 334.195 317.64C333.955 317.44 333.668 317.3 333.335 317.22C333.015 317.14 332.668 317.1 332.295 317.1ZM339.396 315.4H341.596V322.9L346.696 315.4H348.796V326H346.596V318.5L341.496 326H339.396V315.4ZM344.096 314.2C342.989 314.2 342.176 313.96 341.656 313.48C341.149 312.987 340.896 312.293 340.896 311.4H342.936C342.936 311.88 343.029 312.227 343.216 312.44C343.416 312.653 343.709 312.76 344.096 312.76C344.483 312.76 344.769 312.653 344.956 312.44C345.156 312.227 345.256 311.88 345.256 311.4H347.296C347.296 312.293 347.036 312.987 346.516 313.48C345.996 313.96 345.189 314.2 344.096 314.2ZM351.603 315.4H353.643V317.18C353.963 316.567 354.436 316.08 355.063 315.72C355.703 315.36 356.423 315.18 357.223 315.18C358.61 315.18 359.703 315.613 360.503 316.48C361.303 317.347 361.703 318.653 361.703 320.4V320.8C361.703 321.707 361.596 322.5 361.383 323.18C361.17 323.86 360.863 324.427 360.463 324.88C360.076 325.32 359.61 325.653 359.063 325.88C358.516 326.107 357.903 326.22 357.223 326.22C356.463 326.22 355.77 326.053 355.143 325.72C354.516 325.387 354.07 324.92 353.803 324.32V330H351.603V315.4ZM356.703 324.3C357.53 324.3 358.196 324.013 358.703 323.44C359.21 322.867 359.463 321.987 359.463 320.8V320.4C359.463 319.28 359.216 318.453 358.723 317.92C358.23 317.373 357.556 317.1 356.703 317.1C356.33 317.1 355.97 317.16 355.623 317.28C355.276 317.4 354.963 317.58 354.683 317.82C354.416 318.047 354.203 318.34 354.043 318.7C353.883 319.047 353.803 319.447 353.803 319.9V321.3C353.803 321.807 353.883 322.247 354.043 322.62C354.203 322.993 354.416 323.307 354.683 323.56C354.95 323.813 355.256 324 355.603 324.12C355.95 324.24 356.316 324.3 356.703 324.3ZM368.508 326.22C367.774 326.22 367.088 326.107 366.448 325.88C365.821 325.64 365.274 325.293 364.808 324.84C364.341 324.387 363.974 323.827 363.708 323.16C363.441 322.48 363.308 321.693 363.308 320.8V320.4C363.308 319.56 363.441 318.82 363.708 318.18C363.974 317.527 364.341 316.98 364.808 316.54C365.274 316.087 365.821 315.747 366.448 315.52C367.088 315.293 367.774 315.18 368.508 315.18C369.241 315.18 369.921 315.293 370.548 315.52C371.188 315.747 371.741 316.087 372.208 316.54C372.674 316.98 373.041 317.527 373.308 318.18C373.574 318.82 373.708 319.56 373.708 320.4V320.8C373.708 321.693 373.574 322.48 373.308 323.16C373.041 323.827 372.674 324.387 372.208 324.84C371.741 325.293 371.188 325.64 370.548 325.88C369.921 326.107 369.241 326.22 368.508 326.22ZM368.508 324.3C368.894 324.3 369.261 324.233 369.608 324.1C369.968 323.967 370.281 323.76 370.548 323.48C370.828 323.2 371.048 322.84 371.208 322.4C371.381 321.96 371.468 321.427 371.468 320.8V320.4C371.468 319.827 371.381 319.333 371.208 318.92C371.048 318.507 370.828 318.167 370.548 317.9C370.281 317.633 369.968 317.433 369.608 317.3C369.261 317.167 368.894 317.1 368.508 317.1C368.121 317.1 367.748 317.167 367.388 317.3C367.041 317.433 366.728 317.633 366.448 317.9C366.181 318.167 365.961 318.507 365.788 318.92C365.628 319.333 365.548 319.827 365.548 320.4V320.8C365.548 321.427 365.628 321.96 365.788 322.4C365.961 322.84 366.181 323.2 366.448 323.48C366.728 323.76 367.041 323.967 367.388 324.1C367.748 324.233 368.121 324.3 368.508 324.3ZM380.3 326.22C379.58 326.22 378.913 326.113 378.3 325.9C377.7 325.673 377.173 325.333 376.72 324.88C376.28 324.427 375.933 323.86 375.68 323.18C375.427 322.5 375.3 321.707 375.3 320.8V320.4C375.3 319.547 375.433 318.793 375.7 318.14C375.967 317.487 376.327 316.94 376.78 316.5C377.247 316.06 377.78 315.733 378.38 315.52C378.993 315.293 379.633 315.18 380.3 315.18C380.993 315.18 381.607 315.273 382.14 315.46C382.687 315.647 383.147 315.907 383.52 316.24C383.907 316.56 384.213 316.94 384.44 317.38C384.667 317.82 384.82 318.293 384.9 318.8H382.66C382.527 318.307 382.287 317.9 381.94 317.58C381.593 317.26 381.047 317.1 380.3 317.1C379.927 317.1 379.573 317.167 379.24 317.3C378.907 317.42 378.613 317.613 378.36 317.88C378.107 318.147 377.907 318.493 377.76 318.92C377.613 319.333 377.54 319.827 377.54 320.4V320.8C377.54 321.427 377.613 321.967 377.76 322.42C377.907 322.86 378.107 323.22 378.36 323.5C378.613 323.78 378.907 323.987 379.24 324.12C379.573 324.24 379.927 324.3 380.3 324.3C381.54 324.3 382.327 323.733 382.66 322.6H384.9C384.793 323.16 384.607 323.667 384.34 324.12C384.087 324.56 383.76 324.94 383.36 325.26C382.96 325.567 382.5 325.807 381.98 325.98C381.46 326.14 380.9 326.22 380.3 326.22ZM391.594 326.22C390.887 326.22 390.22 326.113 389.594 325.9C388.967 325.673 388.414 325.34 387.934 324.9C387.467 324.447 387.094 323.88 386.814 323.2C386.534 322.52 386.394 321.72 386.394 320.8V320.4C386.394 319.52 386.527 318.753 386.794 318.1C387.06 317.447 387.42 316.907 387.874 316.48C388.34 316.04 388.874 315.713 389.474 315.5C390.074 315.287 390.714 315.18 391.394 315.18C393.007 315.18 394.24 315.613 395.094 316.48C395.96 317.347 396.394 318.587 396.394 320.2V321.32H388.634C388.647 321.867 388.734 322.333 388.894 322.72C389.067 323.093 389.287 323.4 389.554 323.64C389.834 323.867 390.147 324.033 390.494 324.14C390.854 324.247 391.22 324.3 391.594 324.3C392.354 324.3 392.907 324.18 393.254 323.94C393.614 323.7 393.86 323.387 393.994 323H396.194C395.98 324.053 395.454 324.853 394.614 325.4C393.787 325.947 392.78 326.22 391.594 326.22ZM391.494 317.1C391.12 317.1 390.76 317.147 390.414 317.24C390.08 317.333 389.78 317.487 389.514 317.7C389.26 317.9 389.054 318.167 388.894 318.5C388.734 318.82 388.647 319.213 388.634 319.68H394.194C394.18 319.187 394.1 318.773 393.954 318.44C393.82 318.107 393.634 317.84 393.394 317.64C393.154 317.44 392.867 317.3 392.534 317.22C392.214 317.14 391.867 317.1 391.494 317.1ZM400.9 317.28H397.4V315.4H406.6V317.28H403.1V326H400.9V317.28ZM408.6 315.4H410.8V319.12H413.2C414.56 319.12 415.567 319.413 416.22 320C416.873 320.573 417.2 321.427 417.2 322.56C417.2 323.627 416.88 324.467 416.24 325.08C415.6 325.693 414.587 326 413.2 326H408.6V315.4ZM413 324.12C413.733 324.12 414.247 323.993 414.54 323.74C414.847 323.473 415 323.08 415 322.56C415 322.04 414.847 321.653 414.54 321.4C414.247 321.133 413.733 321 413 321H410.8V324.12H413Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <path d="M290 232L310 254" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M466 241L434 269" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M215 347.5L274.5 341.5" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M326.5 450.5L341.5 402" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M482 389L438.5 365" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M553.5 312L453 320" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M430.5 468L397.5 398.5" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M226.5 449.5L300.5 381.5" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
            <path d="M375.5 169.5L370 236" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter1_b_422_468)">
            <rect x="328" y="62" width="97" height="97" rx="48.5" fill="#FFC6FF" fill-opacity="0.08" class="astro-OQM6QFFU"></rect>
            <path d="M353.07 105.4H355.23V110.584H361.35V105.4H363.51V118H361.35V112.456H355.23V118H353.07V105.4ZM369.716 118.198C368.588 118.198 367.736 117.874 367.16 117.226C366.584 116.566 366.296 115.564 366.296 114.22V108.46H368.276V114.04C368.276 114.844 368.438 115.45 368.762 115.858C369.098 116.266 369.626 116.47 370.346 116.47C370.742 116.47 371.078 116.404 371.354 116.272C371.642 116.14 371.876 115.96 372.056 115.732C372.236 115.504 372.368 115.246 372.452 114.958C372.548 114.658 372.596 114.352 372.596 114.04V108.46H374.576V118H372.74V116.38C372.512 116.872 372.14 117.298 371.624 117.658C371.12 118.018 370.484 118.198 369.716 118.198ZM381.231 118.198C380.571 118.198 379.953 118.096 379.377 117.892C378.813 117.676 378.321 117.364 377.901 116.956C377.481 116.548 377.151 116.044 376.911 115.444C376.671 114.832 376.551 114.124 376.551 113.32V112.96C376.551 112.204 376.671 111.538 376.911 110.962C377.151 110.374 377.481 109.882 377.901 109.486C378.321 109.078 378.813 108.772 379.377 108.568C379.953 108.364 380.571 108.262 381.231 108.262C381.891 108.262 382.503 108.364 383.067 108.568C383.643 108.772 384.141 109.078 384.561 109.486C384.981 109.882 385.311 110.374 385.551 110.962C385.791 111.538 385.911 112.204 385.911 112.96V113.32C385.911 114.124 385.791 114.832 385.551 115.444C385.311 116.044 384.981 116.548 384.561 116.956C384.141 117.364 383.643 117.676 383.067 117.892C382.503 118.096 381.891 118.198 381.231 118.198ZM381.231 116.47C381.579 116.47 381.909 116.41 382.221 116.29C382.545 116.17 382.827 115.984 383.067 115.732C383.319 115.48 383.517 115.156 383.661 114.76C383.817 114.364 383.895 113.884 383.895 113.32V112.96C383.895 112.444 383.817 112 383.661 111.628C383.517 111.256 383.319 110.95 383.067 110.71C382.827 110.47 382.545 110.29 382.221 110.17C381.909 110.05 381.579 109.99 381.231 109.99C380.883 109.99 380.547 110.05 380.223 110.17C379.911 110.29 379.629 110.47 379.377 110.71C379.137 110.95 378.939 111.256 378.783 111.628C378.639 112 378.567 112.444 378.567 112.96V113.32C378.567 113.884 378.639 114.364 378.783 114.76C378.939 115.156 379.137 115.48 379.377 115.732C379.629 115.984 379.911 116.17 380.223 116.29C380.547 116.41 380.883 116.47 381.231 116.47ZM392.96 118.198C392.168 118.198 391.484 118.018 390.908 117.658C390.344 117.298 389.948 116.878 389.72 116.398V118H387.884V105.4H389.864V109.972C390.164 109.48 390.572 109.072 391.088 108.748C391.616 108.424 392.24 108.262 392.96 108.262C394.196 108.262 395.174 108.652 395.894 109.432C396.614 110.212 396.974 111.388 396.974 112.96V113.32C396.974 114.136 396.878 114.85 396.686 115.462C396.494 116.074 396.218 116.584 395.858 116.992C395.51 117.388 395.09 117.688 394.598 117.892C394.106 118.096 393.56 118.198 392.96 118.198ZM392.492 116.47C393.224 116.47 393.818 116.212 394.274 115.696C394.73 115.18 394.958 114.388 394.958 113.32V112.96C394.958 111.952 394.736 111.208 394.292 110.728C393.848 110.236 393.248 109.99 392.492 109.99C392.144 109.99 391.814 110.044 391.502 110.152C391.19 110.26 390.908 110.422 390.656 110.638C390.416 110.842 390.224 111.106 390.08 111.43C389.936 111.742 389.864 112.102 389.864 112.51V113.77C389.864 114.226 389.936 114.622 390.08 114.958C390.224 115.294 390.416 115.576 390.656 115.804C390.896 116.032 391.172 116.2 391.484 116.308C391.808 116.416 392.144 116.47 392.492 116.47ZM399.138 108.46H401.118V118H399.138V108.46ZM400.128 107.38C399.756 107.38 399.45 107.266 399.21 107.038C398.982 106.798 398.868 106.492 398.868 106.12C398.868 105.748 398.982 105.448 399.21 105.22C399.45 104.98 399.756 104.86 400.128 104.86C400.5 104.86 400.8 104.98 401.028 105.22C401.268 105.448 401.388 105.748 401.388 106.12C401.388 106.492 401.268 106.798 401.028 107.038C400.8 107.266 400.5 107.38 400.128 107.38Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <rect x="328.5" y="62.5" width="96" height="96" rx="48" stroke="url(#paint1_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter2_dd_422_468)">
            <rect x="468" y="178" width="61" height="61" rx="30.5" fill="#2FD0A2" class="astro-OQM6QFFU"></rect>
            <path d="M501.939 203.938V200.466H509.838V194.987H487.912V200.466H495.833V203.938C489.197 204.257 484.215 205.589 484.215 207.185C484.215 208.781 489.191 210.105 495.833 210.433V221.892H501.939V210.433C508.575 210.116 513.557 208.784 513.557 207.185C513.557 205.587 508.58 204.257 501.939 203.938ZM498.886 209.395C491.7 209.395 485.875 208.284 485.875 206.947C485.875 205.795 490.118 204.829 495.827 204.571V208.493C497.861 208.585 499.899 208.585 501.933 208.493V204.571C507.642 204.829 511.886 205.795 511.886 206.947C511.897 208.298 506.071 209.395 498.886 209.395Z" fill="white" class="astro-OQM6QFFU"></path>
            <rect x="468.5" y="178.5" width="60" height="60" rx="30" stroke="url(#paint2_linear_422_468)" class="astro-OQM6QFFU"></rect>
            <rect x="468.5" y="178.5" width="60" height="60" rx="30" stroke="url(#paint3_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter3_b_422_468)">
            <rect x="571" y="259" width="97" height="97" rx="48.5" fill="#FFC6FF" fill-opacity="0.08" class="astro-OQM6QFFU"></rect>
            <path d="M598.848 302.4H603.888C605.316 302.4 606.36 302.706 607.02 303.318C607.692 303.93 608.028 304.746 608.028 305.766C608.028 306.414 607.86 306.972 607.524 307.44C607.188 307.896 606.726 308.226 606.138 308.43C606.882 308.598 607.47 308.94 607.902 309.456C608.346 309.96 608.568 310.62 608.568 311.436C608.568 311.964 608.484 312.45 608.316 312.894C608.148 313.326 607.884 313.698 607.524 314.01C607.176 314.322 606.726 314.568 606.174 314.748C605.622 314.916 604.956 315 604.176 315H598.848V302.4ZM603.942 313.128C604.878 313.128 605.52 312.978 605.868 312.678C606.228 312.378 606.408 311.916 606.408 311.292C606.408 310.992 606.366 310.722 606.282 310.482C606.198 310.242 606.06 310.044 605.868 309.888C605.676 309.72 605.418 309.594 605.094 309.51C604.782 309.426 604.392 309.384 603.924 309.384H601.008V313.128H603.942ZM603.618 307.656C604.458 307.656 605.04 307.5 605.364 307.188C605.7 306.876 605.868 306.456 605.868 305.928C605.868 305.388 605.706 304.98 605.382 304.704C605.058 304.416 604.47 304.272 603.618 304.272H601.008V307.656H603.618ZM611.988 318.798C611.808 318.798 611.628 318.78 611.448 318.744V317.016C611.628 317.052 611.808 317.07 611.988 317.07C612.192 317.07 612.36 317.034 612.492 316.962C612.636 316.902 612.762 316.788 612.87 316.62C612.99 316.464 613.104 316.254 613.212 315.99C613.332 315.726 613.464 315.396 613.608 315L609.558 305.46H611.718L614.634 312.84L617.262 305.46H619.278L615.588 315C615.324 315.672 615.078 316.248 614.85 316.728C614.622 317.208 614.37 317.598 614.094 317.898C613.83 318.21 613.53 318.438 613.194 318.582C612.858 318.726 612.456 318.798 611.988 318.798ZM625.976 315.198C625.184 315.198 624.5 315.018 623.924 314.658C623.36 314.298 622.964 313.878 622.736 313.398V315H620.9V302.4H622.88V306.972C623.18 306.48 623.588 306.072 624.104 305.748C624.632 305.424 625.256 305.262 625.976 305.262C627.212 305.262 628.19 305.652 628.91 306.432C629.63 307.212 629.99 308.388 629.99 309.96V310.32C629.99 311.136 629.894 311.85 629.702 312.462C629.51 313.074 629.234 313.584 628.874 313.992C628.526 314.388 628.106 314.688 627.614 314.892C627.122 315.096 626.576 315.198 625.976 315.198ZM625.508 313.47C626.24 313.47 626.834 313.212 627.29 312.696C627.746 312.18 627.974 311.388 627.974 310.32V309.96C627.974 308.952 627.752 308.208 627.308 307.728C626.864 307.236 626.264 306.99 625.508 306.99C625.16 306.99 624.83 307.044 624.518 307.152C624.206 307.26 623.924 307.422 623.672 307.638C623.432 307.842 623.24 308.106 623.096 308.43C622.952 308.742 622.88 309.102 622.88 309.51V310.77C622.88 311.226 622.952 311.622 623.096 311.958C623.24 312.294 623.432 312.576 623.672 312.804C623.912 313.032 624.188 313.2 624.5 313.308C624.824 313.416 625.16 313.47 625.508 313.47ZM632.154 305.46H634.134V315H632.154V305.46ZM633.144 304.38C632.772 304.38 632.466 304.266 632.226 304.038C631.998 303.798 631.884 303.492 631.884 303.12C631.884 302.748 631.998 302.448 632.226 302.22C632.466 301.98 632.772 301.86 633.144 301.86C633.516 301.86 633.816 301.98 634.044 302.22C634.284 302.448 634.404 302.748 634.404 303.12C634.404 303.492 634.284 303.798 634.044 304.038C633.816 304.266 633.516 304.38 633.144 304.38ZM640.515 315.09C639.423 315.09 638.637 314.856 638.157 314.388C637.689 313.92 637.455 313.164 637.455 312.12V307.152H636.105V305.46H637.455V303.3H639.435V305.46H641.865V307.152H639.435V311.85C639.435 312.414 639.537 312.81 639.741 313.038C639.957 313.254 640.365 313.362 640.965 313.362C641.325 313.362 641.685 313.344 642.045 313.308V315C641.817 315.024 641.583 315.042 641.343 315.054C641.103 315.078 640.827 315.09 640.515 315.09Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <rect x="571.5" y="259.5" width="96" height="96" rx="48" stroke="url(#paint4_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter4_dd_422_468)">
            <rect x="492" y="381" width="61" height="61" rx="30.5" fill="#762CA4" class="astro-OQM6QFFU"></rect>
            <path d="M512.461 418.005C512.651 417.816 512.908 417.71 513.176 417.71H537.823C538.273 417.71 538.499 418.254 538.18 418.572L533.311 423.441C533.122 423.63 532.865 423.737 532.597 423.736H507.95C507.499 423.736 507.274 423.193 507.592 422.874L512.461 418.005ZM512.461 399.827C512.656 399.64 512.912 399.532 513.176 399.532H537.823C538.273 399.532 538.499 400.075 538.18 400.394L533.311 405.263C533.122 405.452 532.865 405.558 532.597 405.558H507.95C507.499 405.558 507.274 405.014 507.592 404.696L512.461 399.827ZM533.311 408.858C533.122 408.669 532.865 408.563 532.597 408.563H507.95C507.499 408.563 507.274 409.107 507.592 409.425L512.461 414.294C512.651 414.483 512.908 414.589 513.176 414.589H537.823C538.273 414.589 538.499 414.045 538.18 413.727L533.311 408.858Z" fill="white" class="astro-OQM6QFFU"></path>
            <rect x="492.5" y="381.5" width="60" height="60" rx="30" stroke="url(#paint5_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter9_b_422_468)">
            <rect x="402" y="474" width="97" height="97" rx="48.5" fill="#FFC6FF" fill-opacity="0.08" class="astro-OQM6QFFU"></rect>
            <path d="M418.833 527.143C418.27 527.143 417.746 527.056 417.26 526.883C416.784 526.71 416.368 526.437 416.012 526.064C415.657 525.691 415.375 525.215 415.167 524.634C414.968 524.045 414.868 523.338 414.868 522.515V522.255C414.868 521.466 414.972 520.79 415.18 520.227C415.388 519.655 415.67 519.187 416.025 518.823C416.389 518.459 416.81 518.19 417.286 518.017C417.772 517.844 418.287 517.757 418.833 517.757C419.336 517.757 419.804 517.822 420.237 517.952C420.671 518.073 421.048 518.26 421.368 518.511C421.698 518.762 421.962 519.074 422.161 519.447C422.369 519.82 422.495 520.257 422.538 520.76H420.9C420.788 520.197 420.545 519.785 420.172 519.525C419.808 519.265 419.362 519.135 418.833 519.135C418.547 519.135 418.266 519.187 417.988 519.291C417.711 519.395 417.46 519.568 417.234 519.811C417.018 520.054 416.84 520.374 416.701 520.773C416.571 521.172 416.506 521.666 416.506 522.255V522.515C416.506 523.139 416.576 523.659 416.714 524.075C416.862 524.491 417.048 524.825 417.273 525.076C417.499 525.327 417.746 525.505 418.014 525.609C418.292 525.713 418.565 525.765 418.833 525.765C419.457 525.765 419.938 525.622 420.276 525.336C420.623 525.041 420.831 524.643 420.9 524.14H422.538C422.486 524.677 422.356 525.137 422.148 525.518C421.94 525.899 421.672 526.211 421.342 526.454C421.022 526.688 420.645 526.861 420.211 526.974C419.787 527.087 419.327 527.143 418.833 527.143ZM424.039 520.11H425.365V521.28C425.504 520.925 425.729 520.617 426.041 520.357C426.362 520.097 426.756 519.967 427.224 519.967C427.441 519.967 427.601 519.976 427.705 519.993C427.818 520.01 427.896 520.028 427.939 520.045V521.345C427.792 521.302 427.657 521.271 427.536 521.254C427.415 521.228 427.267 521.215 427.094 521.215C426.808 521.215 426.561 521.267 426.353 521.371C426.154 521.466 425.989 521.596 425.859 521.761C425.729 521.917 425.629 522.103 425.56 522.32C425.499 522.528 425.469 522.745 425.469 522.97V527H424.039V520.11ZM430.463 529.743C430.333 529.743 430.203 529.73 430.073 529.704V528.456C430.203 528.482 430.333 528.495 430.463 528.495C430.611 528.495 430.732 528.469 430.827 528.417C430.931 528.374 431.022 528.291 431.1 528.17C431.187 528.057 431.269 527.906 431.347 527.715C431.434 527.524 431.529 527.286 431.633 527L428.708 520.11H430.268L432.374 525.44L434.272 520.11H435.728L433.063 527C432.873 527.485 432.695 527.901 432.53 528.248C432.366 528.595 432.184 528.876 431.984 529.093C431.794 529.318 431.577 529.483 431.334 529.587C431.092 529.691 430.801 529.743 430.463 529.743ZM436.899 520.11H438.225V521.267C438.433 520.868 438.741 520.552 439.148 520.318C439.564 520.084 440.032 519.967 440.552 519.967C441.454 519.967 442.164 520.249 442.684 520.812C443.204 521.375 443.464 522.225 443.464 523.36V523.62C443.464 524.209 443.395 524.725 443.256 525.167C443.118 525.609 442.918 525.977 442.658 526.272C442.407 526.558 442.104 526.775 441.748 526.922C441.393 527.069 440.994 527.143 440.552 527.143C440.058 527.143 439.608 527.035 439.2 526.818C438.793 526.601 438.503 526.298 438.329 525.908V529.6H436.899V520.11ZM440.214 525.895C440.752 525.895 441.185 525.709 441.514 525.336C441.844 524.963 442.008 524.391 442.008 523.62V523.36C442.008 522.632 441.848 522.095 441.527 521.748C441.207 521.393 440.769 521.215 440.214 521.215C439.972 521.215 439.738 521.254 439.512 521.332C439.287 521.41 439.083 521.527 438.901 521.683C438.728 521.83 438.589 522.021 438.485 522.255C438.381 522.48 438.329 522.74 438.329 523.035V523.945C438.329 524.274 438.381 524.56 438.485 524.803C438.589 525.046 438.728 525.249 438.901 525.414C439.075 525.579 439.274 525.7 439.499 525.778C439.725 525.856 439.963 525.895 440.214 525.895ZM447.562 527.065C446.774 527.065 446.206 526.896 445.859 526.558C445.521 526.22 445.352 525.674 445.352 524.92V521.332H444.377V520.11H445.352V518.55H446.782V520.11H448.537V521.332H446.782V524.725C446.782 525.132 446.856 525.418 447.003 525.583C447.159 525.739 447.454 525.817 447.887 525.817C448.147 525.817 448.407 525.804 448.667 525.778V527C448.503 527.017 448.334 527.03 448.16 527.039C447.987 527.056 447.788 527.065 447.562 527.065ZM453.029 527.143C452.552 527.143 452.106 527.069 451.69 526.922C451.283 526.766 450.927 526.541 450.624 526.246C450.321 525.951 450.082 525.587 449.909 525.154C449.736 524.712 449.649 524.201 449.649 523.62V523.36C449.649 522.814 449.736 522.333 449.909 521.917C450.082 521.492 450.321 521.137 450.624 520.851C450.927 520.556 451.283 520.335 451.69 520.188C452.106 520.041 452.552 519.967 453.029 519.967C453.506 519.967 453.948 520.041 454.355 520.188C454.771 520.335 455.131 520.556 455.434 520.851C455.737 521.137 455.976 521.492 456.149 521.917C456.322 522.333 456.409 522.814 456.409 523.36V523.62C456.409 524.201 456.322 524.712 456.149 525.154C455.976 525.587 455.737 525.951 455.434 526.246C455.131 526.541 454.771 526.766 454.355 526.922C453.948 527.069 453.506 527.143 453.029 527.143ZM453.029 525.895C453.28 525.895 453.519 525.852 453.744 525.765C453.978 525.678 454.182 525.544 454.355 525.362C454.537 525.18 454.68 524.946 454.784 524.66C454.897 524.374 454.953 524.027 454.953 523.62V523.36C454.953 522.987 454.897 522.667 454.784 522.398C454.68 522.129 454.537 521.908 454.355 521.735C454.182 521.562 453.978 521.432 453.744 521.345C453.519 521.258 453.28 521.215 453.029 521.215C452.778 521.215 452.535 521.258 452.301 521.345C452.076 521.432 451.872 521.562 451.69 521.735C451.517 521.908 451.374 522.129 451.261 522.398C451.157 522.667 451.105 522.987 451.105 523.36V523.62C451.105 524.027 451.157 524.374 451.261 524.66C451.374 524.946 451.517 525.18 451.69 525.362C451.872 525.544 452.076 525.678 452.301 525.765C452.535 525.852 452.778 525.895 453.029 525.895ZM458.698 527.143C458.403 527.143 458.156 527.043 457.957 526.844C457.757 526.645 457.658 526.398 457.658 526.103C457.658 525.8 457.757 525.553 457.957 525.362C458.156 525.163 458.403 525.063 458.698 525.063C458.992 525.063 459.239 525.163 459.439 525.362C459.638 525.553 459.738 525.8 459.738 526.103C459.738 526.398 459.638 526.645 459.439 526.844C459.239 527.043 458.992 527.143 458.698 527.143ZM464.236 527.143C463.768 527.143 463.334 527.074 462.936 526.935C462.546 526.788 462.203 526.567 461.909 526.272C461.623 525.977 461.397 525.609 461.233 525.167C461.068 524.725 460.986 524.209 460.986 523.62V523.36C460.986 522.805 461.072 522.316 461.246 521.891C461.419 521.466 461.653 521.111 461.948 520.825C462.251 520.539 462.598 520.327 462.988 520.188C463.386 520.041 463.802 519.967 464.236 519.967C464.686 519.967 465.085 520.028 465.432 520.149C465.787 520.27 466.086 520.439 466.329 520.656C466.58 520.864 466.779 521.111 466.927 521.397C467.074 521.683 467.174 521.991 467.226 522.32H465.77C465.683 521.999 465.527 521.735 465.302 521.527C465.076 521.319 464.721 521.215 464.236 521.215C463.993 521.215 463.763 521.258 463.547 521.345C463.33 521.423 463.139 521.549 462.975 521.722C462.81 521.895 462.68 522.121 462.585 522.398C462.489 522.667 462.442 522.987 462.442 523.36V523.62C462.442 524.027 462.489 524.378 462.585 524.673C462.68 524.959 462.81 525.193 462.975 525.375C463.139 525.557 463.33 525.691 463.547 525.778C463.763 525.856 463.993 525.895 464.236 525.895C465.042 525.895 465.553 525.527 465.77 524.79H467.226C467.156 525.154 467.035 525.483 466.862 525.778C466.697 526.064 466.485 526.311 466.225 526.519C465.965 526.718 465.666 526.874 465.328 526.987C464.99 527.091 464.626 527.143 464.236 527.143ZM471.577 527.143C471.1 527.143 470.654 527.069 470.238 526.922C469.83 526.766 469.475 526.541 469.172 526.246C468.868 525.951 468.63 525.587 468.457 525.154C468.283 524.712 468.197 524.201 468.197 523.62V523.36C468.197 522.814 468.283 522.333 468.457 521.917C468.63 521.492 468.868 521.137 469.172 520.851C469.475 520.556 469.83 520.335 470.238 520.188C470.654 520.041 471.1 519.967 471.577 519.967C472.053 519.967 472.495 520.041 472.903 520.188C473.319 520.335 473.678 520.556 473.982 520.851C474.285 521.137 474.523 521.492 474.697 521.917C474.87 522.333 474.957 522.814 474.957 523.36V523.62C474.957 524.201 474.87 524.712 474.697 525.154C474.523 525.587 474.285 525.951 473.982 526.246C473.678 526.541 473.319 526.766 472.903 526.922C472.495 527.069 472.053 527.143 471.577 527.143ZM471.577 525.895C471.828 525.895 472.066 525.852 472.292 525.765C472.526 525.678 472.729 525.544 472.903 525.362C473.085 525.18 473.228 524.946 473.332 524.66C473.444 524.374 473.501 524.027 473.501 523.62V523.36C473.501 522.987 473.444 522.667 473.332 522.398C473.228 522.129 473.085 521.908 472.903 521.735C472.729 521.562 472.526 521.432 472.292 521.345C472.066 521.258 471.828 521.215 471.577 521.215C471.325 521.215 471.083 521.258 470.849 521.345C470.623 521.432 470.42 521.562 470.238 521.735C470.064 521.908 469.921 522.129 469.809 522.398C469.705 522.667 469.653 522.987 469.653 523.36V523.62C469.653 524.027 469.705 524.374 469.809 524.66C469.921 524.946 470.064 525.18 470.238 525.362C470.42 525.544 470.623 525.678 470.849 525.765C471.083 525.852 471.325 525.895 471.577 525.895ZM476.382 520.11H477.708V521.28C477.786 521.107 477.89 520.942 478.02 520.786C478.15 520.621 478.297 520.478 478.462 520.357C478.635 520.236 478.821 520.14 479.021 520.071C479.22 520.002 479.432 519.967 479.658 519.967C480.23 519.967 480.676 520.088 480.997 520.331C481.317 520.574 481.538 520.89 481.66 521.28C481.859 520.89 482.136 520.574 482.492 520.331C482.856 520.088 483.276 519.967 483.753 519.967C484.472 519.967 485.027 520.179 485.417 520.604C485.807 521.029 486.002 521.687 486.002 522.58V527H484.572V522.905C484.572 522.29 484.455 521.856 484.221 521.605C483.995 521.345 483.688 521.215 483.298 521.215C482.83 521.215 482.479 521.375 482.245 521.696C482.019 522.008 481.907 522.411 481.907 522.905V527H480.477V522.905C480.477 522.29 480.36 521.856 480.126 521.605C479.9 521.345 479.593 521.215 479.203 521.215C478.735 521.215 478.384 521.375 478.15 521.696C477.924 522.008 477.812 522.411 477.812 522.905V527H476.382V520.11Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <rect x="402.5" y="474.5" width="96" height="96" rx="48" stroke="url(#paint10_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter5_dd_422_468)">
            <rect x="283" y="461" width="61" height="61" rx="30.5" fill="#3A286B" class="astro-OQM6QFFU"></rect>
            <path d="M329.752 484.897L324.595 481.33C324.511 481.272 324.415 481.229 324.315 481.205L301.002 475.693C300.707 475.624 300.398 475.719 300.196 475.941C299.995 476.164 299.933 476.478 300.037 476.758L312.269 509.884C312.375 510.171 312.636 510.375 312.945 510.412C312.978 510.416 313.01 510.417 313.043 510.417C313.316 510.417 313.574 510.284 313.727 510.056L329.964 486.009C330.211 485.642 330.117 485.149 329.752 484.897ZM324.26 483.079L327.679 485.444L318.041 490.209L324.26 483.079ZM314.748 491.497L303.056 477.845L322.621 482.471L314.749 491.496L314.748 491.497ZM313.889 493.008L312.58 505.986L303.165 480.487L313.889 493.007V493.008ZM315.517 493.271L326.876 487.655L314.188 506.446L315.517 493.271V493.271Z" fill="white" class="astro-OQM6QFFU"></path>
            <rect x="283.5" y="461.5" width="60" height="60" rx="30" stroke="url(#paint6_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter8_b_422_468)">
            <rect x="125" y="434" width="97" height="97" rx="48.5" fill="#FFC6FF" fill-opacity="0.08" class="astro-OQM6QFFU"></rect>
            <path d="M150.097 477.4H152.329L156.343 484.87L160.357 477.4H162.517V490H160.357V481.18L157.027 487.39H155.587L152.257 481.18V490H150.097V477.4ZM165.759 477.4H174.219V479.272H167.919V482.584H173.679V484.456H167.919V488.128H174.219V490H165.759V477.4ZM180.001 483.412L175.843 477.4H178.291L181.351 481.81L184.447 477.4H186.823L182.683 483.376L187.003 490H184.519L181.315 484.96L178.075 490H175.663L180.001 483.412ZM193.576 490.198C192.796 490.198 192.07 490.078 191.398 489.838C190.738 489.598 190.162 489.22 189.67 488.704C189.178 488.188 188.788 487.528 188.5 486.724C188.224 485.908 188.086 484.93 188.086 483.79V483.43C188.086 482.338 188.23 481.402 188.518 480.622C188.806 479.83 189.196 479.182 189.688 478.678C190.192 478.174 190.774 477.802 191.434 477.562C192.106 477.322 192.82 477.202 193.576 477.202C194.272 477.202 194.92 477.292 195.52 477.472C196.12 477.64 196.642 477.898 197.086 478.246C197.542 478.594 197.908 479.026 198.184 479.542C198.472 480.058 198.646 480.664 198.706 481.36H196.438C196.282 480.58 195.946 480.01 195.43 479.65C194.926 479.29 194.308 479.11 193.576 479.11C193.18 479.11 192.79 479.182 192.406 479.326C192.022 479.47 191.674 479.71 191.362 480.046C191.062 480.382 190.816 480.826 190.624 481.378C190.444 481.93 190.354 482.614 190.354 483.43V483.79C190.354 484.654 190.45 485.374 190.642 485.95C190.846 486.526 191.104 486.988 191.416 487.336C191.728 487.684 192.07 487.93 192.442 488.074C192.826 488.218 193.204 488.29 193.576 488.29C194.44 488.29 195.106 488.092 195.574 487.696C196.054 487.288 196.342 486.736 196.438 486.04H198.706C198.634 486.784 198.454 487.42 198.166 487.948C197.878 488.476 197.506 488.908 197.05 489.244C196.606 489.568 196.084 489.808 195.484 489.964C194.896 490.12 194.26 490.198 193.576 490.198Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <rect x="125.5" y="434.5" width="96" height="96" rx="48" stroke="url(#paint9_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter6_dd_422_468)">
            <rect x="141" y="318" width="61" height="61" rx="30.5" fill="#627EEA" class="astro-OQM6QFFU"></rect>
            <g clip-path="url(#clip0_422_468)" class="astro-OQM6QFFU">
                <path d="M184 349.453L171.973 356.213L172.019 343.941L184 349.453Z" fill="#8198EE" class="astro-OQM6QFFU"></path>
                <path d="M172.018 343.941L171.972 356.213L160 349.453L172.018 343.941Z" fill="#C1CCF6" class="astro-OQM6QFFU"></path>
                <path d="M160 349.453L172 330L172.018 343.941L160 349.453Z" fill="white" class="astro-OQM6QFFU"></path>
                <path d="M172.018 343.941L172 330L184 349.453L172.018 343.941Z" fill="#C1CCF6" class="astro-OQM6QFFU"></path>
                <path d="M171.968 358.578L183.848 351.575L171.968 368V358.578Z" fill="#C1CCF6" class="astro-OQM6QFFU"></path>
                <path d="M171.968 368L160.088 351.575L171.968 358.578V368Z" fill="white" class="astro-OQM6QFFU"></path>
            </g>
            <rect x="141.5" y="318.5" width="60" height="60" rx="30" stroke="url(#paint7_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter10_b_422_468)">
            <rect x="88" y="173" width="97" height="97" rx="48.5" fill="#FFC6FF" fill-opacity="0.08" class="astro-OQM6QFFU"></rect>
            <path d="M103.877 216.4H108.917C110.345 216.4 111.389 216.706 112.049 217.318C112.721 217.93 113.057 218.746 113.057 219.766C113.057 220.414 112.889 220.972 112.553 221.44C112.217 221.896 111.755 222.226 111.167 222.43C111.911 222.598 112.499 222.94 112.931 223.456C113.375 223.96 113.597 224.62 113.597 225.436C113.597 225.964 113.513 226.45 113.345 226.894C113.177 227.326 112.913 227.698 112.553 228.01C112.205 228.322 111.755 228.568 111.203 228.748C110.651 228.916 109.985 229 109.205 229H103.877V216.4ZM108.971 227.128C109.907 227.128 110.549 226.978 110.897 226.678C111.257 226.378 111.437 225.916 111.437 225.292C111.437 224.992 111.395 224.722 111.311 224.482C111.227 224.242 111.089 224.044 110.897 223.888C110.705 223.72 110.447 223.594 110.123 223.51C109.811 223.426 109.421 223.384 108.953 223.384H106.037V227.128H108.971ZM108.647 221.656C109.487 221.656 110.069 221.5 110.393 221.188C110.729 220.876 110.897 220.456 110.897 219.928C110.897 219.388 110.735 218.98 110.411 218.704C110.087 218.416 109.499 218.272 108.647 218.272H106.037V221.656H108.647ZM115.843 219.46H117.823V229H115.843V219.46ZM116.833 218.38C116.461 218.38 116.155 218.266 115.915 218.038C115.687 217.798 115.573 217.492 115.573 217.12C115.573 216.748 115.687 216.448 115.915 216.22C116.155 215.98 116.461 215.86 116.833 215.86C117.205 215.86 117.505 215.98 117.733 216.22C117.973 216.448 118.093 216.748 118.093 217.12C118.093 217.492 117.973 217.798 117.733 218.038C117.505 218.266 117.205 218.38 116.833 218.38ZM120.515 219.46H122.351V221.062C122.579 220.582 122.951 220.162 123.467 219.802C123.983 219.442 124.649 219.262 125.465 219.262C126.629 219.262 127.505 219.58 128.093 220.216C128.681 220.84 128.975 221.758 128.975 222.97V229H126.995V223.42C126.995 222.616 126.827 222.01 126.491 221.602C126.155 221.194 125.603 220.99 124.835 220.99C124.415 220.99 124.055 221.062 123.755 221.206C123.467 221.338 123.227 221.518 123.035 221.746C122.855 221.962 122.717 222.22 122.621 222.52C122.537 222.808 122.495 223.108 122.495 223.42V229H120.515V219.46ZM134.203 229.198C133.687 229.198 133.225 229.126 132.817 228.982C132.421 228.826 132.085 228.616 131.809 228.352C131.533 228.076 131.323 227.758 131.179 227.398C131.035 227.038 130.963 226.642 130.963 226.21C130.963 225.262 131.245 224.56 131.809 224.104C132.373 223.636 133.201 223.402 134.293 223.402H137.263V222.88C137.263 222.16 137.101 221.668 136.777 221.404C136.465 221.128 135.967 220.99 135.283 220.99C134.671 220.99 134.221 221.086 133.933 221.278C133.645 221.47 133.477 221.734 133.429 222.07H131.503C131.527 221.662 131.629 221.29 131.809 220.954C132.001 220.606 132.259 220.306 132.583 220.054C132.919 219.802 133.321 219.61 133.789 219.478C134.257 219.334 134.785 219.262 135.373 219.262C135.961 219.262 136.489 219.328 136.957 219.46C137.437 219.592 137.845 219.802 138.181 220.09C138.517 220.366 138.775 220.726 138.955 221.17C139.147 221.614 139.243 222.148 139.243 222.772V226.57C139.243 227.074 139.249 227.518 139.261 227.902C139.273 228.274 139.303 228.64 139.351 229H137.551C137.515 228.724 137.485 228.49 137.461 228.298C137.449 228.106 137.443 227.866 137.443 227.578C137.215 228.022 136.819 228.406 136.255 228.73C135.703 229.042 135.019 229.198 134.203 229.198ZM134.743 227.47C135.079 227.47 135.397 227.428 135.697 227.344C136.009 227.248 136.279 227.116 136.507 226.948C136.735 226.768 136.915 226.552 137.047 226.3C137.191 226.036 137.263 225.736 137.263 225.4V224.878H134.653C134.149 224.878 133.741 224.986 133.429 225.202C133.129 225.418 132.979 225.736 132.979 226.156C132.979 226.552 133.117 226.87 133.393 227.11C133.681 227.35 134.131 227.47 134.743 227.47ZM141.679 219.46H143.515V221.062C143.743 220.582 144.115 220.162 144.631 219.802C145.147 219.442 145.813 219.262 146.629 219.262C147.793 219.262 148.669 219.58 149.257 220.216C149.845 220.84 150.139 221.758 150.139 222.97V229H148.159V223.42C148.159 222.616 147.991 222.01 147.655 221.602C147.319 221.194 146.767 220.99 145.999 220.99C145.579 220.99 145.219 221.062 144.919 221.206C144.631 221.338 144.391 221.518 144.199 221.746C144.019 221.962 143.881 222.22 143.785 222.52C143.701 222.808 143.659 223.108 143.659 223.42V229H141.679V219.46ZM156.537 229.198C155.889 229.198 155.289 229.102 154.737 228.91C154.197 228.706 153.723 228.4 153.315 227.992C152.919 227.584 152.607 227.074 152.379 226.462C152.151 225.85 152.037 225.136 152.037 224.32V223.96C152.037 223.192 152.157 222.514 152.397 221.926C152.637 221.338 152.961 220.846 153.369 220.45C153.789 220.054 154.269 219.76 154.809 219.568C155.361 219.364 155.937 219.262 156.537 219.262C157.161 219.262 157.713 219.346 158.193 219.514C158.685 219.682 159.099 219.916 159.435 220.216C159.783 220.504 160.059 220.846 160.263 221.242C160.467 221.638 160.605 222.064 160.677 222.52H158.661C158.541 222.076 158.325 221.71 158.013 221.422C157.701 221.134 157.209 220.99 156.537 220.99C156.201 220.99 155.883 221.05 155.583 221.17C155.283 221.278 155.019 221.452 154.791 221.692C154.563 221.932 154.383 222.244 154.251 222.628C154.119 223 154.053 223.444 154.053 223.96V224.32C154.053 224.884 154.119 225.37 154.251 225.778C154.383 226.174 154.563 226.498 154.791 226.75C155.019 227.002 155.283 227.188 155.583 227.308C155.883 227.416 156.201 227.47 156.537 227.47C157.653 227.47 158.361 226.96 158.661 225.94H160.677C160.581 226.444 160.413 226.9 160.173 227.308C159.945 227.704 159.651 228.046 159.291 228.334C158.931 228.61 158.517 228.826 158.049 228.982C157.581 229.126 157.077 229.198 156.537 229.198ZM166.702 229.198C166.066 229.198 165.466 229.102 164.902 228.91C164.338 228.706 163.84 228.406 163.408 228.01C162.988 227.602 162.652 227.092 162.4 226.48C162.148 225.868 162.022 225.148 162.022 224.32V223.96C162.022 223.168 162.142 222.478 162.382 221.89C162.622 221.302 162.946 220.816 163.354 220.432C163.774 220.036 164.254 219.742 164.794 219.55C165.334 219.358 165.91 219.262 166.522 219.262C167.974 219.262 169.084 219.652 169.852 220.432C170.632 221.212 171.022 222.328 171.022 223.78V224.788H164.038C164.05 225.28 164.128 225.7 164.272 226.048C164.428 226.384 164.626 226.66 164.866 226.876C165.118 227.08 165.4 227.23 165.712 227.326C166.036 227.422 166.366 227.47 166.702 227.47C167.386 227.47 167.884 227.362 168.196 227.146C168.52 226.93 168.742 226.648 168.862 226.3H170.842C170.65 227.248 170.176 227.968 169.42 228.46C168.676 228.952 167.77 229.198 166.702 229.198ZM166.612 220.99C166.276 220.99 165.952 221.032 165.64 221.116C165.34 221.2 165.07 221.338 164.83 221.53C164.602 221.71 164.416 221.95 164.272 222.25C164.128 222.538 164.05 222.892 164.038 223.312H169.042C169.03 222.868 168.958 222.496 168.826 222.196C168.706 221.896 168.538 221.656 168.322 221.476C168.106 221.296 167.848 221.17 167.548 221.098C167.26 221.026 166.948 220.99 166.612 220.99Z" fill="white" fill-opacity="0.92" class="astro-OQM6QFFU"></path>
            <rect x="88.5" y="173.5" width="96" height="96" rx="48" stroke="url(#paint11_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <g class="about-neural-image__electron astro-OQM6QFFU" filter="url(#filter7_dd_422_468)">
            <rect x="236" y="173" width="61" height="61" rx="30.5" fill="#F7931A" class="astro-OQM6QFFU"></rect>
            <path d="M258.601 210.977C258.552 211.385 258.324 212.037 257.42 212.055C257.461 212.091 255.099 212.096 255.099 212.096L254.529 215.916L258.685 215.842C259.458 215.829 260.219 215.828 260.966 215.82L261.058 221.118L264.248 221.062L264.158 215.819C265.009 215.821 265.859 215.814 266.709 215.798L266.797 221.017L269.991 220.96L269.901 215.67C275.264 215.267 278.998 213.85 279.379 208.807C279.686 204.746 277.746 202.971 274.686 202.294C276.521 201.32 277.65 199.64 277.332 196.881C276.904 193.111 273.617 191.903 269.489 191.615L269.4 186.376L266.206 186.433L266.294 191.534C265.455 191.549 264.597 191.581 263.745 191.613L263.657 186.478L260.466 186.535L260.554 191.773C259.863 191.799 259.184 191.824 258.522 191.836L258.522 191.82L254.117 191.897L254.177 195.303C254.177 195.303 256.534 195.216 256.495 195.26C257.789 195.238 258.223 195.98 258.356 196.625L258.601 210.977ZM273.058 208.291C273.128 212.251 266.331 211.921 264.167 211.962L264.048 204.941C266.213 204.903 272.988 204.161 273.058 208.291ZM271.404 198.412C271.465 202.015 265.795 201.695 263.993 201.728L263.884 195.36C265.687 195.328 271.339 194.655 271.404 198.412Z" fill="white" class="astro-OQM6QFFU"></path>
            <rect x="236.5" y="173.5" width="60" height="60" rx="30" stroke="url(#paint8_linear_422_468)" class="astro-OQM6QFFU"></rect>
        </g>
        <path d="M193.5 253L274.5 293.5" stroke="#5D457B" stroke-linecap="round" class="astro-OQM6QFFU"></path>
        <mask id="mask0_422_468" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="262" y="261" width="202" height="116" class="astro-OQM6QFFU">
            <path d="M423 270L414.5 261H439.5L463.5 282.5L451 317.5L418.5 348.5L356 374.5L294 377L266 360.5L262 335L287 307.5V319.5L280 337C280.833 340.833 284.8 350.7 294 359.5C305.5 370.5 367.5 349 408.5 335C449.5 321 449 289.5 447.5 284C446.3 279.6 430.667 272.833 423 270Z" fill="black" class="astro-OQM6QFFU"></path>
        </mask>
        <g mask="url(#mask0_422_468)" class="astro-OQM6QFFU">
            <g filter="url(#filter11_b_422_468)" class="astro-OQM6QFFU">
                <path d="M453.309 283.33C455.213 288.549 454.625 294.483 451.783 300.815C448.939 307.154 443.86 313.829 436.903 320.439C422.993 333.657 401.718 346.481 376.369 355.728C351.02 364.974 326.485 368.859 307.331 367.701C297.752 367.122 289.568 365.285 283.31 362.266C277.059 359.251 272.789 355.089 270.885 349.87C268.981 344.651 269.569 338.717 272.411 332.385C275.256 326.046 280.335 319.371 287.291 312.761C301.201 299.543 322.476 286.719 347.825 277.472C373.175 268.226 397.71 264.341 416.864 265.499C426.442 266.078 434.626 267.915 440.884 270.934C447.136 273.949 451.405 278.111 453.309 283.33Z" stroke="url(#paint12_linear_422_468)" stroke-width="2" class="astro-OQM6QFFU"></path>
            </g>
            <g filter="url(#filter12_b_422_468)" class="astro-OQM6QFFU">
                <path d="M453.309 283.33C455.213 288.549 454.625 294.483 451.783 300.815C448.939 307.154 443.86 313.829 436.903 320.439C422.993 333.657 401.718 346.481 376.369 355.728C351.02 364.974 326.485 368.859 307.331 367.701C297.752 367.122 289.568 365.285 283.31 362.266C277.059 359.251 272.789 355.089 270.885 349.87C268.981 344.651 269.569 338.717 272.411 332.385C275.256 326.046 280.335 319.371 287.291 312.761C301.201 299.543 322.476 286.719 347.825 277.472C373.175 268.226 397.71 264.341 416.864 265.499C426.442 266.078 434.626 267.915 440.884 270.934C447.136 273.949 451.405 278.111 453.309 283.33Z" stroke="url(#paint13_linear_422_468)" stroke-width="2" class="astro-OQM6QFFU"></path>
            </g>
        </g>
        <defs class="astro-OQM6QFFU">
            <filter id="filter0_b_422_468" x="150.5" y="105" width="467.5" height="427.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter1_b_422_468" x="264" y="-2" width="225" height="225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter2_dd_422_468" x="447" y="157" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="7" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="10.5" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.820833 0 0 0 0 0.229833 0 0 0 0.3 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="effect1_dropShadow_422_468" result="effect2_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter3_b_422_468" x="507" y="195" width="225" height="225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter4_dd_422_468" x="471" y="360" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="7" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="10.5" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0.265333 0 0 0 0 0 0 0 0 0 0.829167 0 0 0 0.3 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="effect1_dropShadow_422_468" result="effect2_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter5_dd_422_468" x="262" y="440" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="7" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="10.5" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0.307781 0 0 0 0 0.0820312 0 0 0 0 0.7875 0 0 0 0.4 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="effect1_dropShadow_422_468" result="effect2_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter6_dd_422_468" x="120" y="297" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="7" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="10.5" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.328333 0 0 0 0 0.820833 0 0 0 0.3 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="effect1_dropShadow_422_468" result="effect2_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter7_dd_422_468" x="215" y="152" width="103" height="103" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="7" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.808667 0 0 0 0 0.316667 0 0 0 0.16 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" class="astro-OQM6QFFU"></feColorMatrix>
                <feOffset class="astro-OQM6QFFU"></feOffset>
                <feGaussianBlur stdDeviation="10.5" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out" class="astro-OQM6QFFU"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.576417 0 0 0 0 0.0791667 0 0 0 0.3 0" class="astro-OQM6QFFU"></feColorMatrix>
                <feBlend mode="normal" in2="effect1_dropShadow_422_468" result="effect2_dropShadow_422_468" class="astro-OQM6QFFU"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter8_b_422_468" x="61" y="370" width="225" height="225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter9_b_422_468" x="338" y="410" width="225" height="225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter10_b_422_468" x="24" y="109" width="225" height="225" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter11_b_422_468" x="204.78" y="200.3" width="314.634" height="232.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <filter id="filter12_b_422_468" x="204.78" y="200.3" width="314.634" height="232.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB" class="astro-OQM6QFFU">
                <feFlood flood-opacity="0" result="BackgroundImageFix" class="astro-OQM6QFFU"></feFlood>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="32" class="astro-OQM6QFFU"></feGaussianBlur>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_468" class="astro-OQM6QFFU"></feComposite>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_422_468" result="shape" class="astro-OQM6QFFU"></feBlend>
            </filter>
            <linearGradient id="paint0_linear_422_468" x1="363.5" y1="247" x2="363.5" y2="394" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="#A975FD" class="astro-OQM6QFFU"></stop>
                <stop offset="0.473958" stop-color="#FF21FB" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-color="#FF731B" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_422_468" x1="328" y1="62" x2="436.36" y2="143.881" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint2_linear_422_468" x1="468" y1="178" x2="536.144" y2="229.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint3_linear_422_468" x1="468" y1="178" x2="536.144" y2="229.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint4_linear_422_468" x1="571" y1="259" x2="679.36" y2="340.881" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint5_linear_422_468" x1="492" y1="381" x2="560.144" y2="432.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint6_linear_422_468" x1="283" y1="461" x2="351.144" y2="512.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint7_linear_422_468" x1="141" y1="318" x2="209.144" y2="369.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint8_linear_422_468" x1="236" y1="173" x2="304.144" y2="224.492" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint9_linear_422_468" x1="125" y1="434" x2="233.36" y2="515.881" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint10_linear_422_468" x1="402" y1="474" x2="510.36" y2="555.881" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint11_linear_422_468" x1="88" y1="173" x2="196.36" y2="254.881" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="white" stop-opacity="0.16" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-opacity="0.08" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint12_linear_422_468" x1="347.483" y1="276.533" x2="376.712" y2="356.667" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="#A975FD" class="astro-OQM6QFFU"></stop>
                <stop offset="0.473958" stop-color="#FF21FB" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-color="#FF731B" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <linearGradient id="paint13_linear_422_468" x1="347.483" y1="276.533" x2="376.712" y2="356.667" gradientUnits="userSpaceOnUse" class="astro-OQM6QFFU">
                <stop stop-color="#A975FD" class="astro-OQM6QFFU"></stop>
                <stop offset="0.473958" stop-color="#FF21FB" class="astro-OQM6QFFU"></stop>
                <stop offset="1" stop-color="#FF731B" class="astro-OQM6QFFU"></stop>
            </linearGradient>
            <clipPath id="clip0_422_468" class="astro-OQM6QFFU">
                <rect width="24" height="38" fill="white" transform="translate(160 330)" class="astro-OQM6QFFU"></rect>
            </clipPath>
        </defs>
    </svg>
    <img class="about-neural-image__background astro-OQM6QFFU" src="/_layout-assets/images/about-neural-image-background.png" alt="">
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/AboutNeuralImage.astro");

const $$Astro$9 = createAstro();
const $$AboutNeural = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$AboutNeural;
  const { className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className) + " astro-SVKWS3HV", "id": routes.index.fragments.howCashGenerated }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Section", $$Section, { "className": "about-neural astro-SVKWS3HV" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "zoom-in", "delay": 100, "class": "astro-SVKWS3HV" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "AboutNeuralImage", $$AboutNeuralImage, { "className": "about-neural__poster astro-SVKWS3HV" })}
        ` })}
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-left", "adaptive": [
    {
      maxWidth: variables.smallTablet,
      attrs: { animation: "fade-right" }
    }
  ], "class": "astro-SVKWS3HV" }, { "default": ($$result4) => renderTemplate`
            ${maybeRenderHead()}<div class="about-neural__header astro-SVKWS3HV">
                ${renderComponent($$result4, "Text", $$Text, { "className": "about-neural__subtitle astro-SVKWS3HV", "variant": "h5" }, { "default": ($$result5) => renderTemplate`${t("@landing.@menu.howCashGenerated")}` })}
                ${renderComponent($$result4, "Text", $$Text, { "className": "about-neural__title astro-SVKWS3HV", "variant": "h3" }, { "default": ($$result5) => renderTemplate`
                    ${renderComponent($$result5, "Trans", $$Trans, { "i18nKey": "@landing.@aboutNeural.title", "class": "astro-SVKWS3HV" }, { "default": ($$result6) => renderTemplate`
                        Собственная разработка компании Arbitroom —
                        ${renderComponent($$result6, "Text", $$Text, { "color": "secondary-gradient", "class": "astro-SVKWS3HV" }, { "default": ($$result7) => renderTemplate`
                            нейросеть для крипто арбитража
                        ` })}
                    ` })}
                ` })}
            </div>
        ` })}
        <div class="about-neural__body astro-SVKWS3HV">
            ${renderComponent($$result3, "Text", $$Text, { "className": "about-neural__description astro-SVKWS3HV", "variant": "body1", "color": "text-secondary" }, { "default": ($$result4) => renderTemplate`
                ${renderComponent($$result4, "WithAOS", $$WithAOS, { "animation": "fade-left", "delay": 200, "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: { animation: "fade-right" }
    }
  ], "class": "astro-SVKWS3HV" }, { "default": ($$result5) => renderTemplate`
                    <div class="astro-SVKWS3HV">${t("@landing.@aboutNeural.description1")}</div>
                ` })}
                ${renderComponent($$result4, "WithAOS", $$WithAOS, { "animation": "fade-left", "delay": 250, "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: { animation: "fade-right" }
    }
  ], "class": "astro-SVKWS3HV" }, { "default": ($$result5) => renderTemplate`
                    <div class="astro-SVKWS3HV">${t("@landing.@aboutNeural.description2")}</div>
                ` })}
                ${renderComponent($$result4, "WithAOS", $$WithAOS, { "animation": "fade-left", "delay": 300, "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: { animation: "fade-right" }
    }
  ], "class": "astro-SVKWS3HV" }, { "default": ($$result5) => renderTemplate`
                    <div class="astro-SVKWS3HV">${t("@landing.@aboutNeural.description3")}</div>
                ` })}
            ` })}
        </div>
    ` })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/AboutNeural.astro");

const defaultOptions = {
  baseTime: 200,
  rowsDeltaTime: 50,
  columnsDeltaTime: 100
};
const calculateCellDelay = (index, columnAmount, options = {}) => {
  const {
    baseTime,
    rowsDeltaTime,
    columnsDeltaTime
  } = {
    ...defaultOptions,
    ...options
  };
  return index % columnAmount * columnsDeltaTime + Math.floor(index / columnAmount) * rowsDeltaTime + baseTime;
};

const $$Astro$8 = createAstro();
const $$NeuralAdvantages = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$NeuralAdvantages;
  const { className } = Astro2.props;
  const neuralAdvantageCards = [
    {
      iconSrc: "/_layout-assets/images/card-icons/desktop-pulse.svg",
      label: t("@landing.@neuralAdvantages.scanner"),
      description: t("@landing.@neuralAdvantages.scannerDescription")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/person-available.svg",
      label: t("@landing.@neuralAdvantages.accounts"),
      description: t("@landing.@neuralAdvantages.accountsDescription")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/handshake.svg",
      label: t("@landing.@neuralAdvantages.balance"),
      description: t("@landing.@neuralAdvantages.balanceDescription")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/bot.svg",
      label: t("@landing.@neuralAdvantages.automatation"),
      description: t("@landing.@neuralAdvantages.automatationDescription")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/wallet-outlined.svg",
      label: t("@landing.@neuralAdvantages.income"),
      description: t("@landing.@neuralAdvantages.incomeDescription")
    },
    {
      iconSrc: "/_layout-assets/images/card-icons/data.svg",
      label: t("@landing.@neuralAdvantages.analysis"),
      description: t("@landing.@neuralAdvantages.analysisDescription")
    }
  ];
  const neuralAdvantageCompanies = [
    {
      logoSrc: "/_layout-assets/images/logos/binance.svg",
      name: "Binance",
      subtitle: "exchange / p2p"
    },
    {
      logoSrc: "/_layout-assets/images/logos/mexc-global.png",
      name: "MEXC Global",
      subtitle: "exchange"
    },
    {
      logoSrc: "/_layout-assets/images/logos/1inch.svg",
      name: "1inch",
      subtitle: "DEX agregator"
    },
    {
      logoSrc: "/_layout-assets/images/logos/huobi.svg",
      name: "Huobi",
      subtitle: "exchange"
    },
    {
      logoSrc: "/_layout-assets/images/logos/garantex.png",
      name: "Garantex",
      subtitle: "exchange / p2p"
    },
    {
      logoSrc: "/_layout-assets/images/logos/pancakeswap.svg",
      name: "PancakeSwap",
      subtitle: "BSC DEX"
    },
    {
      logoSrc: "/_layout-assets/images/logos/crypto-com.svg",
      name: "Crypto.com",
      subtitle: "exchange"
    },
    {
      logoSrc: "/_layout-assets/images/logos/1sol.png",
      name: "1Sol",
      subtitle: "Solana DEX agregator"
    },
    {
      logoSrc: "/_layout-assets/images/logos/kucoin.svg",
      name: "Kucoin",
      subtitle: "exchange"
    },
    {
      logoSrc: "/_layout-assets/images/logos/bizlato.png",
      name: "bizlato",
      subtitle: "p2p / telegram bot p2p"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className, "neural-advantages-container") + " astro-ZMK7DSWV", "id": routes.index.fragments.advantagesOfNeuralNetwork }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Section", $$Section, { "className": "neural-advantages astro-ZMK7DSWV" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-ZMK7DSWV" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Text", $$Text, { "className": "neural-advantages__title astro-ZMK7DSWV", "variant": "h2" }, { "default": ($$result5) => renderTemplate`${t("@landing.@neuralAdvantages.title")}` })}
        ` })}
        ${maybeRenderHead()}<div class="neural-advantages__cards astro-ZMK7DSWV">
            ${neuralAdvantageCards.map((data, index) => renderTemplate`${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-up", "delay": calculateCellDelay(index, 3), "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: {
        animation: "fade-up",
        delay: calculateCellDelay(index, 2)
      }
    },
    {
      maxWidth: variables.smallTablet,
      attrs: {
        animation: "fade-right",
        delay: 200
      }
    }
  ], "class": "astro-ZMK7DSWV" }, { "default": ($$result4) => renderTemplate`
                        ${renderComponent($$result4, "Paper", $$Paper, { "className": "neural-advantage-card astro-ZMK7DSWV" }, { "default": ($$result5) => renderTemplate`
                            <div class="neural-advantage-card__icon-wrapper astro-ZMK7DSWV">
                                <img${addAttribute(data.iconSrc, "src")} alt="" class="astro-ZMK7DSWV">
                                <img${addAttribute(data.iconSrc, "src")} alt="" class="astro-ZMK7DSWV">
                            </div>
                            ${renderComponent($$result5, "Text", $$Text, { "className": "neural-advantage-card__title astro-ZMK7DSWV", "variant": "h4" }, { "default": ($$result6) => renderTemplate`
                                <span class="astro-ZMK7DSWV">${data.label}</span>
                                <span class="astro-ZMK7DSWV">${data.label}</span>
                            ` })}
                            ${renderComponent($$result5, "Text", $$Text, { "className": "neural-advantage-card__description astro-ZMK7DSWV", "variant": "body1", "color": "text-secondary" }, { "default": ($$result6) => renderTemplate`${data.description}` })}
                        ` })}
                    ` })}`)}
        </div>
        <div class="neural-advantages__companies astro-ZMK7DSWV">
            ${neuralAdvantageCompanies.map((data, index) => renderTemplate`${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-up", "delay": calculateCellDelay(index, 5), "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: {
        animation: "fade-up",
        delay: calculateCellDelay(index, 4)
      }
    },
    {
      maxWidth: variables.smallTablet,
      attrs: {
        animation: "fade-up",
        delay: calculateCellDelay(index, 3)
      }
    },
    {
      maxWidth: variables.mobile,
      attrs: {
        animation: "fade-right",
        delay: calculateCellDelay(index, 2, {
          rowsDeltaTime: 100,
          columnsDeltaTime: 50
        })
      }
    }
  ], "class": "astro-ZMK7DSWV" }, { "default": ($$result4) => renderTemplate`
                        <div class="neural-advantages__company astro-ZMK7DSWV">
                            ${renderComponent($$result4, "Paper", $$Paper, { "className": "neural-advantages__company-logo-wrapper astro-ZMK7DSWV", "backgroundColor": "background-upper3" }, { "default": ($$result5) => renderTemplate`
                                <img${addAttribute(data.logoSrc, "src")}${addAttribute(data.name, "alt")} class="astro-ZMK7DSWV">
                            ` })}
                            ${renderComponent($$result4, "Text", $$Text, { "className": "neural-advantages__company-name astro-ZMK7DSWV", "variant": "h5" }, { "default": ($$result5) => renderTemplate`${data.name}` })}
                            ${renderComponent($$result4, "Text", $$Text, { "className": "neural-advantages__company-subtitle astro-ZMK7DSWV", "variant": "body1" }, { "default": ($$result5) => renderTemplate`${data.subtitle}` })}
                        </div>
                    ` })}`)}
        </div>
    ` })}
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/NeuralAdvantages.astro");

const $$Astro$7 = createAstro();
const $$Connector = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Connector;
  const { className, classes = {}, lineOptions = {} } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "connector"), "class")}${addAttribute(lineOptions.radius, "data-radius")}${addAttribute(classes.line, "data-line-class")}>
    ${renderSlot($$result, $$slots["default"])}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Connector.astro");

const $$Astro$6 = createAstro();
const $$Guide = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Guide;
  const { className } = Astro2.props;
  const steps = [
    {
      imgSrc: "/_layout-assets/images/guide-steps/sign-up.svg",
      description: t("@landing.@guide.signUp")
    },
    {
      imgSrc: "/_layout-assets/images/guide-steps/replenish.svg",
      description: t("@landing.@guide.replenish")
    },
    {
      imgSrc: "/_layout-assets/images/guide-steps/deposit-funds.svg",
      description: t("@landing.@guide.depositFunds")
    },
    {
      imgSrc: "/_layout-assets/images/guide-steps/get-percents.svg",
      description: t("@landing.@guide.getPercents")
    },
    {
      imgSrc: "/_layout-assets/images/guide-steps/withdraw-funds.svg",
      description: t("@landing.@guide.withdrawFunds")
    }
  ];
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className) + " astro-PUWGRYCF", "id": routes.index.fragments.whatFirst }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Section", $$Section, { "className": "guide astro-PUWGRYCF" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-PUWGRYCF" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Text", $$Text, { "className": "guide__title astro-PUWGRYCF", "variant": "h2" }, { "default": ($$result5) => renderTemplate`${t("@landing.@guide.title")}` })}
        ` })}
        ${renderComponent($$result3, "Connector", $$Connector, { "className": "guide__steps astro-PUWGRYCF", "classes": { line: "guide__line" }, "lineOptions": { radius: 24 } }, { "default": ($$result4) => renderTemplate`${steps.map((data, index) => renderTemplate`${renderComponent($$result4, "WithAOS", $$WithAOS, { "animation": "fade-up", "delay": calculateCellDelay(index, 3), "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: {
        animation: "fade-up",
        delay: calculateCellDelay(index, 2, {
          columnsDeltaTime: 100,
          rowsDeltaTime: 50
        })
      }
    },
    {
      maxWidth: variables.smallTablet,
      attrs: {
        animation: "fade-right",
        delay: 200
      }
    }
  ], "class": "astro-PUWGRYCF" }, { "default": ($$result5) => renderTemplate`
                        ${maybeRenderHead()}<div class="astro-PUWGRYCF">
                            ${renderComponent($$result5, "Paper", $$Paper, { "className": "guide__step astro-PUWGRYCF" }, { "default": ($$result6) => renderTemplate`
                                <div class="guide__step-image-wrapper astro-PUWGRYCF"${addAttribute(`animation-delay: -${index * 0.5}s`, "style")}>
                                    <img${addAttribute(data.imgSrc, "src")} class="astro-PUWGRYCF">
                                </div>
                                ${renderComponent($$result6, "Text", $$Text, { "className": "guide__step-number astro-PUWGRYCF", "variant": "body1", "color": "text-secondary" }, { "default": ($$result7) => renderTemplate`${t("@common.step") + " " + (index + 1)}` })}
                                ${renderComponent($$result6, "Text", $$Text, { "className": "guide__step-description astro-PUWGRYCF", "variant": "h5" }, { "default": ($$result7) => renderTemplate`
                                    <span class="astro-PUWGRYCF">${data.description}</span>
                                    <span class="astro-PUWGRYCF">${data.description}</span>
                                ` })}
                            ` })}
                        </div>
                    ` })}`)}${renderComponent($$result4, "WithAOS", $$WithAOS, { "animation": "fade-up", "delay": calculateCellDelay(steps.length, 3), "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: {
        animation: "fade-up",
        delay: calculateCellDelay(steps.length, 2, {
          columnsDeltaTime: 50,
          rowsDeltaTime: 100
        })
      }
    },
    {
      maxWidth: variables.smallTablet,
      attrs: {
        animation: "fade-right",
        delay: 200
      }
    }
  ], "class": "astro-PUWGRYCF" }, { "default": ($$result5) => renderTemplate`
                ${renderComponent($$result5, "Paper", $$Paper, { "className": "guide__step with-action astro-PUWGRYCF" }, { "default": ($$result6) => renderTemplate`
                    ${renderComponent($$result6, "Button", $$Button, { "class": "astro-PUWGRYCF" }, { "default": ($$result7) => renderTemplate`${t("@common.proceed")}` })}
                ` })}
            ` })}
        ` })}
    ` })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/Guide.astro");

const clampNumber = (value, min, max) => {
  if (max < min)
    throw Error("'max' must be bigger than 'min' in function 'clampNumber'");
  if (value < min)
    return min;
  if (value > max)
    return max;
  return value;
};

const $$Astro$5 = createAstro();
const $$Rating = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Rating;
  const { className, value } = Astro2.props;
  const min = 0;
  const max = 10;
  const fixedValue = Math.round(clampNumber(value, min, max));
  const stars = [];
  for (let i = 2; i <= max; i += 2) {
    if (i <= fixedValue) {
      stars.push("full");
    } else if (i - 1 <= fixedValue) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classNames(className, "rating"), "class")}>
    ${stars.map((star) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${star === "full" && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "iconName": "star", "color": "gradient-primary" })}`}${star === "half" && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "iconName": "star-half", "color": "gradient-primary" })}`}${star === "empty" && renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "iconName": "star-empty", "color": "gradient-primary" })}`}` })}`)}
</div>`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/uiKit/Rating.astro");

const $$Astro$4 = createAstro();
const $$WithDragToScroll = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$WithDragToScroll;
  const html = await Astro2.slots.render("default");
  const dom = parse(html);
  dom.childNodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      node.setAttribute("data-drag-to-scroll", "");
    }
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(dom.toString())}` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/utils/WithDragToScroll.astro");

const $$Astro$3 = createAstro();
const $$Reviews = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Reviews;
  const { className } = Astro2.props;
  const reviews = [
    {
      author: {
        avatar: "/_layout-assets/images/stubs/transparent.png",
        name: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0418\u0432\u0430\u043D\u043E\u0432",
        role: t("@landing.@reviews.arbitroomUser")
      },
      rating: 9,
      text: "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C."
    },
    {
      author: {
        avatar: "/_layout-assets/images/stubs/transparent.png",
        name: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0418\u0432\u0430\u043D\u043E\u0432",
        role: t("@landing.@reviews.arbitroomUser")
      },
      rating: 9,
      text: "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C."
    },
    {
      author: {
        avatar: "/_layout-assets/images/stubs/transparent.png",
        name: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0418\u0432\u0430\u043D\u043E\u0432",
        role: t("@landing.@reviews.arbitroomUser")
      },
      rating: 9,
      text: "\u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0439 \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u043E\u043C \u0441\u0434\u0435\u043B\u043E\u043A, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0442\u043E\u0447\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0435 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B, \u0430 \u0442\u0430\u043A \u0436\u0435 \u043D\u0430 \u043A\u0440\u0438\u043F\u0442\u043E \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0442\u044C."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": classNames(className, "reviews") + " astro-BGWFTENT", "id": routes.index.fragments.clientsAboutUs }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Container", $$Container, { "className": "reviews__header astro-BGWFTENT" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-BGWFTENT" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Text", $$Text, { "className": "reviews__title astro-BGWFTENT", "variant": "h2" }, { "default": ($$result5) => renderTemplate`${t("@landing.@reviews.title")}` })}
        ` })}
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-down", "delay": 200, "adaptive": [
    {
      maxWidth: 650,
      attrs: {
        animation: "fade-right"
      }
    }
  ], "class": "astro-BGWFTENT" }, { "default": ($$result4) => renderTemplate`
            ${maybeRenderHead()}<div${addAttribute("reviews__amount astro-BGWFTENT", "class")}>
                ${renderComponent($$result4, "Text", $$Text, { "className": "reviews__amount-value astro-BGWFTENT", "as": "span", "variant": "h3", "color": "secondary-gradient" }, { "default": ($$result5) => renderTemplate`
                    1280+
                ` })}
                ${renderComponent($$result4, "Text", $$Text, { "className": "reviews__amount-label astro-BGWFTENT", "variant": "body1" }, { "default": ($$result5) => renderTemplate`
                    ${renderComponent($$result5, "Trans", $$Trans, { "i18nKey": "@landing.@reviews.satisfiedClients", "class": "astro-BGWFTENT" }, { "default": ($$result6) => renderTemplate`
                        Довольных<br class="astro-BGWFTENT"> клиентов
                    ` })}
                ` })}
            </div>
        ` })}
    ` })}

    ${renderComponent($$result2, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": 250, "class": "astro-BGWFTENT" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithDragToScroll", $$WithDragToScroll, { "class": "astro-BGWFTENT" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Container", $$Container, { "className": "reviews__cards astro-BGWFTENT" }, { "default": ($$result5) => renderTemplate`${reviews.map((data) => renderTemplate`${renderComponent($$result5, "Paper", $$Paper, { "className": "reviews__card astro-BGWFTENT", "variant": "flat" }, { "default": ($$result6) => renderTemplate`
                            <div class="reviews__card-author astro-BGWFTENT">
                                <div class="reviews__card-avatar-wrapper astro-BGWFTENT">
                                    <img${addAttribute(data.author.avatar, "src")} alt="" class="astro-BGWFTENT">
                                </div>
                                <div class="reviews__card-name-role astro-BGWFTENT">
                                    ${renderComponent($$result6, "Text", $$Text, { "className": "reviews__card-name astro-BGWFTENT", "variant": "h5" }, { "default": ($$result7) => renderTemplate`${data.author.name}` })}
                                    ${renderComponent($$result6, "Text", $$Text, { "className": "reviews__card-role astro-BGWFTENT", "variant": "body1" }, { "default": ($$result7) => renderTemplate`${data.author.role}` })}
                                </div>
                            </div>
                            ${renderComponent($$result6, "Rating", $$Rating, { "className": "reviews__card-rating astro-BGWFTENT", "value": data.rating })}
                            ${renderComponent($$result6, "Text", $$Text, { "className": "reviews__card-text astro-BGWFTENT", "variant": "body1" }, { "default": ($$result7) => renderTemplate`${data.text}` })}
                        ` })}`)}` })}
        ` })}
    ` })}
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/Reviews.astro");

const $$Astro$2 = createAstro();
const $$CollapseCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CollapseCard;
  const { className, title, PaperProps } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Paper", $$Paper, { "className": classNames(className, "collapse-card") + " astro-6BD6K35E", ...PaperProps }, { "default": ($$result2) => renderTemplate`
    ${maybeRenderHead()}<div class="collapse-card__header astro-6BD6K35E">
        ${renderComponent($$result2, "Text", $$Text, { "className": "collapse-card__title astro-6BD6K35E", "variant": "h5" }, { "default": ($$result3) => renderTemplate`${title}` })}
        <div class="collapse-card__expand-btn astro-6BD6K35E">
            <div class="collapse-card__plus-minus-icon astro-6BD6K35E">
                <div class="dash astro-6BD6K35E"></div>
                <div class="dash astro-6BD6K35E"></div>
            </div>
        </div>
    </div>
    <div class="collapse-card__content-wrapper astro-6BD6K35E">
        ${renderComponent($$result2, "Text", $$Text, { "className": "collapse-card__content astro-6BD6K35E", "variant": "body1" }, { "default": ($$result3) => renderTemplate`
            ${renderSlot($$result3, $$slots["default"])}
        ` })}
    </div>
` })}

`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/CollapseCard.astro");

const $$Astro$1 = createAstro();
const $$FAQ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FAQ;
  const { className } = Astro2.props;
  const questions = [
    {
      question: "\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 Arbitroom?",
      answer: "Arbitroom.io - \u044D\u0442\u043E \u044D\u0442\u043E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430 \u0430\u0440\u0431\u0438\u0442\u0440\u0430\u0436\u0430 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442."
    },
    {
      question: "\u041A\u0430\u043A\u0438\u0435 \u0432\u0438\u0434\u044B \u0430\u0440\u0431\u0438\u0442\u0440\u0430\u0436\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 Arbitroom?",
      answer: "\u0412 \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u0435 \u0441\u043B\u0443\u0447\u0430\u0435\u0432 Arbitroom \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043C\u0435\u0436\u0431\u0438\u0440\u0436\u0435\u0432\u043E\u0439 \u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u0431\u0438\u0440\u0436\u0435\u0432\u043E\u0439 \u0430\u0440\u0431\u0438\u0442\u0440\u0430\u0436."
    },
    {
      question: "\u041A\u043E\u0433\u0434\u0430 \u0432\u044B \u043D\u0430\u0447\u0430\u043B\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C?",
      answer: "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441 2021 \u0433\u043E\u0434\u0430"
    },
    {
      question: "\u0427\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0434\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u044B?",
      answer: "\u0414\u043B\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0432\u0430\u043C \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438 \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u0430\u0439\u0442\u043E\u043C, \u043F\u043E\u0441\u043B\u0435 \u0447\u0435\u0433\u043E \u043F\u0440\u043E\u0439\u0442\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044E \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435."
    },
    {
      question: "\u0427\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0434\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438?",
      answer: "\u0414\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0432\u0430\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0430\u0431\u043E\u0447\u0430\u044F \u043F\u043E\u0447\u0442\u0430 \u0438 \u043D\u0430\u0434\u0435\u0436\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C."
    },
    {
      question: "\u041D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0435 Arbitroom?",
      answer: "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E \u0432 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u043D\u0443\u044E \u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0443, \u0432\u0441\u0435\u0433\u0434\u0430 \u0441\u0432\u044F\u0437\u0430\u043D\u043E \u0441 \u0431\u043E\u043B\u044C\u0448\u0438\u043C\u0438 \u0440\u0438\u0441\u043A\u0430\u043C\u0438, \u043D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043C\u0438\u043D\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u0440\u0438\u0441\u043A\u0438 \u0437\u0430 \u0441\u0447\u0435\u0442 \u0431\u044B\u0441\u0442\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u043E\u043A \u0432 \u0430\u0440\u0431\u0438\u0442\u0440\u0430\u0436\u043D\u044B\u0445 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u044F\u0445. \u041E\u0431\u043E\u0440\u043E\u0442\u043D\u0430\u044F \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u044C \u0432\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u0434 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C \u0438 \u043D\u0435 \u0437\u0430\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0431\u0438\u0440\u0436\u0430\u0445 \u0434\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u044D\u0442\u043E\u0433\u043E \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0430\u044F \u0441\u0434\u0435\u043B\u043A\u0430."
    },
    {
      question: "\u041A\u0430\u043A\u0438\u0435 \u0440\u0438\u0441\u043A\u0438 \u043F\u043E\u0442\u0435\u0440\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432?",
      answer: "\u0412\u044B \u0440\u0438\u0441\u043A\u0443\u0435\u0442\u0435 \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0442\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435, \u0435\u0441\u043B\u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043D\u0435\u0442 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u0435\u0435 \u043D\u0435\u043B\u044C\u0437\u044F \u0431\u0443\u0434\u0435\u0442 \u043E\u0431\u043D\u0430\u043B\u0438\u0447\u0438\u0432\u0430\u0442\u044C."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Container", $$Container, { "className": classNames(className) + " astro-AL2CA2VR" }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Section", $$Section, { "className": "faq astro-AL2CA2VR" }, { "default": ($$result3) => renderTemplate`
        ${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "class": "astro-AL2CA2VR" }, { "default": ($$result4) => renderTemplate`
            ${renderComponent($$result4, "Text", $$Text, { "className": "faq__title astro-AL2CA2VR", "variant": "h2" }, { "default": ($$result5) => renderTemplate`${t("@landing.@faq.title")}` })}
        ` })}
        ${maybeRenderHead()}<div class="faq__cards astro-AL2CA2VR">
            ${questions.map(({ question, answer }, index) => renderTemplate`${renderComponent($$result3, "WithAOS", $$WithAOS, { "animation": "fade-right", "delay": index * 50 + 200, "adaptive": [
    {
      maxWidth: variables.tablet,
      attrs: {
        animation: "fade-right",
        delay: 200
      }
    }
  ], "class": "astro-AL2CA2VR" }, { "default": ($$result4) => renderTemplate`
                        ${renderComponent($$result4, "CollapseCard", $$CollapseCard, { "title": question, "class": "astro-AL2CA2VR" }, { "default": ($$result5) => renderTemplate`${answer}` })}
                    ` })}`)}
        </div>
    ` })}
` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/components/FAQ.astro");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const menuItems = [
    {
      id: "howCashGenerated",
      href: routes.index.pathWithFragment("howCashGenerated"),
      label: t("@landing.@menu.howCashGenerated")
    },
    {
      id: "advantagesOfNeuralNetwork",
      href: routes.index.pathWithFragment("advantagesOfNeuralNetwork"),
      label: t("@landing.@menu.advantagesOfNeuralNetwork")
    },
    {
      id: "whatFirst",
      href: routes.index.pathWithFragment("whatFirst"),
      label: t("@landing.@menu.whatFirst")
    },
    {
      id: "clientsAboutUs",
      href: routes.index.pathWithFragment("clientsAboutUs"),
      label: t("@landing.@menu.clientsAboutUs")
    }
  ];
  return renderTemplate`${renderComponent($$result, "LandingLayout", $$LandingLayout, { "title": "Arbitroom", "menuItems": menuItems, "menuActionButton": {
    href: "/login",
    label: t("@common.signup")
  } }, { "default": ($$result2) => renderTemplate`
    
    ${renderComponent($$result2, "Profits", $$Profits, {})}
    ${renderComponent($$result2, "AboutNeural", $$AboutNeural, {})}
    ${renderComponent($$result2, "NeuralAdvantages", $$NeuralAdvantages, {})}
    ${renderComponent($$result2, "Guide", $$Guide, {})}
    ${renderComponent($$result2, "Reviews", $$Reviews, {})}
    ${renderComponent($$result2, "FAQ", $$FAQ, {})}
`, "welcome": ($$result2) => renderTemplate`${renderComponent($$result2, "Welcome", $$Welcome, { "slot": "welcome" })}` })}`;
}, "C:/My files/Side job/Spectra/arbitroom-landing/src/pages/index.astro");

const $$file = "C:/My files/Side job/Spectra/arbitroom-landing/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
