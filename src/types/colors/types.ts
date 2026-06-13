export const ColorTypeObject = {
    SUCCESS: 'success',
    NEUTRAL: 'neutral',
    DANGER: 'danger',
    WARNING: 'warning',
} as const;

export type ColorType = typeof ColorTypeObject[keyof typeof ColorTypeObject];