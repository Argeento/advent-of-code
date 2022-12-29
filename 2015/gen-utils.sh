[ -e src/utils.ts ] && rm src/utils.ts
npx civet < src/utils.civet > src/utils.ts
npx tsc src/utils.ts --declaration --emitDeclarationOnly
sed -i -e 's/export //g' src/utils.d.ts
[ -e src/utils.ts ] && rm src/utils.ts