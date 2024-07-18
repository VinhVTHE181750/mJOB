const config = require("../../validate.json");

// db is not implemented yet

function passBlacklist(value) {
  const enabled = config.string["enable - blacklist"];

  if (enabled) {
    const tolerance = config.string.tolerance;
    const words = config.string.fallback["blocked-words"];
    const regexs = config.string.fallback["blocked-regex"];
    let violations = 0;
    // for now print all words and regexs
    console.table(words);
    console.table(regexs);
    // console.log(123)
    return [words, regexs];
  }
}

module.exports = {
  passBlacklist,
};

passBlacklist("Test");