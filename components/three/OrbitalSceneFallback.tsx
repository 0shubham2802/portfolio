interface OrbitalSceneFallbackProps {
  className?: string;
}

/**
 * Static SVG of the Chronos distributed-system composition: a central scheduler
 * dispatching jobs to orbiting workers. Server-rendered placeholder for the
 * WebGL scene; also the mobile / prefers-reduced-motion fallback.
 */
export function OrbitalSceneFallback({ className }: OrbitalSceneFallbackProps) {
  return (
    <svg
      viewBox="0 0 260 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Distributed system diagram: a central Chronos scheduler dispatching jobs to four orbiting worker nodes."
    >
      <g fill="none" stroke="#32415D" strokeWidth="0.6">
        <ellipse cx="130" cy="125" rx="115" ry="34" />
        <ellipse cx="130" cy="125" rx="82" ry="24" />
        <ellipse cx="130" cy="125" rx="50" ry="14" />
      </g>
      <g stroke="#3D7BFF" strokeWidth="0.6" fill="none">
        <line
          className="fb-line"
          x1="130"
          y1="118"
          x2="26"
          y2="123"
          opacity="0.4"
          style={{ animationDelay: "0s" }}
        />
        <line
          className="fb-line"
          x1="130"
          y1="118"
          x2="234"
          y2="123"
          opacity="0.4"
          style={{ animationDelay: "1s" }}
        />
        <line
          className="fb-line"
          x1="130"
          y1="118"
          x2="66"
          y2="156"
          opacity="0.4"
          style={{ animationDelay: "2s" }}
        />
        <line
          className="fb-line"
          x1="130"
          y1="118"
          x2="194"
          y2="156"
          opacity="0.4"
          style={{ animationDelay: "3s" }}
        />
      </g>
      <rect
        x="18"
        y="115"
        width="16"
        height="16"
        rx="2"
        fill="#13161F"
        stroke="#3D7BFF"
        strokeWidth="0.6"
      />
      <rect
        x="226"
        y="115"
        width="16"
        height="16"
        rx="2"
        fill="#13161F"
        stroke="#3D7BFF"
        strokeWidth="0.6"
      />
      <rect
        x="58"
        y="148"
        width="16"
        height="16"
        rx="2"
        fill="#13161F"
        stroke="#3D7BFF"
        strokeWidth="0.6"
      />
      <rect
        x="186"
        y="148"
        width="16"
        height="16"
        rx="2"
        fill="#13161F"
        stroke="#3D7BFF"
        strokeWidth="0.6"
      />
      <rect x="106" y="98" width="48" height="48" rx="3" fill="#3D7BFF" />
      <text
        x="130"
        y="123"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        fill="#0A0C14"
        fontWeight="500"
      >
        CHRONOS
      </text>
      <text
        x="130"
        y="135"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill="#0A0C14"
        opacity="0.75"
      >
        scheduler
      </text>
    </svg>
  );
}

export default OrbitalSceneFallback;
