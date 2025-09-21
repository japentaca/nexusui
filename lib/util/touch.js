'use strict';

export const exists = ('ontouchstart' in document.documentElement);

// Export default para compatibilidad
export default {
  exists
};
