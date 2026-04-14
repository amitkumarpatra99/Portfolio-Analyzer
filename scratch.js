const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GEMINI_API_KEY=(.+)/);
if (!keyMatch) {
  console.log('No key found');
  process.exit(1);
}
const key = keyMatch[1].trim();

fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
  .then(r => r.json())
  .then(d => {
    if (d.models) {
      console.log(d.models.map(m => m.name).filter(n => n.includes('gemini')));
    } else {
      console.log("No models array found:", d);
    }
  })
  .catch(e => console.error(e));
