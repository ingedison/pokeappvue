
export function filterSearch(array, skey){
    var filteredArray = array.filter(function (el) {
            return el.name.includes(skey);
    });
    console.log(filteredArray);
    return filteredArray;
}

/*let
..development

"build": "vue-tsc --noEmit && vite build",
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "dev": "vite","preview": "vite preview --port 5050",
    "test:unit": "vitest --environment jsdom",
    "test:e2e": "start-server-and-test preview http://127.0.0.1:5050/ 'cypress open'",
    "test:e2e:ci": "start-server-and-test preview http://127.0.0.1:5050/ 'cypress run'",
    "typecheck": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",

..pruduction

    "postinstall": "NODE_ENV=development && npm run client-install && npm run client-build && NODE_ENV=production",
    "client": "npm start --prefix client",
    "client-build": "npm run build --prefix client",
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js --ignore client",
    "dev": "concurrently \"npm run server\" \"npm run client\""


*/