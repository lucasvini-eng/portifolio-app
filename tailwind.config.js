tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        accent: 'var(--color-accent)',
                        'accent-hover': 'var(--color-accent-hover)',
                        dark: 'var(--color-dark)',
                        darker: 'var(--color-darker)',
                        card: 'var(--color-card)',
                        'card-hover': 'var(--color-card-hover)',
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                }
            }
        }