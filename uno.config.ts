import { defineConfig, presetUno, presetAttributify } from 'unocss';
import { presetShadcn } from 'unocss-preset-shadcn';
import presetAnimations from 'unocss-preset-animations';

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetShadcn({
            color: 'zinc',
        }),
        presetAnimations(),
    ],
});
