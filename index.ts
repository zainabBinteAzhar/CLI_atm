#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function Title() {
  const rainbowTitle = chalkanimation.rainbow(
    "\nATM machine\n"
  );

  await sleep();
  rainbowTitle.stop();
}

function Exit() 
{
    console.clear();
    const msg ="\nThankYou!\nVisit Again!\n";
    figlet(msg,(_err,data)=>{
        console.log(gradient.pastel.multiline(data));
    });
}
await Title();

let name="Zainab";
let pin=8876;
let balance=100000;
let userPin:number,userAmt:number,userAmt1:number,choice;

do{
    const userInput=await inquirer.prompt([
        {
            name:"data",
            type:"number",
            message: chalk.yellow("\nHey!"+name+" enter your pin to perform any task"),
        }
    ])
    userPin=parseInt(userInput.data);
    if(userPin==pin)
    {
        do
        {
            console.log(chalk.magenta("\n**********MENU**********\n"));
            let options=await inquirer.prompt([
            {
                name:"data",
                type:"list",
                message:chalk.bgMagenta("\nSelect your requirement: "),
                choices:["Check Balance","Withdraw Money","Deposit Money","Exit"]
            }
            ])
            choice=options.data;

            if(choice==="Check Balance")
            {
                console.log(chalk.greenBright("\n*****Check Balance*****"));
                console.log(chalk.blueBright("\nYour Balance is: "+ balance +"\n"));
            }
            else if(choice==="Withdraw Money")
            {
                console.log(chalk.greenBright("\n*****Withdraw-Money*****"));
                const userInput1=await inquirer.prompt([
                    {
                        name:"data",
                        type:"number",
                        message: chalk.yellow("\nHow much money you want to withdraw? "),
                    }
                ])
                userAmt=parseInt(userInput1.data);
                if((userAmt>0)&&(userAmt<=balance))
                {
                    balance=balance-userAmt;
                    console.log(chalk.greenBright("\n***Transaction Successful***"));
                    console.log(chalk.blueBright("\nYour New Balance is: "+ balance +"\n"));
                }
                else
                {
                    console.log(chalk.red("\nERROR: insufficient balance"));
                }

            }
            else if(choice==="Deposit Money")
            {
                console.log(chalk.greenBright("\n*****Perform Transaction*****"));
                const userInput2=await inquirer.prompt([
                    {
                        name:"data",
                        type:"number",
                        message: chalk.yellow("\nHow much money you want to deposit? "),
                    }
                ])
                userAmt1=parseInt(userInput2.data);
                if((userAmt1>0)&&(userAmt1<=500000))
                {
                    balance=balance+userAmt1;
                    console.log(chalk.greenBright("\n***Deposit Successful***"));
                    console.log(chalk.blueBright("\nYour New Balance is: "+ balance +"\n"));
                }
                else
                {
                    console.log(chalk.red("\nERROR: Cannot deposit more than 500,000"));
                }
            }
            else if(choice==="Exit")
            {
                Exit();
            } 
        }while(choice!="Exit");
    }
    else
    {
        console.log(chalk.redBright("\nERROR: wrong pin enetered\n"));
    }
}while(userPin!=pin);
