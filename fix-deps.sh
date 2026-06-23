#!/bin/bash
cd "/Users/mohammadhosein/portfolio claude/portfolio"
rm -rf .next
rm -rf node_modules/@react-three/drei
rm -rf node_modules/@react-three/fiber
rm -rf node_modules/three
npm install three@0.170.0 @react-three/fiber@8.16.8 @react-three/drei@9.108.0 --legacy-peer-deps
npm run build
