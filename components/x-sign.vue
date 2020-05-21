<template>
  <div class="body">
    <x-sign style="--interval:3448ms;">OPEN</x-sign>
    <x-sign style="--interval:2574ms;">Come back soon</x-sign>
    <x-sign style="--interval:3083ms;">
      PBR
      <br>in cans
    </x-sign>
    <x-sign style="--interval:3851ms;">
      REAL LIVE
      <br>Hot wings
    </x-sign>
    <x-sign style="--interval:2906ms;">
      <small>GARDEN PARK</small>
      <br>MOTEL
    </x-sign>
    <x-sign style="--interval:3811ms;">
      Restrooms
      <br>
      <small>Yes—they are bad</small>
    </x-sign>
    <x-sign style="--interval:2453ms;">FREE RADIOS</x-sign>
    <x-sign style="--interval:2405ms;">WHO YOU GONNA CALL?</x-sign>
    <x-sign style="--interval:3099ms;">Karaoke Inside</x-sign>
  </div>
</template>
<style  scoped>
@import url('https://fonts.googleapis.com/css?family=League+Script');
@import url('https://fonts.googleapis.com/css?family=Bad+Script|Gruppo|Kumar+One+Outline|League+Script|Londrina+Outline|Monoton|Sriracha|Yellowtail&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?+');
.body {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(0, 12ch));
  align-items: center;
  align-content: center;
  justify-content: center;
  background: #090000;
  font-size: calc(1em + 3vmax);
  line-height: 1.1;
  text-align: center;
  padding: 50px;
  min-height: 100vh;
}
x-sign {
  --interval: 1s;
  display: block;
  text-shadow:
    0 0 10px var(--color1),
    0 0 20px var(--color2),
    0 0 40px var(--color3),
    0 0 80px var(--color4);
  will-change: filter, color;
  filter: saturate(60%);
  animation: flicker steps(100) var(--interval) 1s infinite;
}

x-sign:nth-of-type(1) {
  color: yellow;
  --color1: goldenrod;
  --color2: orangered;
  --color3: mediumblue;
  --color4: purple;
  font-family: Gruppo;
}

x-sign:nth-of-type(2) {
  color: lightpink;
  --color1: pink;
  --color2: orangered;
  --color3: red;
  --color4: magenta;
  font-family: Bad Script;
}

x-sign:nth-of-type(3) {
  color: lightyellow;
  --color1: yellow;
  --color2: lime;
  --color3: green;
  --color4: mediumblue;
  font-family: Kumar One Outline;
}

x-sign:nth-of-type(4) {
  color: lightyellow;
  --color1: gold;
  --color2: firebrick;
  --color3: pink;
  --color4: red;
  font-family: Londrina Outline;
}

x-sign:nth-of-type(5) {
  color: azure;
  --color1: azure;
  --color2: aqua;
  --color3: dodgerblue;
  --color4: blue;
  font-family: Sriracha;
}

x-sign:nth-of-type(6) {
  color: tomato;
  --color1: orangered;
  --color2: firebrick;
  --color3: maroon;
  --color4: darkred;
  font-family: Yellowtail;
}

x-sign:nth-of-type(7) {
  color: lightyellow;
  --color1: yellow;
  --color2: orange;
  --color3: brown;
  --color4: purple;
  font-family: Bad Script;
}

x-sign:nth-of-type(8) {
  color: yellow;
  --color1: yellow;
  --color2: lime;
  --color3: green;
  --color4: darkgreen;
  font-family: Monoton;
}

x-sign:nth-of-type(9) {
  color: lightyellow;
  --color1: yellow;
  --color2: gold;
  --color3: orange;
  --color4: darkred;
  font-family: Sriracha;
}

@keyframes flicker {
  50% {
    color: white;
    filter: saturate(200%) hue-rotate(20deg);
  }
}
</style>
