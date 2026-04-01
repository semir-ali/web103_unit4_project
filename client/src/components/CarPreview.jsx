const COLOR_HEX = {
    Red: '#e53e3e',
    Blue: '#3182ce',
    Black: '#1a1a1a',
    White: '#f0f0f0',
    Silver: '#a0aec0',
    Yellow: '#ecc94b',
    Orange: '#ed8936',
    'Matte Black': '#2d3748',
    'Pearl White': '#e8eef4'
}

const WHEEL_RIM = {
    Standard:  '#aaaaaa',
    Sport:     '#3d3d4d',
    'Off-Road':'#8B6914',
    Luxury:    '#d4af37'
}

const CarPreview = ({ color, wheels, interior }) => {
    const body  = COLOR_HEX[color]    || '#888888'
    const rim   = WHEEL_RIM[wheels]   || '#aaaaaa'
    const glass = interior === 'Carbon Fiber' ? '#2a3a4a' : '#a8d8f0'

    return (
        <svg viewBox="0 0 520 200" width="100%" style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))' }}>
            {/* Car body */}
            <rect x="30" y="100" width="460" height="65" rx="8" fill={body} />
            {/* Roof */}
            <path d="M 115 100 L 162 48 L 358 48 L 398 100 Z" fill={body} />
            {/* Rear window */}
            <path d="M 120 98 L 164 54 L 248 54 L 248 98 Z" fill={glass} opacity="0.85" />
            {/* Front window */}
            <path d="M 272 98 L 272 54 L 354 54 L 394 98 Z" fill={glass} opacity="0.85" />
            {/* B-pillar */}
            <rect x="254" y="50" width="14" height="48" fill={body} />
            {/* Door line */}
            <line x1="261" y1="102" x2="261" y2="163" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
            {/* Rocker panel */}
            <rect x="75" y="160" width="370" height="8" rx="3" fill="rgba(0,0,0,0.22)" />
            {/* Headlight */}
            <rect x="478" y="115" width="14" height="18" rx="4" fill="#ffe566" />
            {/* Taillight */}
            <rect x="28" y="115" width="14" height="18" rx="4" fill="#ff3333" />
            {/* Front wheel */}
            <circle cx="388" cy="170" r="36" fill="#111" />
            <circle cx="388" cy="170" r="24" fill={rim} />
            <circle cx="388" cy="170" r="9"  fill="#2a2a2a" />
            {/* Rear wheel */}
            <circle cx="132" cy="170" r="36" fill="#111" />
            <circle cx="132" cy="170" r="24" fill={rim} />
            <circle cx="132" cy="170" r="9"  fill="#2a2a2a" />
            {/* Ground shadow */}
            <ellipse cx="260" cy="208" rx="195" ry="7" fill="rgba(0,0,0,0.2)" />
        </svg>
    )
}

export default CarPreview
