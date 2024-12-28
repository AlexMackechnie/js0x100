import chalk from "chalk";
import axios from "axios";

console.log(chalk.bold(chalk.blue("---------------------------")));
console.log(chalk.bold(chalk.blue("🚀 Random User Generator 🚀")));
console.log(chalk.bold(chalk.blue("---------------------------")));

axios.get("https://randomuser.me/api").then((response) => {
    console.log(response.data.results);
}).catch((err) => {
    console.log(err);
}).finally(() => {
    console.log("Completed ✅");
})



