import React from 'react';

export const FestivalSkyline: React.FC = () => {
  return (
    <div
      id="festival-skyline"
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none overflow-hidden"
      style={{
        height: '46vh',
        minHeight: '340px',
        maxHeight: '520px',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2400 420"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>

          {/* =====================================================
              HORIZON ATMOSPHERE
          ===================================================== */}

          <radialGradient
            id="skylineHorizonGlow"
            cx="50%"
            cy="100%"
            r="80%"
          >
            <stop offset="0%" stopColor="#F6B45B" stopOpacity="0.48" />
            <stop offset="28%" stopColor="#D98245" stopOpacity="0.30" />
            <stop offset="55%" stopColor="#77433A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#142746" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="skylineDistantArch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#294263" />
            <stop offset="100%" stopColor="#101F38" />
          </linearGradient>

          <linearGradient id="skylineMidArch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A3420" />
            <stop offset="100%" stopColor="#1C130A" />
          </linearGradient>

          <linearGradient id="skylineForeArch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2015" />
            <stop offset="50%" stopColor="#1B140D" />
            <stop offset="100%" stopColor="#0E0A06" />
          </linearGradient>

          <linearGradient id="gopuramTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A2A17" />
            <stop offset="55%" stopColor="#241809" />
            <stop offset="100%" stopColor="#140C04" />
          </linearGradient>

          <linearGradient id="gopuramLedge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B97A2E" />
            <stop offset="100%" stopColor="#5E3E14" />
          </linearGradient>

          <radialGradient id="skylineWindowGlow">
            <stop offset="0%" stopColor="#FFF4CF" stopOpacity="1" />
            <stop offset="30%" stopColor="#F7D17F" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#E7A24C" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#E7A24C" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="skylineLightDot">
            <stop offset="0%" stopColor="#FFECC0" stopOpacity="1" />
            <stop offset="100%" stopColor="#E7A24C" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bottomWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#102540" />
            <stop offset="45%" stopColor="#08172C" />
            <stop offset="100%" stopColor="#030A15" />
          </linearGradient>

          <filter id="skylineCloudBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          {/* Reusable small temple dome / chhatri with a real base */}
          <g id="smallDome">
            <rect x="-23" y="0" width="46" height="6" rx="1" />
            <rect x="-19" y="-5" width="38" height="5" rx="1" />
            <rect x="-15" y="-29" width="5" height="24" />
            <rect x="-2.5" y="-29" width="5" height="24" />
            <rect x="10" y="-29" width="5" height="24" />
            <path d="M-20 -29 C-19 -44 -10 -54 0 -62 C10 -54 19 -44 20 -29 Z" />
            <path d="M-3 -62 L0 -70 L3 -62 Z" />
            <circle cx="0" cy="-73" r="2" />
          </g>

          {/* Reusable arch */}
          <g id="bottomArch">
            <path d="M-24 65 L-24 22 C-24 4 -13 -8 0 -8 C13 -8 24 4 24 22 L24 65 Z" />
          </g>

          {/* Reusable gopuram corner finial (kalasha) */}
          <g id="tierFinial">
            <path d="M-2.5 0 L0 -9 L2.5 0 Z" />
            <circle cx="0" cy="-11" r="2.4" />
          </g>

        </defs>

        {/* HORIZON GLOW (SPANS FULL WIDTH) */}
        <rect x="0" y="50" width="2400" height="370" fill="url(#skylineHorizonGlow)" />

        {/* SOFT DISTANT CLOUDS */}
        <g filter="url(#skylineCloudBlur)" opacity="0.8">
          <ellipse cx="280" cy="225" rx="280" ry="30" fill="#53637E" opacity="0.28" />
          <ellipse cx="680" cy="240" rx="300" ry="26" fill="#E99A5B" opacity="0.22" />
          <ellipse cx="1200" cy="215" rx="340" ry="30" fill="#63708A" opacity="0.25" />
          <ellipse cx="1720" cy="235" rx="300" ry="28" fill="#E99A5B" opacity="0.20" />
          <ellipse cx="2120" cy="220" rx="280" ry="30" fill="#53637E" opacity="0.25" />
        </g>

        {/* EXTENDED BACKGROUND SILHOUETTE FLANKS */}
        <g fill="url(#skylineDistantArch)" opacity="0.65">
          {/* Far Left Flank */}
          <path d="M0 325 L0 250 L40 250 L40 230 L65 212 L90 230 L90 250 L130 250 L130 238 L165 238 L165 255 L205 255 L205 225 L230 208 L255 225 L255 255 L295 255 L295 238 L330 238 L330 250 L370 250 L395 230 L420 212 L445 230 L445 325 Z" />
          <use href="#smallDome" transform="translate(190 284) scale(0.75)" />
          <use href="#smallDome" transform="translate(320 288) scale(0.65)" />

          {/* Far Right Flank */}
          <path d="M1955 325 L1955 230 L1980 212 L2005 230 L2030 250 L2070 250 L2070 238 L2105 238 L2105 255 L2145 255 L2145 225 L2170 208 L2195 225 L2195 255 L2235 255 L2235 238 L2270 238 L2270 250 L2310 250 L2335 230 L2360 212 L2400 230 L2400 325 Z" />
          <use href="#smallDome" transform="translate(2080 288) scale(0.65)" />
          <use href="#smallDome" transform="translate(2210 284) scale(0.75)" />
        </g>

        {/* MAIN ARCHITECTURE GROUP CENTERED AT X=1200 (OFFSET +400) */}
        <g transform="translate(400, 30)">

          {/* FAR DISTANT CITY */}
          <g fill="url(#skylineDistantArch)" opacity="0.65">
            <path d="M0 325 L0 265 L45 265 L45 248 L70 248 L70 262 L100 262 L100 235 L122 215 L144 235 L144 262 L175 262 L175 244 L205 244 L205 260 L240 260 L240 230 L260 212 L280 230 L280 260 L320 260 L320 240 L350 240 L350 325 Z" />
            <path d="M1250 325 L1250 250 L1280 250 L1280 230 L1300 212 L1320 230 L1320 250 L1350 250 L1350 238 L1380 238 L1380 255 L1415 255 L1415 225 L1435 208 L1455 225 L1455 255 L1490 255 L1490 238 L1520 238 L1520 255 L1550 255 L1550 230 L1575 212 L1600 230 L1600 325 Z" />
            <use href="#smallDome" transform="translate(390 284) scale(0.78)" />
            <use href="#smallDome" transform="translate(460 288) scale(0.62)" />
            <use href="#smallDome" transform="translate(1140 286) scale(0.68)" />
            <use href="#smallDome" transform="translate(1200 284) scale(0.82)" />
          </g>

          {/* MIDGROUND / CONTINUOUS SIDE ARCHITECTURE */}
          <g fill="url(#skylineMidArch)">
            {/* FAR LEFT FILL */}
            <path d="M270 325 L270 290 L282 290 L282 272 L294 272 L294 258 L306 258 L306 272 L318 272 L318 290 L330 290 L330 325 Z" />
            <path d="M280 258 C283 242 292 230 300 222 C308 230 317 242 320 258 Z" />
            <circle cx="300" cy="218" r="2" fill="#E7A24C" />
            <rect x="235" y="300" width="35" height="25" />
            <path d="M237 300 C239 291 246 285 252 280 C258 285 265 291 267 300 Z" />
            <rect x="330" y="295" width="38" height="30" />
            <path d="M335 295 C338 285 345 278 351 272 C357 278 364 285 367 295 Z" />

            {/* LEFT INNER FILL */}
            <path d="M465 325 L465 295 L478 295 L478 275 L492 275 L492 260 L506 260 L506 275 L520 275 L520 295 L535 295 L535 325 Z" />
            <path d="M475 260 C478 246 487 234 497 225 C507 234 516 246 519 260 Z" />
            <circle cx="497" cy="221" r="2.2" fill="#E7A24C" />
            <rect x="510" y="302" width="45" height="23" />
            <rect x="535" y="285" width="30" height="40" />
            <path d="M535 285 L550 268 L565 285 Z" />
            <circle cx="550" cy="264" r="2" fill="#E7A24C" />

            {/* RIGHT INNER FILL */}
            <path d="M1035 325 L1035 295 L1050 295 L1050 275 L1064 275 L1064 260 L1078 260 L1078 275 L1092 275 L1092 295 L1105 295 L1105 325 Z" />
            <path d="M1045 260 C1048 246 1057 234 1067 225 C1077 234 1086 246 1089 260 Z" />
            <circle cx="1067" cy="221" r="2.2" fill="#E7A24C" />
            <rect x="1095" y="300" width="42" height="25" />
            <rect x="1130" y="285" width="35" height="40" />
            <path d="M1130 285 L1147 268 L1165 285 Z" />
            <circle cx="1147" cy="264" r="2" fill="#E7A24C" />

            {/* FAR RIGHT FILL */}
            <path d="M1165 325 L1165 290 L1177 290 L1177 272 L1189 272 L1189 258 L1201 258 L1201 272 L1213 272 L1213 290 L1225 290 L1225 325 Z" />
            <path d="M1175 258 C1178 243 1186 232 1195 224 C1204 232 1212 243 1215 258 Z" />
            <circle cx="1195" cy="220" r="2" fill="#E7A24C" />
            <rect x="1220" y="300" width="45" height="25" />
            <path d="M1222 300 C1224 290 1233 283 1242 277 C1251 283 1260 290 1262 300 Z" />
            <rect x="1260" y="290" width="35" height="35" />
            <path d="M1260 290 C1263 280 1271 271 1278 264 C1285 271 1293 280 1296 290 Z" />
            <circle cx="1278" cy="260" r="2" fill="#E7A24C" />
          </g>

          {/* SMALL WINDOWS / LIGHTS FOR FILL BUILDINGS */}
          <g fill="url(#skylineWindowGlow)">
            <rect x="286" y="285" width="5" height="9" rx="2" />
            <rect x="310" y="285" width="5" height="9" rx="2" />
            <rect x="340" y="302" width="5" height="9" rx="2" />
            <rect x="356" y="302" width="5" height="9" rx="2" />
            <rect x="483" y="290" width="5" height="9" rx="2" />
            <rect x="507" y="290" width="5" height="9" rx="2" />
            <rect x="542" y="300" width="5" height="9" rx="2" />
            <rect x="1053" y="290" width="5" height="9" rx="2" />
            <rect x="1077" y="290" width="5" height="9" rx="2" />
            <rect x="1138" y="300" width="5" height="9" rx="2" />
            <rect x="1183" y="285" width="5" height="9" rx="2" />
            <rect x="1207" y="285" width="5" height="9" rx="2" />
            <rect x="1270" y="300" width="5" height="9" rx="2" />
          </g>

          {/* RIGHT MINARET */}
          <g fill="url(#skylineForeArch)">
            <rect x="1282" y="195" width="18" height="145" />
            <rect x="1273" y="225" width="36" height="7" />
            <rect x="1273" y="260" width="36" height="7" />
            <path d="M1268 195 L1291 160 L1314 195 Z" />
            <circle cx="1291" cy="154" r="3" fill="#E7A24C" />
          </g>

          {/* =====================================================
              CENTRAL SOUTH INDIAN GOPURAM (LARGE, GRAND & ICONIC)
              Centered at 800 (+400 offset = 1200)
              Scale: 1.75 | Height: 348px | Base at Y=375 | Top at Y=27
          ===================================================== */}
          <g transform="translate(800 375)">
            {/* Ambient sanctuary golden aura behind the central tower */}
            <ellipse
              cx="0"
              cy="-175"
              rx="140"
              ry="170"
              fill="url(#skylineWindowGlow)"
              opacity="0.34"
            />

            {/* Scaled Gopuram with integrated lighting layers */}
            <g transform="scale(1.75) translate(-100 -200)">
              {/* Gopuram Silhouette Architecture */}
              <path
                fill="url(#gopuramTier)"
                d="m64.865 9.459 1.351 5.405 -1.351 5.405 4.054 -1.351 2.703 2.703v2.703l-4.054 4.054 -1.351 -1.351v2.703l-5.405 5.405 1.351 2.703 -2.703 1.351 1.351 1.351 -1.351 2.703 1.351 5.405 5.405 9.459 -2.703 2.703 -2.703 -2.703v-2.703l-2.703 9.459 6.757 1.351 -5.405 4.054 1.351 5.405 -6.757 5.405 1.351 6.757 -6.757 6.757 1.351 4.054 -1.351 2.703 1.351 1.351 -8.108 8.108 1.351 4.054 -1.351 2.703 2.703 2.703 -5.405 1.351 -1.351 4.054 -2.703 1.351 2.703 8.108 -4.054 1.351 -6.757 6.757 -1.351 5.405 2.703 1.351 1.351 4.054 -2.703 1.351 4.054 4.054 -1.351 1.351H22.973v4.054l-10.811 6.757 6.757 1.351 1.351 2.703 4.054 1.351 -4.054 4.054 4.054 2.703 -1.351 2.703 1.351 1.351v10.811h58.108v-21.622l1.351 -1.351h31.081l1.351 1.351v21.622h58.108v-10.811l1.351 -1.351 -1.351 -2.703 4.054 -1.351 -4.054 -5.405 4.054 -1.351 1.351 -2.703 6.757 -1.351 -9.459 -5.405 -1.351 -5.405h-6.757l-1.351 -1.351 4.054 -4.054 -2.703 -1.351 1.351 -4.054 2.703 -1.351 -1.351 -5.405 -6.757 -6.757 -4.054 -1.351 2.703 -8.108 -2.703 -1.351 -1.351 -4.054 -5.405 -1.351 2.703 -2.703 -1.351 -1.351 1.351 -5.405 -4.054 -5.405 -4.054 -1.351 1.351 -9.459 -6.757 -6.757 1.351 -6.757 -6.757 -5.405 1.351 -5.405 -4.054 -4.054 5.405 -1.351 -1.351 -1.351v-6.757l-1.351 -1.351 -1.351 5.405 -4.054 -2.703 6.757 -13.514 -2.703 -6.757 1.351 -2.703 -2.703 -1.351 -2.703 -6.757 -1.351 1.351 -4.054 -4.054v-2.703l4.054 -4.054 2.703 2.703 -1.351 -1.351 1.351 -9.459 -9.459 6.757 -1.351 4.054 1.351 8.108 -1.351 1.351 -5.405 -2.703 1.351 -2.703 -1.351 -2.703 -2.703 2.703 1.351 1.351 -1.351 2.703 -5.405 -1.351 1.351 -5.405 -2.703 2.703 1.351 2.703 -1.351 1.351 -4.054 -1.351 1.351 -4.054L100 18.919l2.703 -2.703V13.514L100 10.811V4.054l-1.351 -1.351L100 1.351h-1.351v9.459l-2.703 2.703v2.703l2.703 2.703 -5.405 4.054 1.351 2.703 -1.351 2.703 -4.054 -1.351 1.351 -2.703 -1.351 -2.703 -2.703 2.703 2.703 2.703 -6.757 1.351 -1.351 -1.351 1.351 -5.405h-1.351l-1.351 2.703 1.351 2.703 -5.405 2.703 -1.351 -1.351 1.351 -4.054 -1.351 -8.108Z"
              />

              {/* Central illuminated shrine windows */}
              <g>
                <rect x="96" y="48" width="8" height="13" rx="0.8" fill="#153454" />
                <rect x="94" y="70" width="12" height="16" rx="0.8" fill="#173B60" />
                <rect x="91" y="96" width="18" height="19" rx="1" fill="#29445F" />
                <rect x="88" y="126" width="24" height="22" rx="1" fill="#3B4252" />
                <rect x="88" y="126" width="24" height="22" rx="1" fill="url(#skylineWindowGlow)" opacity="0.16" />
              </g>

              {/* Top Crown Kalasham Glowing Finials */}
              <g fill="#FFEAA0">
                <circle cx="100" cy="1.35" r="1.8" fill="#FFF4CF" />
                <circle cx="98.6" cy="10.8" r="1.2" />
                <circle cx="101.4" cy="10.8" r="1.2" />
                <circle cx="65.5" cy="9.5" r="1.3" />
                <circle cx="134.5" cy="9.5" r="1.3" />
                <circle cx="73" cy="9.5" r="1.0" />
                <circle cx="127" cy="9.5" r="1.0" />
              </g>

              {/* Stepped Tier Ledge Diya Lights */}
              <g fill="url(#skylineLightDot)">
                <circle cx="65" cy="25" r="1.2" />
                <circle cx="134" cy="25" r="1.2" />
                <circle cx="60" cy="45" r="1.3" />
                <circle cx="139" cy="45" r="1.3" />
                <circle cx="58" cy="65" r="1.4" />
                <circle cx="140.5" cy="65" r="1.4" />
                <circle cx="54" cy="85" r="1.5" />
                <circle cx="144.5" cy="85" r="1.5" />
                <circle cx="42" cy="105" r="1.6" />
                <circle cx="157" cy="105" r="1.6" />
                <circle cx="35" cy="125" r="1.7" />
                <circle cx="163.5" cy="125" r="1.7" />
                <circle cx="25.5" cy="145" r="1.8" />
                <circle cx="173" cy="145" r="1.8" />
                <circle cx="13" cy="165" r="1.9" />
                <circle cx="185.5" cy="165" r="1.9" />
                <circle cx="20" cy="185" r="2.0" />
                <circle cx="178.5" cy="185" r="2.0" />
              </g>
            </g>
          </g>

          {/* GOPURAM SIDE ORNAMENTAL LIGHTS */}
          <g fill="url(#skylineWindowGlow)">
            <circle cx="610" cy="306" r="3" />
            <circle cx="650" cy="306" r="3" />
            <circle cx="690" cy="306" r="3" />
            <circle cx="910" cy="306" r="3" />
            <circle cx="950" cy="306" r="3" />
            <circle cx="990" cy="306" r="3" />
            <circle cx="670" cy="272" r="2.5" />
            <circle cx="930" cy="272" r="2.5" />
          </g>


          {/* =====================================================
              EXPANDED SIDE FILL — keeps the central GOPURAM height
              unchanged while restoring a fuller continuous temple
              skyline around it.
          ===================================================== */}
          <g>
            {/* BACK ROW — soft, distant temple blocks */}
            <g fill="url(#skylineDistantArch)" opacity="0.72">
              <path d="M20 325 L20 275 L55 275 L55 250 L82 250 L82 235 L110 250 L110 275 L145 275 L145 255 L180 255 L180 325 Z" />
              <path d="M175 325 L175 265 L205 265 L205 242 L232 242 L232 225 L260 242 L260 265 L290 265 L290 250 L320 250 L320 325 Z" />
              <path d="M340 325 L340 278 L372 278 L372 255 L398 255 L398 238 L424 255 L424 278 L455 278 L455 260 L490 260 L490 325 Z" />
              <path d="M1010 325 L1010 270 L1040 270 L1040 248 L1065 248 L1065 230 L1090 248 L1090 270 L1120 270 L1120 255 L1150 255 L1150 325 Z" />
              <path d="M1165 325 L1165 258 L1195 258 L1195 238 L1222 238 L1222 220 L1249 238 L1249 258 L1280 258 L1280 245 L1310 245 L1310 325 Z" />
              <path d="M1330 325 L1330 275 L1360 275 L1360 252 L1387 252 L1387 235 L1414 252 L1414 275 L1445 275 L1445 258 L1475 258 L1475 325 Z" />
              <path d="M1490 325 L1490 265 L1520 265 L1520 242 L1548 242 L1548 225 L1576 242 L1576 265 L1605 265 L1605 325 Z" />
            </g>

            {/* MID ROW — varied temple houses to close the empty gaps */}
            <g fill="url(#skylineMidArch)">
              {/* LEFT OUTER */}
              <rect x="25" y="292" width="78" height="33" />
              <path d="M30 292 C34 276 44 264 64 250 C84 264 94 276 98 292 Z" />
              <circle cx="64" cy="246" r="2.5" fill="#E7A24C" />

              <rect x="112" y="280" width="92" height="45" />
              <path d="M120 280 C125 263 137 250 158 235 C179 250 191 263 196 280 Z" />
              <circle cx="158" cy="231" r="2.5" fill="#E7A24C" />

              <rect x="218" y="298" width="62" height="27" />
              <path d="M222 298 C226 285 235 276 249 265 C263 276 272 285 276 298 Z" />
              <circle cx="249" cy="261" r="2" fill="#E7A24C" />

              <rect x="292" y="274" width="105" height="51" />
              <path d="M302 274 C307 256 321 242 344 226 C367 242 381 256 386 274 Z" />
              <circle cx="344" cy="222" r="2.5" fill="#E7A24C" />

              <rect x="408" y="294" width="72" height="31" />
              <path d="M413 294 C417 281 426 270 444 257 C462 270 471 281 475 294 Z" />
              <circle cx="444" cy="253" r="2" fill="#E7A24C" />

              <rect x="488" y="282" width="94" height="43" />
              <path d="M498 282 C503 265 516 252 535 238 C554 252 567 265 572 282 Z" />
              <circle cx="535" cy="234" r="2.4" fill="#E7A24C" />

              {/* RIGHT OUTER */}
              <rect x="1008" y="286" width="82" height="39" />
              <path d="M1015 286 C1020 269 1031 256 1050 242 C1069 256 1080 269 1085 286 Z" />
              <circle cx="1050" cy="238" r="2.4" fill="#E7A24C" />

              <rect x="1098" y="274" width="105" height="51" />
              <path d="M1108 274 C1113 256 1127 242 1150 226 C1173 242 1187 256 1192 274 Z" />
              <circle cx="1150" cy="222" r="2.5" fill="#E7A24C" />

              <rect x="1212" y="298" width="68" height="27" />
              <path d="M1217 298 C1221 285 1230 276 1246 264 C1262 276 1271 285 1275 298 Z" />
              <circle cx="1246" cy="260" r="2" fill="#E7A24C" />

              <rect x="1286" y="280" width="102" height="45" />
              <path d="M1296 280 C1301 263 1314 250 1336 235 C1358 250 1371 263 1376 280 Z" />
              <circle cx="1336" cy="231" r="2.5" fill="#E7A24C" />

              <rect x="1394" y="294" width="76" height="31" />
              <path d="M1400 294 C1404 281 1414 270 1432 257 C1450 270 1460 281 1464 294 Z" />
              <circle cx="1432" cy="253" r="2" fill="#E7A24C" />

              <rect x="1476" y="276" width="108" height="49" />
              <path d="M1486 276 C1491 259 1505 245 1530 229 C1555 245 1569 259 1574 276 Z" />
              <circle cx="1530" cy="225" r="2.5" fill="#E7A24C" />
            </g>

            {/* SMALL CHHATRIS / DOMES between the larger buildings */}
            <g fill="url(#skylineForeArch)">
              <use href="#smallDome" transform="translate(95 325) scale(0.62)" />
              <use href="#smallDome" transform="translate(286 325) scale(0.58)" />
              <use href="#smallDome" transform="translate(500 325) scale(0.68)" />
              <use href="#smallDome" transform="translate(1030 325) scale(0.60)" />
              <use href="#smallDome" transform="translate(1210 325) scale(0.58)" />
              <use href="#smallDome" transform="translate(1400 325) scale(0.65)" />
              <use href="#smallDome" transform="translate(1590 325) scale(0.60)" />
            </g>

            {/* A few foreground rooflines for a seamless silhouette */}
            <g fill="url(#skylineForeArch)">
              <path d="M0 325 L0 312 L52 312 L52 302 L78 302 L78 325 Z" />
              <path d="M525 325 L525 305 L558 305 L558 293 L590 293 L590 325 Z" />
              <path d="M985 325 L985 304 L1020 304 L1020 294 L1055 294 L1055 325 Z" />
              <path d="M1575 325 L1575 306 L1610 306 L1610 295 L1645 295 L1645 325 Z" />
            </g>
          </g>

          {/* WARM WINDOW LIGHTS FOR THE NEW SIDE FILL */}
          <g fill="url(#skylineWindowGlow)">
            <rect x="45" y="303" width="5" height="9" rx="2" />
            <rect x="78" y="303" width="5" height="9" rx="2" />
            <rect x="130" y="292" width="5" height="9" rx="2" />
            <rect x="170" y="292" width="5" height="9" rx="2" />
            <rect x="315" y="287" width="5" height="9" rx="2" />
            <rect x="355" y="287" width="5" height="9" rx="2" />
            <rect x="430" y="304" width="5" height="9" rx="2" />
            <rect x="460" y="304" width="5" height="9" rx="2" />
            <rect x="510" y="292" width="5" height="9" rx="2" />
            <rect x="550" y="292" width="5" height="9" rx="2" />

            <rect x="1022" y="296" width="5" height="9" rx="2" />
            <rect x="1062" y="296" width="5" height="9" rx="2" />
            <rect x="1120" y="285" width="5" height="9" rx="2" />
            <rect x="1168" y="285" width="5" height="9" rx="2" />
            <rect x="1228" y="304" width="5" height="9" rx="2" />
            <rect x="1258" y="304" width="5" height="9" rx="2" />
            <rect x="1305" y="291" width="5" height="9" rx="2" />
            <rect x="1350" y="291" width="5" height="9" rx="2" />
            <rect x="1410" y="304" width="5" height="9" rx="2" />
            <rect x="1445" y="304" width="5" height="9" rx="2" />
            <rect x="1498" y="289" width="5" height="9" rx="2" />
            <rect x="1545" y="289" width="5" height="9" rx="2" />
          </g>

          {/* FOREGROUND TEMPLE TOWERS */}
          <g fill="url(#skylineForeArch)">
            <path d="M400 375 L400 325 L412 325 L412 302 L424 302 L424 279 L436 279 L436 256 L448 240 L460 256 L460 279 L472 279 L472 302 L484 302 L484 325 L496 325 L496 375 Z" />
            <circle cx="448" cy="234" r="3" fill="#E7A24C" />
            <path d="M1104 375 L1104 325 L1116 325 L1116 302 L1128 302 L1128 279 L1140 279 L1140 256 L1152 240 L1164 256 L1164 279 L1176 279 L1176 302 L1188 302 L1188 325 L1200 325 L1200 375 Z" />
            <circle cx="1152" cy="234" r="3" fill="#E7A24C" />
          </g>

          {/* LARGE SIDE CHHATRIS */}
          <g fill="url(#skylineForeArch)">
            <path d="M160 335 Q200 290 240 335 L232 335 L232 375 L168 375 L168 335 Z" />
            <rect x="176" y="330" width="7" height="45" />
            <rect x="197" y="330" width="7" height="45" />
            <rect x="218" y="330" width="7" height="45" />
            <circle cx="200" cy="285" r="3" fill="#E7A24C" />

            <path d="M1360 335 Q1400 290 1440 335 L1432 335 L1432 375 L1368 375 L1368 335 Z" />
            <rect x="1376" y="330" width="7" height="45" />
            <rect x="1397" y="330" width="7" height="45" />
            <rect x="1418" y="330" width="7" height="45" />
            <circle cx="1400" cy="285" r="3" fill="#E7A24C" />
          </g>

        </g>

        {/* CONTINUOUS LOWER WALL ARCHITECTURE (FULL 0 TO 2400) */}
        <path
          d="
            M0 355 L145 355 L145 335 L175 335 L175 355
            L215 355 L215 325 L250 325 L250 355
            L290 355 L290 340 L320 340 L320 355
            L360 355 L360 335 L395 335 L395 355
            L445 355 L445 335 L475 335 L475 355
            L515 355 L515 325 L550 325 L550 355
            L590 355 L590 340 L620 340 L620 355
            L660 355 L660 320 L700 320 L700 355
            L740 355 L740 335 L775 335 L775 355
            L810 355 L810 325 L850 325 L850 355
            L890 355 L890 335 L925 335 L925 355
            L960 355 L960 330 L1000 330 L1000 355
            L1040 355 L1040 335 L1080 335 L1080 355
            L1120 355 L1120 330 L1160 330 L1160 355
            L1200 355 L1200 330 L1240 330 L1240 355
            L1280 355 L1280 335 L1320 335 L1320 355
            L1360 355 L1360 330 L1400 330 L1400 355
            L1440 355 L1440 335 L1480 335 L1480 355
            L1520 355 L1520 325 L1560 325 L1560 355
            L1600 355 L1600 335 L1640 335 L1640 355
            L1680 355 L1680 320 L1720 320 L1720 355
            L1760 355 L1760 335 L1800 335 L1800 355
            L1840 355 L1840 325 L1880 325 L1880 355
            L1920 355 L1920 335 L1960 335 L1960 355
            L2000 355 L2000 325 L2040 325 L2040 355
            L2080 355 L2080 335 L2120 335 L2120 355
            L2160 355 L2160 340 L2200 340 L2200 355
            L2245 355 L2245 335 L2275 335 L2275 355
            L2400 355 L2400 420 L0 420 Z
          "
          fill="url(#bottomWall)"
        />

        {/* LOWER PALACE ARCADE (FULL 0 TO 2400) */}
        <g fill="#061327">
          <use href="#bottomArch" transform="translate(165 370)" />
          <use href="#bottomArch" transform="translate(265 370)" />
          <use href="#bottomArch" transform="translate(365 370)" />
          <use href="#bottomArch" transform="translate(465 370)" />
          <use href="#bottomArch" transform="translate(555 370)" />
          <use href="#bottomArch" transform="translate(670 370)" />
          <use href="#bottomArch" transform="translate(790 370)" />
          <use href="#bottomArch" transform="translate(915 370)" />
          <use href="#bottomArch" transform="translate(1050 370)" />
          <use href="#bottomArch" transform="translate(1130 370)" />
          <use href="#bottomArch" transform="translate(1270 370)" />
          <use href="#bottomArch" transform="translate(1385 370)" />
          <use href="#bottomArch" transform="translate(1510 370)" />
          <use href="#bottomArch" transform="translate(1640 370)" />
          <use href="#bottomArch" transform="translate(1760 370)" />
          <use href="#bottomArch" transform="translate(1880 370)" />
          <use href="#bottomArch" transform="translate(1970 370)" />
          <use href="#bottomArch" transform="translate(2070 370)" />
          <use href="#bottomArch" transform="translate(2170 370)" />
          <use href="#bottomArch" transform="translate(2270 370)" />
        </g>

        {/* ARCH GOLDEN LIGHTS */}
        <g fill="url(#skylineWindowGlow)">
          <ellipse cx="165" cy="360" rx="7" ry="11" />
          <ellipse cx="265" cy="360" rx="7" ry="11" />
          <ellipse cx="365" cy="360" rx="7" ry="11" />
          <ellipse cx="465" cy="360" rx="7" ry="11" />
          <ellipse cx="555" cy="360" rx="7" ry="11" />
          <ellipse cx="670" cy="360" rx="7" ry="11" />
          <ellipse cx="790" cy="360" rx="7" ry="11" />
          <ellipse cx="915" cy="360" rx="7" ry="11" />
          <ellipse cx="1050" cy="360" rx="7" ry="11" />
          <ellipse cx="1130" cy="360" rx="7" ry="11" />
          <ellipse cx="1270" cy="360" rx="7" ry="11" />
          <ellipse cx="1385" cy="360" rx="7" ry="11" />
          <ellipse cx="1510" cy="360" rx="7" ry="11" />
          <ellipse cx="1640" cy="360" rx="7" ry="11" />
          <ellipse cx="1760" cy="360" rx="7" ry="11" />
          <ellipse cx="1880" cy="360" rx="7" ry="11" />
          <ellipse cx="1970" cy="360" rx="7" ry="11" />
          <ellipse cx="2070" cy="360" rx="7" ry="11" />
          <ellipse cx="2170" cy="360" rx="7" ry="11" />
          <ellipse cx="2270" cy="360" rx="7" ry="11" />
        </g>

        {/* LOWER DECORATIVE WINDOWS */}
        <g fill="#0D2139">
          <rect x="20" y="380" width="55" height="35" rx="4" />
          <rect x="110" y="380" width="55" height="35" rx="4" />
          <rect x="205" y="380" width="55" height="35" rx="4" />
          <rect x="300" y="380" width="55" height="35" rx="4" />
          <rect x="395" y="380" width="55" height="35" rx="4" />
          <rect x="490" y="380" width="55" height="35" rx="4" />
          <rect x="585" y="380" width="55" height="35" rx="4" />
          <rect x="680" y="380" width="55" height="35" rx="4" />
          <rect x="775" y="380" width="55" height="35" rx="4" />
          <rect x="870" y="380" width="55" height="35" rx="4" />
          <rect x="965" y="380" width="55" height="35" rx="4" />
          <rect x="1060" y="380" width="55" height="35" rx="4" />
          <rect x="1280" y="380" width="55" height="35" rx="4" />
          <rect x="1375" y="380" width="55" height="35" rx="4" />
          <rect x="1470" y="380" width="55" height="35" rx="4" />
          <rect x="1565" y="380" width="55" height="35" rx="4" />
          <rect x="1660" y="380" width="55" height="35" rx="4" />
          <rect x="1755" y="380" width="55" height="35" rx="4" />
          <rect x="1850" y="380" width="55" height="35" rx="4" />
          <rect x="1945" y="380" width="55" height="35" rx="4" />
          <rect x="2040" y="380" width="55" height="35" rx="4" />
          <rect x="2135" y="380" width="55" height="35" rx="4" />
          <rect x="2230" y="380" width="55" height="35" rx="4" />
          <rect x="2325" y="380" width="55" height="35" rx="4" />
        </g>

        {/* LOWER GOLDEN WINDOW LIGHTS */}
        <g fill="#E7A24C">
          <rect x="42" y="390" width="4" height="9" rx="2" />
          <rect x="132" y="390" width="4" height="9" rx="2" />
          <rect x="227" y="390" width="4" height="9" rx="2" />
          <rect x="322" y="390" width="4" height="9" rx="2" />
          <rect x="417" y="390" width="4" height="9" rx="2" />
          <rect x="512" y="390" width="4" height="9" rx="2" />
          <rect x="607" y="390" width="4" height="9" rx="2" />
          <rect x="702" y="390" width="4" height="9" rx="2" />
          <rect x="797" y="390" width="4" height="9" rx="2" />
          <rect x="892" y="390" width="4" height="9" rx="2" />
          <rect x="987" y="390" width="4" height="9" rx="2" />
          <rect x="1082" y="390" width="4" height="9" rx="2" />
          <rect x="1302" y="390" width="4" height="9" rx="2" />
          <rect x="1397" y="390" width="4" height="9" rx="2" />
          <rect x="1492" y="390" width="4" height="9" rx="2" />
          <rect x="1587" y="390" width="4" height="9" rx="2" />
          <rect x="1682" y="390" width="4" height="9" rx="2" />
          <rect x="1777" y="390" width="4" height="9" rx="2" />
          <rect x="1872" y="390" width="4" height="9" rx="2" />
          <rect x="1967" y="390" width="4" height="9" rx="2" />
          <rect x="2062" y="390" width="4" height="9" rx="2" />
          <rect x="2157" y="390" width="4" height="9" rx="2" />
          <rect x="2252" y="390" width="4" height="9" rx="2" />
          <rect x="2347" y="390" width="4" height="9" rx="2" />
        </g>

        {/* FOREGROUND ARCHITECTURAL LINE */}
        <rect x="0" y="355" width="2400" height="4" fill="#142B47" />
        <line x1="0" y1="355" x2="2400" y2="355" stroke="#E7A24C" strokeWidth="1" strokeOpacity="0.20" />

        {/* BOTTOM DECORATIVE LAYERS */}
        <rect x="0" y="414" width="2400" height="6" fill="#020713" />
        <line x1="0" y1="372" x2="2400" y2="372" stroke="#29476B" strokeWidth="1" strokeOpacity="0.30" />
        <line x1="0" y1="404" x2="2400" y2="404" stroke="#1B3553" strokeWidth="1" strokeOpacity="0.35" />

        {/* SMALL GOLDEN LIGHTS ACROSS THE HORIZON */}
        <g fill="url(#skylineLightDot)">
          <circle cx="120" cy="340" r="3" />
          <circle cx="390" cy="340" r="3" />
          <circle cx="680" cy="335" r="2.5" />
          <circle cx="930" cy="340" r="2.5" />
          <circle cx="1100" cy="335" r="2.5" />
          <circle cx="1300" cy="340" r="2.5" />
          <circle cx="1480" cy="335" r="2.5" />
          <circle cx="1690" cy="340" r="2.5" />
          <circle cx="1910" cy="335" r="3" />
          <circle cx="2150" cy="340" r="3" />
          <circle cx="2330" cy="340" r="3" />
        </g>

      </svg>
    </div>
  );
};