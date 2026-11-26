#!/bin/bash

# Script de inicialización de la estrategia de mezcla Git "Ours"
# Diseñado para proyectos hijos de MERN SaaS Factory Framework

set -e

echo "🚀 Configurando la estrategia de mezcla Git 'Ours' localmente..."

git config merge.ours.driver true

echo "✅ Driver 'ours' registrado exitosamente."
echo "ℹ️  Si tu proyecto hijo usa .gitattributes (puedes copiar .gitattributes.child.example), Git conservará tu versión local ante conflictos en archivos de marca/SEO durante merges desde el framework base."
