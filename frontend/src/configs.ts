// toggle this to switch between production and development
export const DEVELOPMENT_VIEW = false;
// toggle this to enable/disable console logging
const CONSOLE_LOGGING = true;

const originalConsoleLog = console.log;
console.log = (...data: any[]) => {
  CONSOLE_LOGGING && originalConsoleLog(...data);
};
