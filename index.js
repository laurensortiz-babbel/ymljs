const fs = require('fs');
const yaml = require('js-yaml');

// Function to delete a file if it exists
function deleteFileIfExists(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') { // 'ENOENT' means file not found. Ignore this error.
      throw err;
    }
  }
}

// Delete the files before processing
deleteFileIfExists('marketing.yml');
deleteFileIfExists('marketing_custom.yml');

// Read the yml file
const content = yaml.load(fs.readFileSync('./marketing-original.yml', 'utf8'));

const marketing = [];
const marketingCustom = [];

content.forEach(item => {
  const toSubdomain = item.to.subdomain.toLowerCase();
  const toHostRoot = item.to.hostRoot.toLowerCase();

  // Check if the Vanity URL points to go.babbel.com
  if (toSubdomain === 'go' && toHostRoot === 'babbel') {
    marketing.push(item);
  } else {
    marketingCustom.push(item);
  }
});

// Write the separated content to two different yml files without folded style
fs.writeFileSync('marketing.yml', yaml.dump(marketing, { noRefs: true }));
fs.writeFileSync('marketing_custom.yml', yaml.dump(marketingCustom, { noRefs: true }));
