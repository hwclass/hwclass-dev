const fs = require("fs")
const mediumToMarkdown = require("medium-to-markdown")

const MEDIUM_HOST = "https://hwclass.medium.com/"
const POST_PATH = "web-workers-in-a-nutshell-809f1dbe7fbf"
const EXPORTED_FILE_SLUG = "web-workers-in-a-nutshell"
const FULL_URL = `${MEDIUM_HOST}${POST_PATH}`

mediumToMarkdown.convertFromUrl(FULL_URL).then(function (markdown) {
  fs.writeFile(
    `./content/posts/${EXPORTED_FILE_SLUG}.mdx`,
    markdown,
    function (err) {
      if (err) {
        return console.log(err)
      }
      console.log("The file was saved!")
    }
  )
})
