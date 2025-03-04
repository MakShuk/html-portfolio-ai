// Global variables from external libraries
declare const gsap: any;
declare const AOS: any;
declare const bootstrap: any;
declare const Typed: any;

// Functions declared in various JS files
declare function initNavbar(): void;
declare function initTypedText(): void;
declare function initPortfolioFilter(): void;
declare function initSkillsProgress(): void;
declare function initFormValidation(): void;
/**
 * Initializes animations that are triggered by scrolling on the webpage.
 * Инициализирует анимации, которые активируются при прокрутке страницы.
 * 
 * @returns {void} No return value
 * 
 * @remarks
 * This declaration file (globals.d.ts) contains global type definitions
 * for functions that are implemented elsewhere in the project.
 * It allows TypeScript to recognize these functions when they're called
 * without requiring explicit imports.
 * 
 * Этот файл объявлений (globals.d.ts) содержит глобальные определения типов
 * для функций, которые реализованы в других частях проекта.
 * Он позволяет TypeScript распознавать эти функции при их вызове
 * без необходимости явного импорта.
 */
declare function initScrollAnimations(): void;
declare function initParallax(): void;
declare function initHoverEffects(): void;
declare function openProjectModal(): void;