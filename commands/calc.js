let basicMath = require('advanced-calculator');

//Framework: Done
//Polish:

module.exports = {
    name: "math",
    args: true,
    aliases: ["calc", "calculator"],
    description: "math command for testing", 
    async execute(message, args){
        equation = args.join(' ')
        answer = basicMath.evaluate(equation)
        message.channel.send(answer)
    }
}