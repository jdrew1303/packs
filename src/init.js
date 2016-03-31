import cp from 'ncp'

cp(__dirname + '/bootstrap', process.cwd(), function (err) {
  if (err) console.error(err)
  console.log('Survey template created in current directory. Run npm `install && surveyrabbit serve` to host survey locally')
})